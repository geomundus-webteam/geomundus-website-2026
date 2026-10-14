import { createClient } from "@sanity/client";
import { google } from "googleapis";

// Created lazily so test mode works even without Sanity env vars.
const sanityRead = () =>
  createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false, // always fresh, so closing the vote takes effect immediately
  });

export type Finalist = {
  _id: string;
  mapTitle: string;
  authors: string;
  mapLink?: string;
  fileUrl?: string;
  fileMime?: string;
};

export type VotingConfig = {
  heading?: string;
  intro?: string;
  votingOpen?: boolean;
  sheetUrl?: string;
};


/* ---------- LOCAL TEST MODE ----------
   Set MAPATHON_VOTE_MOCK=1 in .env.local to use dummy data:
   voting open, six fake finalists, votes kept in memory (no Sanity, no Google Sheet).
   Remove the variable (and restart) to go back to the real data. */
export const MOCK = process.env.MAPATHON_VOTE_MOCK === "1";

const tile = (n: number, color: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="${color}"/><text x="400" y="340" font-size="160" font-family="Arial" font-weight="700" fill="white" text-anchor="middle">Map ${n}</text></svg>`
  );

const MOCK_DATA: { config: VotingConfig; finalists: Finalist[] } = {
  config: {
    heading: "Map+ Challenge: Audience Vote (TEST DATA)",
    intro: "This is dummy data for local testing. Choose one map and submit.",
    votingOpen: true,
    sheetUrl: "https://docs.google.com/spreadsheets/d/MOCK_SHEET_ID/edit",
  },
  finalists: [
    { _id: "mock-1", mapTitle: "Flood Risk in the Rhine Valley", authors: "Anna Schmidt", fileUrl: tile(1, "#2B50AA"), fileMime: "image/svg+xml" },
    { _id: "mock-2", mapTitle: "Wildfire Spread Scenarios, Portugal", authors: "Joao Silva, Marta Costa", fileUrl: "/mapathon/map-challenge-2026-guidelines.pdf", fileMime: "application/pdf" },
    { _id: "mock-3", mapTitle: "Earthquake Shelters in Istanbul", authors: "Elif Yilmaz", mapLink: "https://www.openstreetmap.org" },
    { _id: "mock-4", mapTitle: "Landslide Susceptibility, Nepal", authors: "Ramesh Gurung", fileUrl: tile(4, "#C1121F"), fileMime: "image/svg+xml" },
    { _id: "mock-5", mapTitle: "Drought Monitoring in the Sahel", authors: "Amina Diallo", fileUrl: "/mapathon/map-challenge-2026-guidelines.pdf", fileMime: "application/pdf" },
    { _id: "mock-6", mapTitle: "Storm Surge Evacuation Routes", authors: "Carlos Mendez", mapLink: "https://www.openstreetmap.org" },
  ],
};

type MockVote = { time: string; token: string; id: string; title: string };
const g = globalThis as unknown as { __mockVotes?: MockVote[] };
export const mockVotes: MockVote[] = (g.__mockVotes ??= []);

const QUERY = `{
  "config": *[_type == "mapathonVoting"][0]{ heading, intro, votingOpen, sheetUrl },
  "finalists": *[_type == "mapathonSubmission" && finalist == true]
    | order(finalistOrder asc, mapTitle asc){
      _id, mapTitle, authors, mapLink,
      "fileUrl": mapFile.asset->url,
      "fileMime": mapFile.asset->mimeType
    }
}`;

export async function getVotingData(): Promise<{ config: VotingConfig | null; finalists: Finalist[] }> {
  if (MOCK) return MOCK_DATA;
  return sanityRead().fetch(QUERY);
}

export function sheetIdFromUrl(url?: string): string | null {
  return url?.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ?? null;
}

// Use the same env vars as lib/sync-mapathon-to-sheet.ts. Rename here if yours differ.
function sheets() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// "Votes" tab columns: A Time | B Anonymous token | C Submission ID | D Map title
export async function hasVoted(sheetId: string, token: string): Promise<boolean> {
  if (MOCK) return mockVotes.some((v) => v.token === token);
  const res = await sheets().spreadsheets.values.get({ spreadsheetId: sheetId, range: "Votes!B:B" });
  return (res.data.values ?? []).some((row) => row[0] === token);
}

export async function appendVote(sheetId: string, token: string, f: Finalist) {
  if (MOCK) {
    mockVotes.push({ time: new Date().toISOString(), token, id: f._id, title: f.mapTitle });
    console.log(`[MOCK VOTE] ${f.mapTitle} (${mockVotes.length} total)`);
    return;
  }
  await sheets().spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Votes!A:D",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[new Date().toISOString(), token, f._id, f.mapTitle]] },
  });
}