import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sanityWriteClient } from "@/lib/sanity.write";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function generateSubmissionId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `GM${year}-ABS-${year}${month}${day}-${randomPart}`;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      servername: process.env.EMAIL_HOST,
    },
  });
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/submissions working" });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const institution = String(formData.get("institution") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const authors = String(formData.get("authors") || "").trim();
    const selectedThemesRaw = String(formData.get("selectedThemes") || "[]");
    const file = formData.get("file");

    let selectedThemes: string[] = [];
    try {
      selectedThemes = JSON.parse(selectedThemesRaw);
    } catch {
      selectedThemes = [];
    }

    if (
      !firstName ||
      !lastName ||
      !institution ||
      !email ||
      !title ||
      !authors ||
      selectedThemes.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields and select at least one theme.",
        },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "A file is required." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF, DOC, and DOCX files are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "The file must be 10 MB or smaller." },
        { status: 400 },
      );
    }

    const submissionId = generateSubmissionId();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const doc = await sanityWriteClient.create({
      _type: "abstractSubmission",
      submissionId,
      firstName,
      lastName,
      institution,
      email,
      selectedThemes,
      title,
      authors,
      originalFileName: file.name,
      emailDelivered: false,
      confirmationEmailDelivered: false,
      confirmationEmailError: null,
      status: "submitted",
      submittedAt: new Date().toISOString(),
    });

    const transporter = createTransporter();

    // Internal email: required
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.SUBMISSIONS_TO_EMAIL,
      replyTo: email,
      subject: `[GeoMundus Submission] ${submissionId} - ${title}`,
      text: `
New abstract submission received

Submission ID: ${submissionId}
Sanity Document ID: ${doc._id}
First name: ${firstName}
Last name: ${lastName}
Institution: ${institution}
Email: ${email}
Selected themes:
${selectedThemes.map((theme) => `- ${theme}`).join("\n")}

Title: ${title}
Authors: ${authors}
Original file name: ${file.name}
Submitted at: ${new Date().toISOString()}
      `,
      html: `
        <h2>New abstract submission received</h2>
        <p><strong>Submission ID:</strong> ${submissionId}</p>
        <p><strong>Sanity Document ID:</strong> ${doc._id}</p>
        <p><strong>First name:</strong> ${firstName}</p>
        <p><strong>Last name:</strong> ${lastName}</p>
        <p><strong>Institution:</strong> ${institution}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Selected themes:</strong></p>
        <ul>
          ${selectedThemes.map((theme) => `<li>${theme}</li>`).join("")}
        </ul>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Authors:</strong> ${authors}</p>
        <p><strong>Original file name:</strong> ${file.name}</p>
        <p><strong>Submitted at:</strong> ${new Date().toISOString()}</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        },
      ],
    });

    let confirmationEmailDelivered = false;
    let confirmationEmailError: string | null = null;

    // User confirmation: optional
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: `[GeoMundus 2026] Submission received - ${submissionId}`,
        text: `
Dear ${firstName} ${lastName},

Thank you for submitting your abstract to GeoMundus 2026.

Your submission has been received successfully and is now under review.

Submission ID: ${submissionId}
Title: ${title}

Selected themes:
${selectedThemes.map((theme) => `- ${theme}`).join("\n")}

Our team will review your submission and will contact you later with the decision and next steps, including whether it will proceed as an oral presentation or poster presentation.

Best regards,
GeoMundus 2026 Organizing Committee
https://geomundus.org
        `,
        html: `
          <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
          <p>Thank you for submitting your abstract to <strong>GeoMundus 2026</strong>.</p>
          <p>Your submission has been received successfully and is now under review.</p>
          <p><strong>Submission ID:</strong> ${submissionId}<br />
          <strong>Title:</strong> ${title}</p>
          <p><strong>Selected themes:</strong></p>
          <ul>
            ${selectedThemes.map((theme) => `<li>${theme}</li>`).join("")}
          </ul>
          <p>Our team will review your submission and will contact you later with the decision and next steps, including whether it will proceed as an oral presentation or poster presentation.</p>
          <p>Best regards,<br />GeoMundus 2026 Organizing Committee<br />https://geomundus.org</p>
        `,
      });

      confirmationEmailDelivered = true;
    } catch (err) {
      console.error("Confirmation email failed:", err);
      confirmationEmailError =
        err instanceof Error ? err.message : String(err);
    }

    await sanityWriteClient
      .patch(doc._id)
      .set({
        emailDelivered: true,
        confirmationEmailDelivered,
        confirmationEmailError,
      })
      .commit();

    return NextResponse.json({
      success: true,
      id: doc._id,
      submissionId,
      message: "Submission received successfully.",
      confirmationEmailDelivered,
    });
  } catch (error) {
    console.error("Submission error FULL:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while submitting the form.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}