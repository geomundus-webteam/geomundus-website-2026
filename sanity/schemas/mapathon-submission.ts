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
  ],
  preview: {
    select: {
      title: "mapTitle",
      subtitle: "email",
    },
  },
});
