import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
  capture_exceptions: true,
  capture_pageview: false,
  capture_pageleave: true,
  debug: process.env.NODE_ENV === "development",
});
