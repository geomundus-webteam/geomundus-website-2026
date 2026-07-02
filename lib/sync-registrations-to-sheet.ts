import { cachedClient } from "@/lib/sanity.client";
import { registrationsExportQuery } from "@/lib/sanity.queries";
import { getSheetsClient } from "@/lib/google-sheets";

type RegistrationExportRow = {
  _id?: string;
  _createdAt?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  affiliation?: string;
  role?: string;
  position?: string;
  positionOther?: string;
  country?: string;
  nationality?: string;
  website?: string;
  attendanceReason?: string[];
  attendanceReasonOther?: string;
  presenting?: string;
  attendanceDays?: string;
  dietaryRequirements?: string;
  dietaryRestrictions?: string[];
  dietaryRestrictionsOther?: string;
  beveragePreference?: string[];
  attendingDinner?: boolean | string;
  consentPublicList?: boolean;
  consentPhotography?: boolean;
  howDidYouHear?: string;
  howDidYouHearOther?: string;
  additionalComments?: string;
  abstract?: string;
  status?: string;
};

function toJoinedString(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(" | ");
  }

  if (typeof value === "string") {
    return value;
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function buildRegistrationsSheetRows(rows: RegistrationExportRow[]) {
  const headers = [
    "id",
    "createdAt",
    "fullName",
    "firstName",
    "lastName",
    "email",
    "affiliation",
    "roleOrPosition",
    "positionOther",
    "country",
    "nationality",
    "website",
    "attendanceReason",
    "attendanceReasonOther",
    "presenting",
    "attendanceDays",
    "dietaryRequirementsOrRestrictions",
    "dietaryRestrictionsOther",
    "beveragePreference",
    "attendingDinner",
    "consentPublicList",
    "consentPhotography",
    "howDidYouHear",
    "howDidYouHearOther",
    "additionalComments",
    "abstract",
    "status",
  ];

  const values = rows.map((row) => {
    const computedFullName =
      row.fullName ||
      [row.firstName, row.lastName].filter(Boolean).join(" ");

    return [
      row._id || "",
      row._createdAt || "",
      computedFullName || "",
      row.firstName || "",
      row.lastName || "",
      row.email || "",
      row.affiliation || "",
      row.role || row.position || "",
      row.positionOther || "",
      row.country || "",
      row.nationality || "",
      row.website || "",
      toJoinedString(row.attendanceReason),
      row.attendanceReasonOther || "",
      row.presenting || "",
      row.attendanceDays || "",
      toJoinedString(row.dietaryRequirements),
      row.dietaryRestrictionsOther || "",
      toJoinedString(row.beveragePreference),
      row.attendingDinner === undefined ? "" : String(row.attendingDinner),
      row.consentPublicList === undefined ? "" : String(row.consentPublicList),
      row.consentPhotography === undefined ? "" : String(row.consentPhotography),
      row.howDidYouHear || "",
      row.howDidYouHearOther || "",
      row.additionalComments || "",
      row.abstract || "",
      row.status || "",
    ];
  });

  return [headers, ...values];
}

export async function syncRegistrationsToSheet() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured.");
  }

  const rows = await cachedClient<RegistrationExportRow[]>(
    registrationsExportQuery.query,
  );

  const values = buildRegistrationsSheetRows(rows ?? []);
  const sheets = await getSheetsClient();

  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: "Registrations!A:Z",
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Registrations!A1",
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });

  return {
    rowsWritten: values.length - 1,
    sheet: "Registrations",
  };
}