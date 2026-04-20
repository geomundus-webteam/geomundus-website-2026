import { defineField, defineType } from "sanity";

export default defineType({
  name: "registration",
  title: "Registration",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation (University / Organization)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country of Residence",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Position / Role",
      type: "string",
      options: {
        list: [
          { title: "Bachelor Student", value: "bachelor_student" },
          { title: "Master Student", value: "master_student" },
          { title: "PhD Student", value: "phd_student" },
          { title: "Researcher", value: "researcher" },
          { title: "Professor / Lecturer", value: "professor" },
          { title: "Industry Professional", value: "industry" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "positionOther",
      title: "Other Position (if selected Other above)",
      type: "string",
      hidden: ({ parent }) => parent?.position !== "other",
    }),
    defineField({
      name: "website",
      title: "Professional Website or LinkedIn",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attendanceReason",
      title: "Main Reason for Attending",
      type: "string",
      options: {
        list: [
          { title: "To present research", value: "present_research" },
          { title: "To attend sessions", value: "attend_sessions" },
          { title: "Networking", value: "networking" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attendanceReasonOther",
      title: "Other Reason (if selected Other above)",
      type: "string",
      hidden: ({ parent }) => parent?.attendanceReason !== "other",
    }),
    defineField({
      name: "presenting",
      title: "Will you be presenting at the conference?",
      type: "string",
      options: {
        list: [
          { title: "Yes – Oral presentation", value: "oral" },
          { title: "Yes – Poster presentation", value: "poster" },
          { title: "No", value: "no" },
        ],
      },
    }),
    defineField({
      name: "mapChallenge",
      title: "Submit entry for Map+ Challenge",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "attendingDinner",
      title: "Will you attend the conference dinner (Friday 17th)?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dietaryRestrictions",
      title: "Dietary Restrictions",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Vegan", value: "vegan" },
          { title: "Gluten-Free", value: "gluten_free" },
          { title: "Halal", value: "halal" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dietaryRestrictionsOther",
      title: "Other Dietary Restrictions",
      type: "string",
      hidden: ({ parent }) => parent?.dietaryRestrictions !== "other",
    }),
    defineField({
      name: "alcoholConsumption",
      title: "Plan to consume alcoholic beverages at dinner?",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
          { title: "Maybe", value: "maybe" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "drinkPreferences",
      title: "Drink Preferences",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Water", value: "water" },
          { title: "Soft drinks (e.g., juice, soda)", value: "soft_drinks" },
          { title: "Coffee / Tea", value: "coffee_tea" },
          { title: "Beer", value: "beer" },
          { title: "Wine", value: "wine" },
          { title: "Cocktails", value: "cocktails" },
          { title: "Non-alcoholic options only", value: "non_alcoholic_only" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "drinkRestrictions",
      title: "Drink-related restrictions or preferences",
      type: "text",
    }),
    defineField({
      name: "workshopPreferences",
      title: "Workshop Preferences (Ranked 1-4)",
      type: "object",
      fields: [
        defineField({
          name: "disasterManagement",
          title:
            "Geospatial data for disaster management and climate resilience",
          type: "number",
          options: {
            list: [
              { title: "1 (Most preferred)", value: 1 },
              { title: "2", value: 2 },
              { title: "3", value: 3 },
              { title: "4 (Least preferred)", value: 4 },
            ],
          },
          validation: (Rule) => Rule.required().min(1).max(4),
        }),
        defineField({
          name: "digitalTwins",
          title: "Introduction to digital twins for smart cities",
          type: "number",
          options: {
            list: [
              { title: "1 (Most preferred)", value: 1 },
              { title: "2", value: 2 },
              { title: "3", value: 3 },
              { title: "4 (Least preferred)", value: 4 },
            ],
          },
          validation: (Rule) => Rule.required().min(1).max(4),
        }),
        defineField({
          name: "participatoryMapping",
          title: "Participatory mapping for smarter cities",
          type: "number",
          options: {
            list: [
              { title: "1 (Most preferred)", value: 1 },
              { title: "2", value: 2 },
              { title: "3", value: 3 },
              { title: "4 (Least preferred)", value: 4 },
            ],
          },
          validation: (Rule) => Rule.required().min(1).max(4),
        }),
        defineField({
          name: "participatoryMappingChallenge",
          title:
            "Participatory Mapping and the Smart Lisbon Cartographic Challenge (Solenn Reeves Long)",
          type: "number",
          options: {
            list: [
              { title: "1 (Most preferred)", value: 1 },
              { title: "2", value: 2 },
              { title: "3", value: 3 },
              { title: "4 (Least preferred)", value: 4 },
            ],
          },
          validation: (Rule) => Rule.required().min(1).max(4),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "needsAccommodationHelp",
      title: "Need help with accommodation in Lisbon?",
      type: "boolean",
    }),
    defineField({
      name: "joinWhatsApp",
      title: "Join GeoMundus WhatsApp group for updates?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "consentPublicList",
      title: "Consent for name and affiliation in public participants list?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "consentPhotography",
      title: "Consent to be photographed/recorded for promotional purposes?",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "howDidYouHear",
      title: "How did you hear about GeoMundus 2025?",
      type: "string",
      options: {
        list: [
          { title: "University", value: "university" },
          { title: "Social Media", value: "social_media" },
          { title: "Friend / Colleague", value: "friend_colleague" },
          { title: "GeoMundus Website", value: "website" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "howDidYouHearOther",
      title: "Other Source (if selected Other above)",
      type: "string",
      hidden: ({ parent }) => parent?.howDidYouHear !== "other",
    }),
    defineField({
      name: "additionalComments",
      title: "Comments, requests, or special needs",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Registration Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "qrCode",
      title: "QR Code",
      type: "image",
      description: "QR code for guest verification",
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
      media: "qrCode",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "No name",
        subtitle: subtitle || "No email",
      };
    },
  },
});
