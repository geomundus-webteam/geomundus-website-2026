import { createClient } from "next-sanity";
import { cache } from "react";
import { apiVersion, dataset, projectId, useCdn, token } from "@/sanity/env";

const isDev = !projectId || projectId === "your_project_id";

export const client = isDev
  ? null as any
  : createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token,
      stega: { studioUrl: process.env.NEXT_PUBLIC_SITE_URL + "/studio" },
    });

// Create a cached version of the Sanity client - returns null in dev mode without credentials
export const cachedClient = cache(async (_query: any, _params?: any): Promise<any> => {
  if (isDev) return null;
  return client.fetch(_query, _params);
});

// Helper function to add tags to queries for revalidation
export function tagQuery(query: string, tag: string, id?: string) {
  const fullTag = id ? [`${tag}`, `${tag}:${id}`] : [tag];

  return {
    query,
    tag: fullTag,
    token: fullTag,
  };
}
