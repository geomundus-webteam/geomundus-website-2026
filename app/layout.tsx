import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GeoMundus Conference",
  description: "International Conference on Geoinformation Sciences",
  icons: {
    icon: [
      { url: "favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "favicon/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "favicon/apple-icon-57x57.png", sizes: "57x57" },
      { url: "favicon/apple-icon-60x60.png", sizes: "60x60" },
      { url: "favicon/apple-icon-72x72.png", sizes: "72x72" },
      { url: "favicon/apple-icon-76x76.png", sizes: "76x76" },
      { url: "favicon/apple-icon-114x114.png", sizes: "114x114" },
      { url: "favicon/apple-icon-120x120.png", sizes: "120x120" },
      { url: "favicon/apple-icon-144x144.png", sizes: "144x144" },
      { url: "favicon/apple-icon-152x152.png", sizes: "152x152" },
      { url: "favicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "favicon/ms-icon-144x144.png",
    "msapplication-config": "favicon/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Google Sans', sans-serif" }}>{children}</body>
    </html>
  );
}