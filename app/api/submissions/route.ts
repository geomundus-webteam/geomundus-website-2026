import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanity.write";
import sendEmail from "@/lib/email";

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

    if (
      !firstName ||
      !lastName ||
      !institution ||
      !email ||
      !sessionTheme ||
      !submissionType ||
      !title ||
      !authors
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "A file is required." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, DOC, and DOCX files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "The file must be 10 MB or smaller." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save to Sanity
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
      originalFileName: file.name,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    });

    // Send file to web team via email
    const teamEmailSent = await sendEmail({
      to: process.env.EMAIL_FROM || "webteam@geomundus.org",
      subject: `[GeoMundus 2026] New Abstract Submission: ${title}`,
      text: [
        `New abstract submission received:`,
        ``,
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Institution: ${institution}`,
        `Session Theme: ${sessionTheme}`,
        `Submission Type: ${submissionType}`,
        `Title: ${title}`,
        `Authors: ${authors}`,
        ``,
        `The submitted file is attached.`,
        `Submission ID: ${doc._id}`,
      ].join("\n"),
      attachments: [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        },
      ],
    });

    // Send confirmation to submitter
    const confirmationSent = await sendEmail({
      to: email,
      subject: `[GeoMundus 2026] Abstract Submission Received`,
      text: [
        `Dear ${firstName} ${lastName},`,
        ``,
        `Thank you for submitting your abstract to GeoMundus 2026.`,
        ``,
        `Submission details:`,
        `- Title: ${title}`,
        `- Type: ${submissionType}`,
        `- Session Theme: ${sessionTheme}`,
        ``,
        `We will review your submission and get back to you soon.`,
        ``,
        `Best regards,`,
        `GeoMundus 2026 Organizing Committee`,
        `https://geomundus.org`,
      ].join("\n"),
    });

    return NextResponse.json({
      success: true,
      id: doc._id,
      emailSent: teamEmailSent,
      confirmationSent,
    });
  } catch (error) {
    console.error("Submission error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting the form.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
