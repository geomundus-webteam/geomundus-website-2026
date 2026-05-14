import {defineField, defineType} from "sanity";

export default defineType({
  name: "abstractSubmission",
  title: "Abstract Submission",
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
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Corresponding Author Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "sessionTheme",
      title: "Session Theme",
      type: "string",
      options: {
        list: [
          {title: "Urban planning and infrastructure", value: "urban-planning-and-infrastructure"},
          {title: "Environmental sustainability and resilience", value: "environmental-sustainability-and-resilience"},
          {title: "Smart governance and citizen engagement", value: "smart-governance-and-citizen-engagement"},
          {title: "IoT and Big Data for Smart Cities", value: "iot-and-big-data-for-smart-cities"},
          {title: "Disaster management and risk assessment", value: "disaster-management-and-risk-assessment"},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "submissionType",
      title: "Submission Type",
      type: "string",
      options: {
        list: [
          {title: "Paper presentation", value: "paper"},
          {title: "Poster presentation", value: "poster"},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Submission Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "text",
      description: "Separate authors with commas",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "driveFileId",
      title: "Drive File ID",
      type: "string",
    }),
    defineField({
      name: "driveFileUrl",
      title: "Drive File URL",
      type: "url",
    }),
    defineField({
      name: "originalFileName",
      title: "Original File Name",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "submitted",
      options: {
        list: [
          {title: "Submitted", value: "submitted"},
          {title: "Under review", value: "under-review"},
          {title: "Accepted", value: "accepted"},
          {title: "Rejected", value: "rejected"},
        ],
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "email",
    },
  },
});