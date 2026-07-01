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
      title: "Email",
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
      name: "nationality",
      title: "Nationality",
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
      title: "Position (Other)",
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
      title: "Reason for Attending",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "To present research", value: "present_research" },
          { title: "To attend sessions", value: "attend_sessions" },
          { title: "Networking", value: "networking" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "attendanceReasonOther",
      title: "Attendance Reason (Other)",
      type: "string",
    }),
    defineField({
      name: "presenting",
      title: "Plan to Present",
      type: "string",
      options: {
        list: [
          { title: "Yes, already submitted", value: "submitted" },
          { title: "Yes, planning to submit", value: "planning" },
          { title: "No", value: "no" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "attendanceDays",
      title: "Attendance Days",
      type: "string",
      options: {
        list: [
          { title: "Both days", value: "both" },
          { title: "Friday (October 16th)", value: "friday" },
          { title: "Saturday (October 17th)", value: "saturday" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dietaryRestrictions",
      title: "Dietary Restrictions or Food Allergies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Halal", value: "halal" },
          { title: "Gluten-free", value: "gluten_free" },
          { title: "Lactose-free", value: "lactose_free" },
          { title: "Allergies (please specify)", value: "allergies" },
          { title: "Other (please specify)", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "dietaryRestrictionsOther",
      title: "Dietary Restrictions (Details)",
      type: "string",
    }),
    defineField({
      name: "beveragePreference",
      title: "Beverage Preference",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Alcoholic", value: "alcoholic" },
          { title: "Non-alcoholic", value: "non_alcoholic" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "attendingDinner",
      title: "Interested in Conference Dinner",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "I'm still deciding", value: "still_deciding" },
          { title: "No", value: "no" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "consentPublicList",
      title: "Consent - Public Participants List",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "consentPhotography",
      title: "Consent - Photography and Recording",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "howDidYouHear",
      title: "How Did You Hear About GeoMundus",
      type: "string",
      options: {
        list: [
          { title: "University", value: "university" },
          { title: "Facebook", value: "facebook" },
          { title: "Instagram post", value: "instagram" },
          { title: "LinkedIn post", value: "linkedin" },
          { title: "Friend / Colleague who has attended before", value: "friend_attended" },
          { title: "Friend / Colleague who has not attended", value: "friend_not_attended" },
          { title: "GeoMundus Website", value: "geomundus_website" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "howDidYouHearOther",
      title: "How Did You Hear (Other)",
      type: "string",
    }),
    defineField({
      name: "additionalComments",
      title: "Additional Comments",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Status",
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
      name: "registeredAt",
      title: "Registered At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
    },
  },
});
