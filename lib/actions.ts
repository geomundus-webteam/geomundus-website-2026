"use server";

import { revalidatePath } from "next/cache";
import { client } from "@/lib/sanity.client";
import QRCode from "qrcode";

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
    disasterManagement: number;
    digitalTwins: number;
    participatoryMapping: number;
  };
  needsAccommodationHelp: boolean;
  joinWhatsApp: boolean;
  consentPublicList: boolean;
  consentPhotography: boolean;
  howDidYouHear?: string;
  howDidYouHearOther?: string;
  additionalComments?: string;
}) {
  const guestUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://geomundus.org"}/guests/${encodeURIComponent(formData.email)}`;
  // const qrBuffer = await QRCode.toBuffer(guestUrl)
  // const qrImageAsset = await client.assets.upload("image", qrBuffer, {
  //   filename: `qr-${formData.email}.png`,
  //   contentType: "image/png",
  // })

  const result = await client.create({
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
    // qrCode: {
    //   _type: "image",
    //   asset: {
    //     _type: "reference",
    //     _ref: qrImageAsset._id,
    //   },
    // },
  });

  // Send notification to Teams/Discord
  await sendWebhookNotification({
    fullName: formData.fullName,
    email: formData.email,
    affiliation: formData.affiliation,
    country: formData.country,
    position: formData.position,
  });

  revalidatePath("/admin/registrations");
  return { success: true, data: result };
}

export async function verifyAdminToken(token: string) {
  const result = token === process.env.ADMIN_TOKEN;

  if (!result) {
    throw new Error("Invalid token");
  }

  return result;
}

// Function to send webhook notification to Teams/Discord
async function sendWebhookNotification(registrationData: {
  fullName: string;
  email: string;
  affiliation: string;
  country: string;
  position: string;
}) {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "Notification webhook URL not configured. Skipping notification.",
    );
    return;
  }

  try {
    if (
      webhookUrl.includes("office.com") ||
      webhookUrl.includes("outlook.com")
    ) {
      const teamsPayload = {
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        themeColor: "0076D7",
        summary: "New GeoMundus 2025 Registration",
        sections: [
          {
            activityTitle: "🎉 New Conference Registration",
            activitySubtitle: `${registrationData.fullName} has registered for GeoMundus 2025`,
            facts: [
              {
                name: "Name",
                value: registrationData.fullName,
              },
              {
                name: "Email",
                value: registrationData.email,
              },
              {
                name: "Affiliation",
                value: registrationData.affiliation,
              },
              {
                name: "Country",
                value: registrationData.country,
              },
              {
                name: "Position",
                value: registrationData.position,
              },
            ],
            markdown: true,
          },
        ],
        potentialAction: [
          {
            "@type": "OpenUri",
            name: "View in Admin",
            targets: [
              {
                os: "default",
                uri: `${process.env.NEXT_PUBLIC_SITE_URL || "https://geomundus.org"}/studio`,
              },
            ],
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamsPayload),
      });
    }
    // Format for Discord
    else {
      const discordPayload = {
        embeds: [
          {
            title: "🎉 New Conference Registration",
            description: `**${registrationData.fullName}** has registered for GeoMundus 2025`,
            color: 3447003, // Blue color
            fields: [
              {
                name: "Email",
                value: registrationData.email,
                inline: true,
              },
              {
                name: "Affiliation",
                value: registrationData.affiliation,
                inline: true,
              },
              {
                name: "Country",
                value: registrationData.country,
                inline: true,
              },
              {
                name: "Position",
                value: registrationData.position,
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "GeoMundus 2025 Registration System",
            },
          },
        ],
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordPayload),
      });
    }

    console.log("Registration notification sent successfully");
  } catch (error) {
    console.error("Error sending registration notification:", error);
    // Don't throw the error - we don't want to fail the registration if notification fails
  }
}
