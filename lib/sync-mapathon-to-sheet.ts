import { cachedClient } from "@/lib/sanity.client";
import { mapathonSubmissionsExportQuery } from "@/lib/sanity.queries";
import { getSheetsClient } from "@/lib/google-sheets";

type MapathonExportRow = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  affiliation?: string;
  mapTitle?: string;
  authors?: string;
  description?: string;
  mapFileUrl?: string;
  mapLink?: string;
  consentGuidelines?: boolean;
  consentAI?: boolean;
  status?: string;
  submittedAt?: string;
};

function buildSheetRows(rows: MapathonExportRow[]) {
  const headers = [
    "submissionId",
    "submittedAt",
    "firstName",
    "lastName",
    "email",
    "affiliation",
    "mapTitle",
    "authors",
    "description",
    "mapFileUrl",
    "mapLink",
    "consentGuidelines",
    "consentAI",
    "status",
  ];

  const values = rows.map((row) => [
    row._id || "",
    row.submittedAt || "",
    row.firstName || "",
    row.lastName || "",
    row.email || "",
    row.affiliation || "",
    row.mapTitle || "",
    row.authors || "",
    row.description || "",
    row.mapFileUrl || "",
    row.mapLink || "",
    row.consentGuidelines ? "true" : "false",
    row.consentAI ? "true" : "false",
    row.status || "",
  ]);

  return [headers, ...values];
}

export async function syncMapathonToSheet() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured.");
  }

  const rows = await cachedClient<MapathonExportRow[]>(
    mapathonSubmissionsExportQuery.query,
  );

  const values = buildSheetRows(rows ?? []);
  const sheets = await getSheetsClient();

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "Mapathon!A:Z",
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Mapathon!A1",
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });

  return {
    rowsWritten: values.length - 1,
    sheet: "Mapathon",
  };
}
