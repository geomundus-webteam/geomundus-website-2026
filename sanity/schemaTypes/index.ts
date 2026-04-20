import type { SchemaTypeDefinition } from "sanity";

import siteSettings from "../schemas/siteSettings";
import conference from "../schemas/conference";
import schedule from "../schemas/schedule";
import faq from "../schemas/faq";
import registration from "../schemas/registration";
import submission from "../schemas/submission";
import teamMember from "../schemas/teamMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    conference,
    schedule,
    faq,
    registration,
    submission,
    teamMember,
  ],
};
