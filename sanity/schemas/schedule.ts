import { defineField, defineType } from "sanity";

export default defineType({
  name: "schedule",
  title: "Conference Schedule",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Conference Schedule",
    }),
    defineField({
      name: "days",
      title: "Conference Days",
      type: "array",
      of: [
        {
          type: "object",
          name: "day",
          fields: [
            {
              name: "date",
              title: "Date",
              type: "date",
            },
            {
              name: "events",
              title: "Events",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "event",
                  fields: [
                    {
                      name: "time",
                      title: "Time",
                      type: "string",
                    },
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                    },
                    {
                      name: "speaker",
                      title: "Speaker",
                      type: "string",
                    },
                    {
                      name: "location",
                      title: "Location",
                      type: "string",
                    },
                    {
                      name: "type",
                      title: "Event Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "Keynote", value: "keynote" },
                          { title: "Talk", value: "talk" },
                          { title: "Workshop", value: "workshop" },
                          { title: "Break", value: "break" },
                          { title: "Social", value: "social" },
                          { title: "Other", value: "other" },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
