import { groq } from "next-sanity";
import { tagQuery } from "./sanity.client";

// Site settings
export const siteSettingsQuery = tagQuery(
  groq`*[_type == "siteSettings"][0]{
    title,
    description,
    "logo": logo.asset->url,
    "whiteLogo": whiteLogo.asset->url,
    conferenceDate,
    conferenceEndDate,
    conferenceLocation,
    conferenceVenue,
    heroSubtitle,
    heroMessage,
    youtubeVideoId,
    contactEmail,
    mailingAddress,
    socialLinks,
    googleMapsEmbedUrl,
    storyMapUrl,
    arrivalInfoPdfUrl,
    registrationOpen,
    registrationDeadline,
    submissionOpen,
    banner,
    "currentConferenceYear": *[_type == "conference" && current == true][0].year
  }`,
  "siteSettings",
);

// Current conference with speakers
export const currentConferenceQuery = tagQuery(
  groq`*[_type == "conference" && current == true][0]{
    _id,
    year,
    title,
    description,
    "imageUrl": image.asset->url,
    location,
    themes,
    keynoteSpeakers[] {
      _id,
      name,
      organization,
      topic,
      description,
      "imageUrl": image.asset->url,
    },
    workshopLeaders[] {
      _id,
      name,
      organization,
      topic,
      description,
      "imageUrl": image.asset->url,
    },
    about {
      title,
      content
    },
    focusTopic {
      title,
      description,
      topics
    },
    partners[] {
      name,
      "logoUrl": logo.asset->url,
      websiteUrl
    },
    sponsors[] {
      name,
      "logoUrl": logo.asset->url,
      websiteUrl,
      tier
    }
  }`,
  "currentConference",
);

// Sponsors
export const sponsorsQuery = tagQuery(
  groq`*[_type == "sponsor"] | order(tier asc, order asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    websiteUrl,
    tier
  }`,
  "sponsor",
);

// Partners
export const partnersQuery = tagQuery(
  groq`*[_type == "partner"] | order(order asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    websiteUrl
  }`,
  "partner",
);

// Conference archives
export const conferencesQuery = tagQuery(
  groq`*[_type == "conference"] | order(year desc) {
    _id,
    year,
    title,
    description,
    "imageUrl": image.asset->url,
    location,
    current
  }`,
  "conference",
);

export const conferenceByYearQuery = (year: number) =>
  tagQuery(
    groq`*[_type == "conference" && year == $year][0] {
      _id,
      year,
      title,
      description,
      "imageUrl": image.asset->url,
      location,
      highlights,
      "galleryImages": gallery[].asset->url,
      hostInstitution {
        name,
        description,
        "imageUrl": image.asset->url
      },
      themes,
      keynoteSpeakers[] {
        name,
        organization,
        topic,
        "imageUrl": image.asset->url,
      },
      about {
        title,
        content
      },
      focusTopic {
        title,
        description,
        topics
      },
      sponsors[] {
        name,
        "logoUrl": logo.asset->url,
        websiteUrl,
        tier
      },
      partners[] {
        name,
        "logoUrl": logo.asset->url,
        websiteUrl
      }
    }`,
    "conference",
  );

export const currentConferenceYearQuery = tagQuery(
  groq`*[_type == "conference" && current == true][0].year`,
  "conference",
);

// Schedule
export const scheduleQuery = tagQuery(
  groq`*[_type == "schedule"][0] {
    days[] {
      date,
      events[] {
        time,
        title,
        description,
        speaker,
        location,
        type
      }
    }
  }`,
  "schedule",
);

// FAQs
export const faqsQuery = tagQuery(
  groq`*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }`,
  "faq",
);

export const registrationsQuery = tagQuery(
  groq`*[_type == "registration"] | order(_createdAt desc) {
    _id,
    fullName,
    email,
    affiliation,
    country,
    position,
    positionOther,
    website,
    attendanceReason,
    attendanceReasonOther,
    presenting,
    mapChallenge,
    attendingDinner,
    dietaryRestrictions,
    dietaryRestrictionsOther,
    alcoholConsumption,
    drinkPreferences,
    drinkRestrictions,
    workshopPreferences,
    needsAccommodationHelp,
    joinWhatsApp,
    consentPublicList,
    consentPhotography,
    howDidYouHear,
    howDidYouHearOther,
    additionalComments,
    status,
    _createdAt
  }`,
  "registration",
);

export const registrationByEmailQuery = (email: string) =>
  tagQuery(
    groq`*[_type == "registration" && email == $email][0] {
      _id,
      fullName,
      email,
      affiliation,
      country,
      position,
      positionOther,
      website,
      attendanceReason,
      attendanceReasonOther,
      presenting,
      mapChallenge,
      attendingDinner,
      dietaryRestrictions,
      dietaryRestrictionsOther,
      alcoholConsumption,
      drinkPreferences,
      drinkRestrictions,
      workshopPreferences,
      needsAccommodationHelp,
      joinWhatsApp,
      consentPublicList,
      consentPhotography,
      howDidYouHear,
      howDidYouHearOther,
      additionalComments,
      status,
      "qrCodeUrl": qrCode.asset->url,
      _createdAt
    }`,
    "registration",
  );

// Submission info
export const submissionInfoQuery = tagQuery(
  groq`*[_type == "submission"][0] {
    title,
    description,
    callForPapersTitle,
    callForPapersContent,
    submissionDeadline,
    shortPaperGuidelineUrl,
    posterGuidelineUrl,
    submissionFormUrl,
    mobilityGrantFormUrl,
    posterPrintingNote,
    contactEmail,
    contactNote,
    footnote
  }`,
  "submission",
);

// Team members
export const teamMembersQuery = tagQuery(
  groq`*[_type == "teamMember" && isActive == true] | order(teamName asc, order asc) {
    _id,
    name,
    "photoUrl": photo.asset->url,
    teamName,
    conferenceYear,
    socialLinks,
    role,
    bio,
    order
  }`,
  "teamMember",
);

// Current team members (for current conference year)
export const currentTeamMembersQuery = tagQuery(
  groq`*[_type == "teamMember" && isActive == true && conferenceYear == $year] | order(teamName asc, order asc) {
    _id,
    name,
    "photoUrl": photo.asset->url,
    teamName,
    conferenceYear,
    socialLinks,
    role,
    bio,
    order
  }`,
  "teamMember",
);
