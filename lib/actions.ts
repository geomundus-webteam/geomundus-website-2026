"use server";

import { revalidatePath } from "next/cache";
import { sanityWriteClient } from "@/lib/sanity.write";
import sendEmail from "@/lib/email";

export async function submitRegistration(formData: {
  fullName: string;
  email: string;
  affiliation: string;
  country: string;
  position: string;
  positionOther?: string;
  website: string;
  attendanceReason: string;
  attendanceReasonOther?: string;
  presenting?: string;
  mapChallenge: boolean;
  attendingDinner: boolean;
  dietaryRestrictions: string;
  dietaryRestrictionsOther?: string;
  alcoholConsumption: string;
  drinkPreferences: string[];
  drinkRestrictions?: string;
  workshopPreferences: {
    hazardModelling: number;
    earlyWarning: number;
    decisionSupport: number;
    emergencyResponse: number;
    damageAssessment: number;
  };
  needsAccommodationHelp: boolean;
  joinWhatsApp: boolean;
  consentPublicList: boolean;
  consentPhotography: boolean;
  howDidYouHear?: string;
  howDidYouHearOther?: string;
  additionalComments?: string;
}) {
  // Check for duplicate email
  const existing = await sanityWriteClient.fetch(
    `count(*[_type == "registration" && email == $email])`,
    { email: formData.email }
  );

  if (existing > 0) {
    throw new Error("EMAIL_ALREADY_REGISTERED");
  }

  // Save to Sanity
  const result = await sanityWriteClient.create({
    _type: "registration",
    fullName: formData.fullName,
    email: formData.email,
    affiliation: formData.affiliation,
    country: formData.country,
    position: formData.position,
    positionOther: formData.positionOther || "",
    website: formData.website,
    attendanceReason: formData.attendanceReason,
    attendanceReasonOther: formData.attendanceReasonOther || "",
    presenting: formData.presenting || "no",
    mapChallenge: formData.mapChallenge,
    attendingDinner: formData.attendingDinner,
    dietaryRestrictions: formData.dietaryRestrictions,
    dietaryRestrictionsOther: formData.dietaryRestrictionsOther || "",
    alcoholConsumption: formData.alcoholConsumption,
    drinkPreferences: formData.drinkPreferences,
    drinkRestrictions: formData.drinkRestrictions || "",
    workshopPreferences: formData.workshopPreferences,
    needsAccommodationHelp: formData.needsAccommodationHelp,
    joinWhatsApp: formData.joinWhatsApp,
    consentPublicList: formData.consentPublicList,
    consentPhotography: formData.consentPhotography,
    howDidYouHear: formData.howDidYouHear || "",
    howDidYouHearOther: formData.howDidYouHearOther || "",
    additionalComments: formData.additionalComments || "",
    status: "pending",
    registeredAt: new Date().toISOString(),
  });

  // Send confirmation email to registrant
  await sendEmail({
    to: formData.email,
    subject: "[GeoMundus 2026] Registration Confirmed",
    text: [
      `Dear ${formData.fullName},`,
      ``,
      `Thank you for registering for GeoMundus 2026 — the 18th Edition of the GeoMundus Conference!`,
      ``,
      `Conference Details:`,
      `- Theme: Geospatial Intelligence for Disaster Resilience`,
      `- Dates: October 16-17, 2026`,
      `- Location: Universitat Jaume I, Castellón de la Plana, Spain`,
      ``,
      `Your Registration Summary:`,
      `- Name: ${formData.fullName}`,
      `- Affiliation: ${formData.affiliation}`,
      `- Presenting: ${formData.presenting === "oral" ? "Oral presentation" : formData.presenting === "poster" ? "Poster presentation" : "No"}`,
      `- Conference Dinner: ${formData.attendingDinner ? "Yes" : "No"}`,
      ``,
      `We will send you further details as the conference date approaches.`,
      `If you have any questions, please contact us at program@geomundus.org`,
      ``,
      `Best regards,`,
      `GeoMundus 2026 Organizing Committee`,
      `https://geomundus.org`,
    ].join("\n"),
  });

  // Send notification to web team
  await sendEmail({
    to: process.env.EMAIL_FROM || "webteam@geomundus.org",
    subject: `[GeoMundus 2026] New Registration: ${formData.fullName}`,
    text: [
      `New registration received:`,
      ``,
      `Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Affiliation: ${formData.affiliation}`,
      `Country: ${formData.country}`,
      `Position: ${formData.position}`,
      `Presenting: ${formData.presenting || "no"}`,
      `Dinner: ${formData.attendingDinner ? "Yes" : "No"}`,
      `Dietary: ${formData.dietaryRestrictions}`,
      `Accommodation help: ${formData.needsAccommodationHelp ? "Yes" : "No"}`,
      ``,
      `Registration ID: ${result._id}`,
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
