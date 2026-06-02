import { defineField, defineType } from "sanity";

export default defineType({
  name: "abstractSubmission",
  title: "Abstract Submission",
  type: "document",
  fields: [
    defineField({
      name: "submissionId",
      title: "Submission ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "selectedThemes",
      title: "Selected Themes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "title",
      title: "Submission Title",
      type: "string",
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "text",
    }),
    defineField({
      name: "originalFileName",
      title: "Original File Name",
      type: "string",
    }),
    defineField({
      name: "emailDelivered",
      title: "Email Delivered",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "submitted",
      options: {
        list: [
          { title: "Submitted", value: "submitted" },
          { title: "Under review", value: "under-review" },
          { title: "Accepted", value: "accepted" },
          { title: "Rejected", value: "rejected" },
        ],
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
    defineField({
      name: "confirmationEmailDelivered",
      title: "Confirmation Email Delivered",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "confirmationEmailError",
      title: "Confirmation Email Error",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "submissionId",
      subtitle: "email",
    },
  },
});