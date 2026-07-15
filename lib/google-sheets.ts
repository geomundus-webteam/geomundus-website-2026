import { google } from "googleapis";

function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
  const privateKey = rawKey.replace(/\\n/g, "\n");

  console.log("[google-sheets] clientEmail present:", !!clientEmail);
  console.log("[google-sheets] rawKey length:", rawKey.length);
  console.log("[google-sheets] rawKey first 30 chars:", rawKey.substring(0, 30));
  console.log("[google-sheets] privateKey starts with BEGIN:", privateKey.startsWith("-----BEGIN"));
  console.log("[google-sheets] privateKey contains real newlines:", privateKey.includes("\n"));

  if (!clientEmail || !privateKey) {
    throw new Error("Google Sheets credentials are not configured.");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });
}

export async function getSheetsClient() {
  const auth = getGoogleAuth();
  await auth.authorize();

  return google.sheets({
    version: "v4",
    auth,
  });
}