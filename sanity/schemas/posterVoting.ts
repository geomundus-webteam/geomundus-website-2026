// Singleton settings document for poster voting. Register it next to mapathonVoting.
import { defineField, defineType } from "sanity";

export default defineType({
  name: "posterVoting",
  title: "Poster Voting",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Page heading", type: "string", initialValue: "Poster Award: Audience Vote" }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 3 }),
    defineField({
      name: "votingOpen",
      title: "Voting open",
      type: "boolean",
      description: "Switch off to close voting instantly.",
      initialValue: false,
    }),
    defineField({
      name: "driveFolderUrl",
      title: "Google Drive folder URL (the poster PDFs)",
      type: "url",
      description:
        "Put one PDF per poster in this folder. The file name becomes the poster title, e.g. '03 - Flood mapping with ML - Jane Doe.pdf'. Share the folder with the service account (Viewer) and set link sharing to 'Anyone with the link can view'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sheetUrl",
      title: "Google Sheet URL (votes are saved here)",
      type: "url",
      description: 'Needs a tab named "PosterVotes". Share the sheet with the service account as Editor.',
      validation: (r) => r.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Poster Voting" }) },
});
