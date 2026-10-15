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
  description?: string;
  mapLink?: string;
  fileUrl?: string;
  fileMime?: string;
  thumbnailUrl?: string;
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
    { _id: "mock-1", description: "This map shows flood extents along the Rhine under three return periods, combining gauge records with a 10 m elevation model. It is intended for municipal planners deciding where to build temporary barriers, and it highlights schools and care homes inside the 100-year zone so that evacuation planning can start there.", mapTitle: "Flood Risk in the Rhine Valley", authors: "Anna Schmidt", fileUrl: tile(1, "#2B50AA"), fileMime: "image/svg+xml" },
    { _id: "mock-2", description: "Fire spread scenarios for central Portugal built from open Earth observation data, fuel maps, and wind records. The map compares three wind directions and shows the villages reached within six hours. It supports preparedness exercises for local fire brigades and explains each design choice in a short legend.", mapTitle: "Wildfire Spread Scenarios, Portugal", authors: "Joao Silva, Marta Costa", thumbnailUrl: tile(2, "#FF6B35"), fileUrl: "/mapathon/map-challenge-2026-guidelines.pdf", fileMime: "application/pdf" },
    { _id: "mock-3", description: "A shelter and assembly-point map for Istanbul districts after an earthquake, based on OpenStreetMap data. Each point lists capacity and walking distance. The interactive version lets residents search by street, and it was reviewed with a local volunteer group to check that the shelters are still open and reachable on foot.", mapTitle: "Earthquake Shelters in Istanbul", authors: "Elif Yilmaz", mapLink: "https://www.openstreetmap.org" },
    { _id: "mock-4", description: "Landslide susceptibility for a district in Nepal, produced with a weighted overlay of slope, rainfall, geology, and land cover. The map is designed for village committees and uses plain colours and local place names so that it can be printed and discussed in community meetings without any GIS training.", mapTitle: "Landslide Susceptibility, Nepal", authors: "Ramesh Gurung", fileUrl: tile(4, "#C1121F"), fileMime: "image/svg+xml" },
    { _id: "mock-5", description: "A drought monitoring map for the Sahel that tracks vegetation health and rainfall anomalies across the last twelve months. It is aimed at humanitarian teams who need to decide where to send food aid first. The legend explains the index in two sentences, and the data sources are listed along the bottom edge.", mapTitle: "Drought Monitoring in the Sahel", authors: "Amina Diallo", fileUrl: "/mapathon/map-challenge-2026-guidelines.pdf", fileMime: "application/pdf" },
    { _id: "mock-6", description: "Storm surge evacuation routes for a coastal city, combining elevation, road capacity, and shelter locations. The map marks which streets flood first and gives the safest route from each neighbourhood to the nearest shelter. It was designed to be read at a glance on a phone during an emergency, with large labels and strong contrast.", mapTitle: "Storm Surge Evacuation Routes", authors: "Carlos Mendez", mapLink: "https://www.openstreetmap.org" },
  ],
};

type MockVote = { time: string; token: string; id: string; title: string };
const g = globalThis as unknown as { __mockVotes?: MockVote[] };
export const mockVotes: MockVote[] = (g.__mockVotes ??= []);

const QUERY = `{
  "config": *[_type == "mapathonVoting"][0]{ heading, intro, votingOpen, sheetUrl },
  "finalists": *[_type == "mapathonSubmission" && finalist == true]
    | order(finalistOrder asc, mapTitle asc){
      _id, mapTitle, authors, description, mapLink,
      "thumbnailUrl": thumbnail.asset->url,
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
