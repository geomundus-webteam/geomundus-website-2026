import type { StructureBuilder } from "sanity/desk";
import {
  FiSettings,
  FiUsers,
  FiCalendar,
  FiHelpCircle,
  FiFileText,
  FiStar,
  FiArchive,
  FiDollarSign,
  FiUserCheck,
} from "react-icons/fi";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(FiSettings)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),

      S.listItem()
        .title("Focus Topic")
        .icon(FiStar)
        .child(S.document().schemaType("focusTopic").documentId("focusTopic")),

      S.listItem()
        .title("Conferences")
        .icon(FiCalendar)
        .child(
          S.list()
            .title("Conferences")
            .items([
              S.listItem()
                .title("Current Conference")
                .icon(FiCalendar)
                .child(
                  S.documentList()
                    .title("Current Conference")
                    .filter('_type == "conference" && current == true'),
                ),
              S.listItem()
                .title("All Conferences")
                .icon(FiArchive)
                .child(
                  S.documentList()
                    .title("All Conferences")
                    .filter('_type == "conference"')
                    .defaultOrdering([{ field: "year", direction: "desc" }]),
                ),
            ]),
        ),

      S.listItem()
        .title("Speakers")
        .icon(FiUsers)
        .child(
          S.list()
            .title("Speakers")
            .items([
              S.listItem()
                .title("All Speakers")
                .icon(FiUsers)
                .child(
                  S.documentList()
                    .title("All Speakers")
                    .filter('_type == "speaker"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Keynote Speakers")
                .icon(FiStar)
                .child(
                  S.documentList()
                    .title("Keynote Speakers")
                    .filter('_type == "speaker" && role == "keynote"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Workshop Leaders")
                .icon(FiUserCheck)
                .child(
                  S.documentList()
                    .title("Workshop Leaders")
                    .filter('_type == "speaker" && role == "workshop"')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Featured Speakers")
                .icon(FiStar)
                .child(
                  S.documentList()
                    .title("Featured Speakers")
                    .filter('_type == "speaker" && featured == true')
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
            ]),
        ),

      S.listItem()
        .title("Schedule")
        .icon(FiCalendar)
        .child(S.document().schemaType("schedule").documentId("schedule")),

      S.listItem()
        .title("Sponsors")
        .icon(FiDollarSign)
        .child(S.documentTypeList("sponsor")),

      S.listItem()
        .title("Partners")
        .icon(FiUsers)
        .child(S.documentTypeList("partner")),

      S.listItem()
        .title("FAQs")
        .icon(FiHelpCircle)
        .child(S.documentTypeList("faq")),

      S.listItem()
        .title("Registrations")
        .icon(FiUserCheck)
        .child(S.documentTypeList("registration")),

      S.listItem()
        .title("Submission Info")
        .icon(FiFileText)
        .child(S.document().schemaType("submission").documentId("submission")),
    ]);
