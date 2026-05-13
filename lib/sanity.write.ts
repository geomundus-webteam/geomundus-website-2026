import { createClient } from "@sanity/client";

export const sanityWriteClient = createClient({
  projectId:
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2021-10-21",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});