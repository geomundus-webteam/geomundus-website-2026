import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "teamName",
      title: "Team Name",
      type: "string",
      options: {
        list: [
          { title: "Program", value: "program" },
          { title: "Budget", value: "budget" },
          { title: "Web", value: "web" },
          { title: "Local", value: "local" },
          { title: "Steering", value: "steering" },
          { title: "Public Relations", value: "pr" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "conferenceYear",
      title: "Conference Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2020).max(2030),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({
          name: "twitter",
          title: "Twitter",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
        defineField({
          name: "github",
          title: "GitHub",
          type: "url",
        }),
        defineField({
          name: "website",
          title: "Personal Website",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description:
        "Specific role within the team (e.g., Team Lead, Coordinator)",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      description: "Short biography or description",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this member should appear",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Whether this team member is currently active",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "teamName",
      media: "photo",
      year: "conferenceYear",
    },
    prepare(selection) {
      const { title, subtitle, media, year } = selection;
      return {
        title,
        subtitle: `${subtitle} - ${year}`,
        media,
      };
    },
  },
});
