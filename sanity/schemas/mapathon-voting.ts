// Singleton settings document. Register it in your schema list and
// (optionally) pin it in your Studio structure as a single document.
import { defineField, defineType } from "sanity";

export default defineType({
  name: "mapathonVoting",
  title: "Map+ Challenge Voting",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page heading", type: "string", initialValue: "Map+ Challenge: Audience Vote" }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 3 }),
    defineField({
      name: "votingOpen",
      title: "Voting open",
      type: "boolean",
      description: "Switch off to close voting instantly.",
      initialValue: false,
    }),
    defineField({
      name: "sheetUrl",
      title: "Google Sheet URL (votes are saved here)",
      type: "url",
      description: 'Share the sheet with the service account as Editor. It needs a tab named "Votes".',
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Map+ Challenge Voting" }) },
});
