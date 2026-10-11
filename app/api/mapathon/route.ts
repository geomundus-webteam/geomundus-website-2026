import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/lib/sanity.write";
import sendEmail from "@/lib/email";
import { revalidatePath } from "next/cache";
import fs from "fs";
import { syncMapathonToSheet } from "@/lib/sync-mapathon-to-sheet";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const affiliation = String(formData.get("affiliation") || "").trim();
    const mapTitle = String(formData.get("mapTitle") || "").trim();
    const authors = String(formData.get("authors") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const mapLink = String(formData.get("mapLink") || "").trim();
    const consentGuidelines = formData.get("consentGuidelines") === "true";
    const consentAI = formData.get("consentAI") === "true";
    const mapFile = formData.get("mapFile") as File | null;

    // Basic validation
    if (!firstName || !lastName || !email || !mapTitle || !authors || !description) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!consentGuidelines || !consentAI) {
      return NextResponse.json(
        { error: "Please accept the guidelines and AI declaration." },
        { status: 400 }
      );
    }

    if (!mapFile && !mapLink) {
      return NextResponse.json(
        { error: "Please provide either a map file or a link." },
        { status: 400 }
      );
    }

    // Word count check on description
    const wordCount = description.split(/\s+/).filter(Boolean).length;
    if (wordCount === 0 || wordCount > 200) {
      return NextResponse.json(
        { error: `Description must be 200 words or fewer (currently ${wordCount}).` },
        { status: 400 }
      );
    }

    // Upload file to Sanity if provided
    let fileAsset = null;
    if (mapFile && mapFile.size > 0) {
      const arrayBuffer = await mapFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fileAsset = await sanityWriteClient.assets.upload("file", buffer, {
        filename: mapFile.name,
        contentType: mapFile.type,
      });
    }

    // Create Sanity document
    const doc: Record<string, unknown> = {
      _type: "mapathonSubmission",
      firstName,
      lastName,
      email,
      affiliation: affiliation || undefined,
      mapTitle,
      authors,
      description,
      mapLink: mapLink || undefined,
      consentGuidelines,
      consentAI,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };

    if (fileAsset) {
      doc.mapFile = {
        _type: "file",
        asset: { _type: "reference", _ref: fileAsset._id },
      };
    }

    const result = await sanityWriteClient.create(doc);

    // Signature for confirmation email
    const signaturePath = path.join(process.cwd(), "public", "email", "signature.jpg");
    const signatureBuffer = fs.existsSync(signaturePath) ? fs.readFileSync(signaturePath) : null;

    // Send confirmation email to submitter
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p>Dear ${firstName},</p>
        <p>Thank you for submitting your entry to the <strong>GeoMundus Map+ Challenge 2026</strong>!</p>
        <p><strong>Your submission details:</strong></p>
        <ul>
          <li><strong>Map Title:</strong> ${mapTitle}</li>
          <li><strong>Authors:</strong> ${authors}</li>
          <li><strong>Submission ID:</strong> ${result._id}</li>
        </ul>
        <p>Our team will review your submission and get back to you soon. Winners will be determined via social media (LinkedIn) likes and in-person voting by conference participants.</p>
        <p>If you have any questions, contact us at <a href="mailto:program@geomundus.org">program@geomundus.org</a>.</p>
        <p>Best regards,<br/>GeoMundus 2026 Team</p>
        ${signatureBuffer ? '<p style="margin-top: 20px;"><img src="cid:signature@geomundus" alt="GeoMundus Web Team" style="max-width: 600px; width: 100%; height: auto;" /></p>' : ''}
      </div>
    `;

    await sendEmail({
      to: email,
      subject: "[GeoMundus 2026] Map+ Challenge Submission Received",
      html: htmlBody,
      text: `Dear ${firstName},\n\nThank you for submitting your entry to the GeoMundus Map+ Challenge 2026!\n\nMap Title: ${mapTitle}\nAuthors: ${authors}\nSubmission ID: ${result._id}\n\nBest regards,\nGeoMundus 2026 Team`,
      attachments: signatureBuffer ? [{
        filename: "signature.jpg",
        content: signatureBuffer,
        contentType: "image/jpeg",
        cid: "signature@geomundus",
      } as any] : undefined,
    });

    // Notify team
    const submissionsTo = process.env.SUBMISSIONS_TO_EMAIL;
    if (submissionsTo) {
      await sendEmail({
        to: submissionsTo,
        subject: `[GeoMundus 2026] New Map+ Challenge Submission: ${mapTitle}`,
        text: [
          `New Map+ Challenge submission received:`,
          ``,
          `Name: ${firstName} ${lastName}`,
          `Email: ${email}`,
          `Affiliation: ${affiliation || "N/A"}`,
          `Map Title: ${mapTitle}`,
          `Authors: ${authors}`,
          `Description: ${description}`,
          `Map Link: ${mapLink || "N/A"}`,
          `File Uploaded: ${fileAsset ? "Yes" : "No"}`,
          `Submission ID: ${result._id}`,
        ].join("\n"),
      });
    }

    try {
      await syncMapathonToSheet();
    } catch (sheetError) {
      console.error("Mapathon Google Sheet sync failed:", sheetError);
    }

    revalidatePath("/mapathon");

    return NextResponse.json({ success: true, submissionId: result._id });
  } catch (error) {
    console.error("Mapathon submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again or contact program@geomundus.org." },
      { status: 500 }
    );
  }
}
