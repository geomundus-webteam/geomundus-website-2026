export const apiVersion = "2021-10-21";
export const dataset = process.env.SANITY_DATASET || "production";
export const projectId = (process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)!;
export const useCdn = process.env.NODE_ENV === "production";
export const token = process.env.SANITY_API_TOKEN;
