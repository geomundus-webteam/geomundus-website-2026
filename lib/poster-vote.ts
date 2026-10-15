import { createClient } from "@sanity/client";
import { google } from "googleapis";
import { sheetIdFromUrl } from "@/lib/mapathon-vote";

export { sheetIdFromUrl };

export type Poster = {
  id: string;            // Google Drive file ID
  title: string;         // file name without ".pdf"
  viewUrl: string;       // opens the file in Drive's viewer
  kind?: "PDF" | "Image";
  thumbUrl?: string;     // thumbnail from the Drive API
  thumbFallbackUrl?: string;
};

export type PosterConfig = {
  heading?: string;
  intro?: string;
  votingOpen?: boolean;
  sheetUrl?: string;
  driveFolderUrl?: string;
};

/* ---------- LOCAL TEST MODE ----------
   POSTER_VOTE_MOCK=1 in .env.local: dummy posters, voting open, votes kept in memory. */
export const MOCK = process.env.POSTER_VOTE_MOCK === "1";

const tile = (n: number, color: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="600" height="800" fill="${color}"/><text x="300" y="430" font-size="120" font-family="Arial" font-weight="700" fill="white" text-anchor="middle">Poster ${n}</text></svg>`
  );

const MOCK_DATA = {
  config: {
    heading: "Poster Award: Audience Vote (TEST DATA)",
    intro: "Dummy data for local testing. Choose one poster and submit.",
    votingOpen: true,
    sheetUrl: "https://docs.google.com/spreadsheets/d/MOCK_SHEET_ID/edit",
    driveFolderUrl: "https://drive.google.com/drive/folders/MOCK_FOLDER_ID",
  } as PosterConfig,
  posters: [
    { id: "p1", title: "01 - Flood mapping with ML - Jane Doe", viewUrl: "#", thumbUrl: tile(1, "#2B50AA") },
    { id: "p2", title: "02 - LiDAR for wildfire fuel - Ali Khan", viewUrl: "#", thumbUrl: tile(2, "#00843D") },
    { id: "p3", title: "03 - OSM after the earthquake - Maria Lopez", viewUrl: "#" },
    { id: "p4", title: "04 - Sensors for flood alerts - Tom Becker", viewUrl: "#", thumbUrl: tile(4, "#C1121F") },
    { id: "p5", title: "05 - Landslide risk, Nepal - Sita Rai", viewUrl: "#" },
    { id: "p6", title: "06 - Drought indices, Spain - Pablo Ruiz", viewUrl: "#", thumbUrl: tile(6, "#8E44AD") },
  ] as Poster[],
};

type MockVote = { time: string; token: string; id: string; title: string };
const g = globalThis as unknown as { __mockPosterVotes?: MockVote[] };
export const mockVotes: MockVote[] = (g.__mockPosterVotes ??= []);


/* ---------- HARD-CODED SETTINGS (temporary) ----------
   While enabled, the Sanity "Poster Voting" document is NOT used.
   Set enabled to false later to go back to Sanity. */
const HARDCODED = {
  enabled: true,
  driveFolderUrl: "https://drive.google.com/drive/u/0/folders/1Ko8uiJRpRaoEMnXcQdSK1a3cTXnwdPm1",
  sheetUrl: "https://docs.google.com/spreadsheets/d/1QrWz-_5JEWqLUY3XHFufpnumWbI42H6pIq8LYFMPjlY/edit?usp=drive_link",
  votingOpen: true, // set false to only show the posters, with no voting
  heading: "Poster Award: Audience Vote",
  intro: "Vote for your favorite poster.",
  // OPTIONAL: list posters by hand (skips the Drive API completely, no service account needed
  // for the listing). Each file must be shared as "Anyone with the link can view".
  // Example: { title: "01 - Flood mapping - Jane Doe", url: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing" }
  posters: [] as { title: string; url: string }[],
};

function posterFromLink(item: { title: string; url: string }): Poster | null {
  const id = item.url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ?? item.url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];
  if (!id) return null;
  return {
    id,
    title: item.title,
    viewUrl: `https://drive.google.com/file/d/${id}/view`,
    thumbUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
  };
}

/* ---------- Google ---------- */
// Same env vars as lib/mapathon-vote.ts. Rename if yours differ.
function auth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });
}

export function folderIdFromUrl(url?: string): string | null {
  return url?.match(/folders\/([a-zA-Z0-9_-]+)/)?.[1] ?? url?.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] ?? null;
}

async function listPosters(folderId: string): Promise<Poster[]> {
  const drive = google.drive({ version: "v3", auth: auth() });
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false and (mimeType = 'application/pdf' or mimeType = 'image/png' or mimeType = 'image/jpeg' or mimeType = 'image/webp')`,
    fields: "files(id, name, mimeType, thumbnailLink)",
    orderBy: "name",
    pageSize: 100,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  return (res.data.files ?? []).map((f) => ({
    id: f.id!,
    title: (f.name || "Untitled").replace(/\.(pdf|png|jpe?g|webp)$/i, ""),
    kind: f.mimeType === "application/pdf" ? ("PDF" as const) : ("Image" as const),
    viewUrl: `https://drive.google.com/file/d/${f.id}/view`,
    thumbUrl: f.thumbnailLink ? f.thumbnailLink.replace(/=s\d+$/, "=s800") : undefined,
    thumbFallbackUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w800`,
  }));
}

export async function getPosterVoting(): Promise<{ config: PosterConfig | null; posters: Poster[]; error?: string }> {
  if (MOCK) return MOCK_DATA;

  if (HARDCODED.enabled) {
    const config: PosterConfig = {
      heading: HARDCODED.heading,
      intro: HARDCODED.intro,
      votingOpen: HARDCODED.votingOpen,
      sheetUrl: HARDCODED.sheetUrl,
      driveFolderUrl: HARDCODED.driveFolderUrl,
    };
    if (HARDCODED.posters.length) {
      const posters = HARDCODED.posters.map(posterFromLink).filter((p): p is Poster => p !== null);
      return { config, posters };
    }
    const folderId = folderIdFromUrl(HARDCODED.driveFolderUrl);
    if (!folderId) return { config, posters: [] };
    try {
      return { config, posters: await listPosters(folderId) };
    } catch (err) {
      console.error(`Drive listing failed. Folder ID: "${folderId}", service account: "${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}". Is the folder shared with that email?`, err);
      return { config, posters: [], error: "drive" };
    }
  }

  const sanity = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
  });
  const config: PosterConfig | null = await sanity.fetch(
    `*[_type == "posterVoting"][0]{ heading, intro, votingOpen, sheetUrl, driveFolderUrl }`
  );
  const folderId = folderIdFromUrl(config?.driveFolderUrl);
  if (!config || !folderId) return { config, posters: [] };

  try {
    return { config, posters: await listPosters(folderId) };
  } catch (err) {
    console.error(`Drive listing failed. Folder ID: "${folderId}", service account: "${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}". Is the folder shared with that email?`, err);
    return { config, posters: [], error: "drive" };
  }
}

// "PosterVotes" tab columns: A Time | B Anonymous token | C Drive file ID | D Poster title
export async function hasVoted(sheetId: string, token: string): Promise<boolean> {
  if (MOCK) return mockVotes.some((v) => v.token === token);
  const sheets = google.sheets({ version: "v4", auth: auth() });
  const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: "PosterVotes!B:B" });
  return (res.data.values ?? []).some((row) => row[0] === token);
}

export async function appendVote(sheetId: string, token: string, p: Poster) {
  if (MOCK) {
    mockVotes.push({ time: new Date().toISOString(), token, id: p.id, title: p.title });
    console.log(`[MOCK POSTER VOTE] ${p.title} (${mockVotes.length} total)`);
    return;
  }
  const sheets = google.sheets({ version: "v4", auth: auth() });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "PosterVotes!A:D",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[new Date().toISOString(), token, p.id, p.title]] },
  });
}
