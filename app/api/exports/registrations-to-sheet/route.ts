import { NextRequest, NextResponse } from "next/server";
import { syncRegistrationsToSheet } from "@/lib/sync-registrations-to-sheet";

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!process.env.SHEET_EXPORTS_TOKEN) {
      return NextResponse.json(
        { error: "SHEET_EXPORTS_TOKEN is not configured." },
        { status: 500 },
      );
    }

    if (token !== process.env.SHEET_EXPORTS_TOKEN) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const result = await syncRegistrationsToSheet();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Registrations to Sheet export error:", error);

    return NextResponse.json(
      {
        error: "Failed to sync registrations to Google Sheet.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}