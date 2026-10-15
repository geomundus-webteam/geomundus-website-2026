// Generates thumbnails automatically for finalists that have none, and saves them in Sanity.
//   PDF maps            -> first page rendered to an image
//   Google Drive links  -> the file is downloaded (PDF: first page rendered, image: used as is)
//   Interactive links   -> screenshot of the page (needs Playwright)
//   Image uploads       -> skipped (the image itself is already shown)
//
// Run on your own computer, not on the web server:
//   pnpm add -D pdfjs-dist @napi-rs/canvas playwright
//   pnpm exec playwright install chromium
//   node --env-file=.env.local scripts/generate-thumbnails.mjs
//
// Needs in .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and a Sanity
// token with write access (named SANITY_API_WRITE_TOKEN here; rename if yours differs).

import { createClient } from "@sanity/client";
import { createCanvas } from "@napi-rs/canvas";

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("Missing Sanity write token. Set SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

async function download(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`download failed (HTTP ${res.status})`);
  return Buffer.from(await res.arrayBuffer());
}

const isPdf = (b) => b.subarray(0, 5).toString("latin1") === "%PDF-";
const isPng = (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e;
const isJpg = (b) => b[0] === 0xff && b[1] === 0xd8;

function driveFileId(url) {
  return url?.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] ?? null;
}

// Renders page 1 of a PDF (as a Buffer) to a PNG with a white background.
async function renderPdf(pdfBuffer) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({ data: new Uint8Array(pdfBuffer), useSystemFonts: true }).promise;
  const page = await doc.getPage(1);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: 1200 / base.width });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: canvas.getContext("2d"), viewport, canvas }).promise;
  return canvas.toBuffer("image/png");
}

// Returns { buffer, contentType } for a PDF or image map stored on Google Drive.
async function fromDrive(id) {
  const file = await download(`https://drive.google.com/uc?export=download&id=${id}`);
  if (isPdf(file)) return { buffer: await renderPdf(file), contentType: "image/png" };
  if (isPng(file)) return { buffer: file, contentType: "image/png" };
  if (isJpg(file)) return { buffer: file, contentType: "image/jpeg" };
  throw new Error('Drive did not return a PDF or image. Is the file shared as "Anyone with the link can view"?');
}

let browser;
async function screenshotLink(url) {
  if (!browser) {
    const { chromium } = await import("playwright");
    browser = await chromium.launch();
  }
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(3000); // let map tiles finish loading
    return await page.screenshot({ type: "png" });
  } finally {
    await page.close();
  }
}

const docs = await client.fetch(`*[_type == "mapathonSubmission" && finalist == true && !defined(thumbnail.asset)]{
  _id, mapTitle, mapLink,
  "fileUrl": mapFile.asset->url,
  "mime": mapFile.asset->mimeType
}`);

console.log(`${docs.length} finalist(s) without a thumbnail.`);

for (const d of docs) {
  try {
    let buffer = null;
    let contentType = "image/png";
    const driveId = driveFileId(d.mapLink);
    if (d.mime === "application/pdf" && d.fileUrl) {
      buffer = await renderPdf(await download(d.fileUrl));
    } else if (d.mime?.startsWith("image/")) {
      console.log(`- ${d.mapTitle}: image upload, skipped`);
      continue;
    } else if (driveId) {
      ({ buffer, contentType } = await fromDrive(driveId));
    } else if (d.mapLink) {
      buffer = await screenshotLink(d.mapLink);
    } else {
      console.log(`- ${d.mapTitle}: nothing to extract from, skipped`);
      continue;
    }

    const asset = await client.assets.upload("image", buffer, { filename: `thumbnail-${d._id}.${contentType === "image/jpeg" ? "jpg" : "png"}`, contentType });
    await client.patch(d._id).set({ thumbnail: { _type: "image", asset: { _type: "reference", _ref: asset._id } } }).commit();
    console.log(`- ${d.mapTitle}: thumbnail saved`);
  } catch (err) {
    console.error(`- ${d.mapTitle}: failed (${err.message})`);
  }
}

if (browser) await browser.close();
console.log("Done. Publish step is not needed: the thumbnail was added to the published document.");
