import { defineField, defineType } from "sanity";

export default defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Speaker Role",
      type: "string",
      options: {
        list: [
          { title: "Keynote Speaker", value: "keynote" },
          { title: "Workshop Leader", value: "workshop" },
          { title: "Panel Speaker", value: "panel" },
          { title: "Moderator", value: "moderator" },
          { title: "Invited Speaker", value: "invited" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Organization / Affiliation",
      type: "string",
    }),
    defineField({
      name: "jobTitle",
      title: "Job Title",
      type: "string",
      description: "e.g. Professor of Geoinformatics, Senior Data Scientist",
    }),
    defineField({
      name: "topic",
      title: "Talk Topic / Title",
      type: "string",
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      description: "Plain text summary shown on speaker cards (max 280 characters)",
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text bio shown on the individual speaker page",
    }),
    defineField({
      name: "image",
      title: "Speaker Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "websiteUrl",
      title: "Personal / Org Website",
      type: "url",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter / X URL",
      type: "url",
    }),
    defineField({
      name: "googleScholarUrl",
      title: "Google Scholar URL",
      type: "url",
    }),
    defineField({
      name: "conference",
      title: "Conference",
      type: "reference",
      to: [{ type: "conference" }],
      description: "Which conference edition this speaker is part of",
    }),
    defineField({
      name: "featured",
      title: "Featured Speaker",
      type: "boolean",
      initialValue: false,
      description: "Highlight this speaker on the homepage",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (e.g. 1, 2, 3...)",
      initialValue: 99,
    }),
    defineField({
      name: "confirmed",
      title: "Confirmed",
      type: "boolean",
      initialValue: false,
      description: "Has the speaker confirmed their attendance?",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Role",
      name: "roleAsc",
      by: [{ field: "role", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      const roleLabels: Record<string, string> = {
        keynote: "Keynote Speaker",
        workshop: "Workshop Leader",
        panel: "Panel Speaker",
        moderator: "Moderator",
        invited: "Invited Speaker",
      };
      return {
        title: title || "Untitled Speaker",
        subtitle: subtitle ? roleLabels[subtitle] || subtitle : "No role set",
        media,
      };
    },
  },
});
