import type React from "react";
import Navbar from "@/components/navbar";
import { cachedClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import SiteBanner from "@/components/site-banner";
import { PostHogProvider } from "@/components/PostHogProvider";
import { SiteSettings } from "@/sanity.types";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await cachedClient<SiteSettings>(
    siteSettingsQuery.query,
  );

  return (
    <PostHogProvider>
      {siteSettings?.banner?.enabled && siteSettings.banner.text && (
        <SiteBanner
          text={siteSettings.banner.text}
          color={siteSettings.banner.color || "blue"}
          linkText={siteSettings.banner.linkText}
          linkUrl={siteSettings.banner.linkUrl}
        />
      )}
      <Navbar siteSettings={siteSettings} />
      {children}
    </PostHogProvider>
  );
}
