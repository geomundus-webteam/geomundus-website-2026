import { cachedClient } from "@/lib/sanity.client";
import { abstractSubmissionsExportQuery } from "@/lib/sanity.queries";
import { getSheetsClient } from "@/lib/google-sheets";

type AbstractExportRow = {
  submissionId?: string;
  firstName?: string;
  lastName?: string;
  institution?: string;
  email?: string;
  selectedThemes?: string[];
  title?: string;
  authors?: string;
  originalFileName?: string;
  status?: string;
  emailDelivered?: boolean;
  confirmationEmailDelivered?: boolean;
  confirmationEmailError?: string | null;
  submittedAt?: string;
};

function buildSheetRows(rows: AbstractExportRow[]) {
  const headers = [
    "submissionId",
    "submittedAt",
    "firstName",
    "lastName",
    "institution",
    "email",
    "title",
    "authors",
    "selectedThemes",
    "originalFileName",
    "status",
    "emailDelivered",
    "confirmationEmailDelivered",
    "confirmationEmailError",
  ];

  const values = rows.map((row) => [
    row.submissionId || "",
    row.submittedAt || "",
    row.firstName || "",
    row.lastName || "",
    row.institution || "",
    row.email || "",
    row.title || "",
    row.authors || "",
    row.selectedThemes?.join(" | ") || "",
    row.originalFileName || "",
    row.status || "",
    row.emailDelivered ? "true" : "false",
    row.confirmationEmailDelivered ? "true" : "false",
    row.confirmationEmailError || "",
  ]);

  return [headers, ...values];
}

export async function syncAbstractsToSheet() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured.");
  }

  const rows = await cachedClient<AbstractExportRow[]>(
    abstractSubmissionsExportQuery.query,
  );

  const values = buildSheetRows(rows ?? []);
  const sheets = await getSheetsClient();

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "Abstracts!A:Z",
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Abstracts!A1",
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });

  return {
    rowsWritten: values.length - 1,
    sheet: "Abstracts",
  };
}