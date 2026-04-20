import { defineField, defineType } from "sanity";

export default defineType({
  name: "submission",
  title: "Submission Information",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Submissions",
    }),
    defineField({
      name: "description",
      title: "Page Description",
      type: "text",
    }),
    defineField({
      name: "callForPapersTitle",
      title: "Call for Papers Title",
      type: "string",
      initialValue: "Call for Short Paper and Poster",
    }),
    defineField({
      name: "callForPapersContent",
      title: "Call for Papers Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "submissionDeadline",
      title: "Submission Deadline",
      type: "date",
    }),
    defineField({
      name: "shortPaperGuidelineUrl",
      title: "Short Paper Guideline URL",
      type: "url",
    }),
    defineField({
      name: "posterGuidelineUrl",
      title: "Poster Guideline URL",
      type: "url",
    }),
    defineField({
      name: "submissionFormUrl",
      title: "Submission Form URL",
      type: "url",
      description: "URL to the form for submitting papers and posters",
    }),
    defineField({
      name: "mobilityGrantFormUrl",
      title: "Mobility Grant Form URL",
      type: "url",
      description: "URL to the form for applying for mobility grants",
    }),
    defineField({
      name: "posterPrintingNote",
      title: "Poster Printing Note",
      type: "text",
      initialValue:
        "The presenter will pay the cost of printing the poster. The cost of printing a poster and the way of sending the cost of printing will be published soon.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      initialValue: "program@geomundus.org",
    }),
    defineField({
      name: "contactNote",
      title: "Contact Note",
      type: "text",
      initialValue:
        "If you have further queries about the short paper and abstract submission, please contact the conference organizing committee. You are requested to keep an eye on our website and social networks regularly to get the latest updates.",
    }),
    defineField({
      name: "footnote",
      title: "Footnote",
      type: "text",
      initialValue:
        "* This process does not exclude the author to submit the paper to other papers, journals, or conferences",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
