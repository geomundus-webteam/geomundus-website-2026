import { defineField, defineType } from "sanity";

export default defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(2009).max(2100),
    }),
    defineField({
      name: "current",
      title: "Is Current Conference",
      type: "boolean",
      description: "Mark this as the current active conference",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Conference Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Conference Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "hostInstitution",
      title: "Host Institution",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Institution Name",
          type: "string",
        },
        {
          name: "description",
          title: "Institution Description",
          type: "text",
        },
        {
          name: "image",
          title: "Institution Image",
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "themes",
      title: "Conference Themes",
      type: "array",
      of: [{ type: "string" }],
      description: "Main themes or topics of the conference",
    }),
    defineField({
      name: "keynoteSpeakers",
      title: "Keynote Speakers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "organization",
              title: "Organization",
              type: "string",
            },
            {
              name: "topic",
              title: "Topic",
              type: "string",
            },
            {
              name: "websiteUrl",
              title: "Website URL",
              type: "url",
            },
            {
              name: "image",
              title: "Speaker Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "workshopLeaders",
      title: "Workshop Leaders",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "organization",
              title: "Organization",
              type: "string",
            },
            {
              name: "topic",
              title: "Topic",
              type: "string",
            },
            {
              name: "websiteUrl",
              title: "Website URL",
              type: "url",
            },
            {
              name: "image",
              title: "Speaker Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
    defineField({
      name: "focusTopic",
      title: "Focus Topic",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "topics",
          title: "Topics",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "logo",
              title: "Logo",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "websiteUrl",
              title: "Website URL",
              type: "url",
            },
            {
              name: "tier",
              title: "Sponsorship Tier",
              type: "string",
              options: {
                list: [
                  { title: "Platinum", value: "platinum" },
                  { title: "Gold", value: "gold" },
                  { title: "Silver", value: "silver" },
                  { title: "Bronze", value: "bronze" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "logo",
              title: "Logo",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "websiteUrl",
              title: "Website URL",
              type: "url",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "image",
    },
  },
});
