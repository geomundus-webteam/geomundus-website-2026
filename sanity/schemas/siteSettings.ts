import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "whiteLogo",
      title: "Site Logo (White)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "conferenceDate",
      title: "Conference Date",
      type: "date",
    }),
    defineField({
      name: "conferenceEndDate",
      title: "Conference End Date",
      type: "date",
    }),
    defineField({
      name: "conferenceLocation",
      title: "Conference Location",
      type: "string",
    }),
    defineField({
      name: "conferenceVenue",
      title: "Conference Venue",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "heroMessage",
      title: "Hero Message",
      type: "string",
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube Video ID",
      type: "string",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "mailingAddress",
      title: "Mailing Address",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "twitter",
          title: "Twitter URL",
          type: "url",
        }),
        defineField({
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
        defineField({
          name: "github",
          title: "GitHub URL",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
    }),
    defineField({
      name: "storyMapUrl",
      title: "Story Map URL",
      type: "url",
    }),
    defineField({
      name: "arrivalInfoPdfUrl",
      title: "Arrival Information PDF URL",
      type: "url",
    }),
    defineField({
      name: "registrationOpen",
      title: "Registration Open",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "registrationDeadline",
      title: "Registration Deadline",
      type: "date",
    }),
    defineField({
      name: "submissionOpen",
      title: "Submission Open",
      type: "boolean",
      initialValue: false,
      description: "Toggle to control if submissions are open or closed",
    }),
    // Banner Configuration
    defineField({
      name: "banner",
      title: "Site Banner",
      type: "object",
      fields: [
        defineField({
          name: "enabled",
          title: "Enable Banner",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "text",
          title: "Banner Text",
          type: "string",
          description: "The text to display in the banner",
        }),
        defineField({
          name: "color",
          title: "Banner Color",
          type: "string",
          options: {
            list: [
              { title: "Blue", value: "blue" },
              { title: "Green", value: "green" },
              { title: "Red", value: "red" },
              { title: "Yellow", value: "yellow" },
              { title: "Purple", value: "purple" },
            ],
          },
          initialValue: "blue",
        }),
        defineField({
          name: "linkText",
          title: "Link Text (Optional)",
          type: "string",
          description: "Text for the optional link button",
        }),
        defineField({
          name: "linkUrl",
          title: "Link URL (Optional)",
          type: "string",
          description: "URL for the optional link button",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
