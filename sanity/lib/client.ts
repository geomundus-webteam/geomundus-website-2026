import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  perspective: "published",
});

export const previewClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_AUTH_TOKEN,
});

export const getClient = (preview = false) =>
  preview ? previewClient : client;
