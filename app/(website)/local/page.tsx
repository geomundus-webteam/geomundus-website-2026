import type { Metadata } from "next";
import { cachedClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel | GeoMundus Conference",
  description: "Travel information for the GeoMundus Conference 2026",
};

export default async function TravelPage() {
  const siteSettings = await cachedClient(siteSettingsQuery.query);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Travel & Local Info
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Everything you need to know about getting to and around Castellón de la Plana.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12 max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-12">
              <h2 className="text-3xl font-bold text-gray-700 mb-4">
                Information Coming Soon
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                We are currently preparing travel and local information for GeoMundus 2026 in Castellón de la Plana, Spain. Check back soon for details on accommodation, transport, and local tips.
              </p>
              {siteSettings?.conferenceLocation && (
                <p className="text-gray-500 mb-6">
                  📍 {siteSettings.conferenceLocation}
                </p>
              )}
              {siteSettings?.contactEmail && (
                <p className="text-gray-600">
                  Have questions?{" "}
                  <Link
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="text-emerald-700 hover:underline font-medium"
                  >
                    Contact us
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}