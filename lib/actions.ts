"use server";

import { revalidatePath } from "next/cache";
import { sanityWriteClient } from "@/lib/sanity.write";
import sendEmail from "@/lib/email";
import fs from "fs";
import path from "path";

export async function submitRegistration(formData: {
  fullName: string;
  email: string;
  affiliation: string;
  country: string;
  nationality: string;
  position: string;
  positionOther?: string;
  website: string;
  attendanceReason: string[];
  attendanceReasonOther?: string;
  presenting: string;
  attendanceDays: string;
  dietaryRestrictions: string[];
  dietaryRestrictionsOther?: string;
  beveragePreference: string[];
  attendingDinner: string;
  consentPublicList: boolean;
  consentPhotography: boolean;
  howDidYouHear?: string;
  howDidYouHearOther?: string;
  additionalComments?: string;
}) {
  const existing = await sanityWriteClient.fetch(
    `count(*[_type == "registration" && email == $email && registeredAt > "2026-01-01"])`,
    { email: formData.email }
  );

  if (existing > 0) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }

  const result = await sanityWriteClient.create({
    _type: "registration",
    fullName: formData.fullName,
    email: formData.email,
    affiliation: formData.affiliation,
    country: formData.country,
    nationality: formData.nationality,
    position: formData.position,
    positionOther: formData.positionOther || "",
    website: formData.website,
    attendanceReason: formData.attendanceReason,
    attendanceReasonOther: formData.attendanceReasonOther || "",
    presenting: formData.presenting,
    attendanceDays: formData.attendanceDays,
    dietaryRestrictions: formData.dietaryRestrictions,
    dietaryRestrictionsOther: formData.dietaryRestrictionsOther || "",
    beveragePreference: formData.beveragePreference,
    attendingDinner: formData.attendingDinner,
    consentPublicList: formData.consentPublicList,
    consentPhotography: formData.consentPhotography,
    howDidYouHear: formData.howDidYouHear || "",
    howDidYouHearOther: formData.howDidYouHearOther || "",
    additionalComments: formData.additionalComments || "",
    status: "pending",
    registeredAt: new Date().toISOString(),
  });

  const signaturePath = path.join(process.cwd(), "public", "email", "signature.jpg");
  const signatureBuffer = fs.existsSync(signaturePath) ? fs.readFileSync(signaturePath) : null;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <p>Dear participant,</p>
      <p>Welcome to the GeoMundus 2026 Conference, <strong>"Geospatial Intelligence for Disaster Resilience"</strong>! We are thrilled to have you join our growing community of students and professionals passionate about geospatial innovation.</p>
      <p>The conference will take place at <strong>Universitat Jaume I in Castellon (Spain)</strong> from <strong>October 16-17</strong>. The official Conference Dinner will take place on October 16, offering a great opportunity for networking. Spots are limited and are given on a first-come basis and attendance is subject to confirmation by the GeoMundus team closer to the date of the conference. Further details regarding the venue will be communicated together with the confirmation.</p>
      <p><strong>Join our WhatsApp Community:</strong><br/>
      To stay connected and receive real-time updates before and during the event, we have created a dedicated WhatsApp group.<br/>
      Feel free to join via link: <a href="https://chat.whatsapp.com/Fvapnehebv575yqUPzwAhG">https://chat.whatsapp.com/Fvapnehebv575yqUPzwAhG</a></p>
      <p>Also, we invite you to follow us on our official website and social media:<br/>
      Website: <a href="https://geomundus.org/">https://geomundus.org/</a><br/>
      Instagram: <a href="https://www.instagram.com/geomundus_conference/">https://www.instagram.com/geomundus_conference/</a><br/>
      Facebook: <a href="https://www.facebook.com/geomundus/">https://www.facebook.com/geomundus/</a><br/>
      LinkedIn: <a href="https://www.linkedin.com/company/geomundusconference/">https://www.linkedin.com/company/geomundusconference/</a><br/>
      Twitter: <a href="https://x.com/geomundus_conf">https://x.com/geomundus_conf</a></p>
      <p>We look forward to welcoming you in Castellon soon!!</p>
      <p>Best regards,<br/>GeoMundus 2026 Team</p>
      ${signatureBuffer ? '<p style="margin-top: 20px;"><img src="cid:signature@geomundus" alt="GeoMundus Web Team" style="max-width: 600px; width: 100%; height: auto;" /></p>' : ''}
    </div>
  `;

  await sendEmail({
    to: formData.email,
    subject: "[GeoMundus 2026] Registration Confirmed",
    html: htmlBody,
    attachments: signatureBuffer ? [{
      filename: "signature.jpg",
      content: signatureBuffer,
      contentType: "image/jpeg",
      cid: "signature@geomundus",
    } as any] : undefined,
    text: [
      "Dear participant,",
      "",
      'Welcome to the GeoMundus 2026 Conference, "Geospatial Intelligence for Disaster Resilience"! We are thrilled to have you join our growing community of students and professionals passionate about geospatial innovation.',
      "",
      "The conference will take place at Universitat Jaume I in Castellon (Spain) from October 16-17. The official Conference Dinner will take place on October 16, offering a great opportunity for networking. Spots are limited and are given on a first-come basis and attendance is subject to confirmation by the GeoMundus team closer to the date of the conference. Further details regarding the venue will be communicated together with the confirmation.",
      "",
      "Join our WhatsApp Community:",
      "To stay connected and receive real-time updates before and during the event, we have created a dedicated WhatsApp group.",
      "Feel free to join via link: https://chat.whatsapp.com/Fvapnehebv575yqUPzwAhG",
      "",
      "Also, we invite you to follow us on our official website and social media:",
      "Website: https://geomundus.org/",
      "Instagram: https://www.instagram.com/geomundus_conference/",
      "Facebook: https://www.facebook.com/geomundus/",
      "LinkedIn: https://www.linkedin.com/company/geomundusconference/",
      "Twitter: https://x.com/geomundus_conf",
      "",
      "We look forward to welcoming you in Castellon soon!!",
      "",
      "Best regards,",
      "GeoMundus 2026 Team",
    ].join("\n"),
  });

  await sendEmail({
    to: process.env.EMAIL_FROM || "webteam@geomundus.org",
    subject: "[GeoMundus 2026] New Registration: " + formData.fullName,
    text: [
      "New registration received:",
      "",
      "Name: " + formData.fullName,
      "Email: " + formData.email,
      "Affiliation: " + formData.affiliation,
      "Country: " + formData.country,
      "Nationality: " + formData.nationality,
      "Position: " + formData.position,
      "Days: " + formData.attendanceDays,
      "Presenting: " + formData.presenting,
      "Dinner: " + formData.attendingDinner,
      "Dietary: " + formData.dietaryRestrictions.join(", "),
      "Beverages: " + formData.beveragePreference.join(", "),
      "",
      "Registration ID: " + result._id,
    ].join("\n"),
  });

  revalidatePath("/registration");
  return { success: true, data: result };
}

export async function verifyAdminToken(token: string) {
  const result = token === process.env.ADMIN_TOKEN;
  if (!result) {
    throw new Error("Invalid token");
  }
  return result;
}
