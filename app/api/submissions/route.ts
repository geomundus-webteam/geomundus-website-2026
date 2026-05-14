import {NextResponse} from "next/server";
import {sanityWriteClient} from "@/lib/sanity.write";
import {uploadFileToDrive} from "@/lib/google-drive";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const institution = String(formData.get("institution") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const sessionTheme = String(formData.get("sessionTheme") || "").trim();
    const submissionType = String(formData.get("submissionType") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const authors = String(formData.get("authors") || "").trim();
    const file = formData.get("file");

    if (!firstName || !lastName || !institution || !email || !sessionTheme || !submissionType || !title || !authors) {
      return NextResponse.json({error: "Please complete all required fields."}, {status: 400});
    }

    if (!(file instanceof File)) {
      return NextResponse.json({error: "A file is required."}, {status: 400});
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({error: "Only PDF, DOC, and DOCX files are allowed."}, {status: 400});
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({error: "The file must be 10 MB or smaller."}, {status: 400});
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await uploadFileToDrive({
      buffer,
      fileName: file.name,
      mimeType: file.type,
    });

    const doc = await sanityWriteClient.create({
      _type: "abstractSubmission",
      firstName,
      lastName,
      institution,
      email,
      sessionTheme,
      submissionType,
      title,
      authors,
      driveFileId: uploaded.id,
      driveFileUrl: uploaded.webViewLink || uploaded.webContentLink,
      originalFileName: file.name,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: doc._id,
      driveFileId: uploaded.id,
    });
  } catch (error) {
    console.error("Submission error FULL:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting the form.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}