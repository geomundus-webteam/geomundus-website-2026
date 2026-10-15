import { defineField, defineType } from "sanity";

export default defineType({
  name: "mapathonSubmission",
  title: "Map+ Challenge Submission",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
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
    }),
    defineField({
      name: "mapTitle",
      title: "Map Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors (comma separated)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (100-200 words)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapFile",
      title: "Map File",
      type: "file",
      description: "PDF or PNG file of the map",
    }),
    defineField({
      name: "mapLink",
      title: "Map Link",
      type: "url",
      description: "Interactive web map URL (Google Drive, Dropbox, etc.)",
    }),
    defineField({
      name: "consentGuidelines",
      title: "Consent to Guidelines",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "consentAI",
      title: "Declaration - No AI Used",
      type: "boolean",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Submitted", value: "submitted" },
          { title: "Under Review", value: "review" },
          { title: "Accepted", value: "accepted" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "submitted",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (cover image for the voting page)",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Recommended for PDF and interactive maps: upload a screenshot (4:3 works best).",
    }),
    defineField({
      name: "finalist",
      title: "Finalist (shown on the voting page)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "finalistOrder",
      title: "Order on voting page",
      type: "number",
      description: "1 to 6. Lower numbers appear first.",
    }),
  ],
  preview: {
    select: {
      title: "mapTitle",
      subtitle: "email",
    },
  },
});
