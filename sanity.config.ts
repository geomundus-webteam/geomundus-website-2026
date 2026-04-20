import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes";
import { dataset, projectId } from "./sanity/env";
import { visionTool } from "@sanity/vision";

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "GeoMundus",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema,
});
