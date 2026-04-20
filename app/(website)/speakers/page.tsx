import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cachedClient } from "@/lib/sanity.client";
import {
  currentConferenceQuery,
  siteSettingsQuery,
} from "@/lib/sanity.queries";
import { LuExternalLink } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Speakers | GeoMundus Conference",
  description: "Meet our keynote speakers for the GeoMundus Conference",
};

export default async function SpeakersPage() {
  const currentConference = await cachedClient(currentConferenceQuery.query);
  const speakers = currentConference.keynoteSpeakers || [];
  const workshopLeaders = currentConference.workshopLeaders || [];
  const siteSettings = await cachedClient(siteSettingsQuery.query);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <div className="flex mb-6"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Keynote Speakers and Workshops Leaders
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            GeoMundus features a broad landscape of expertise within the GIS
            field, including academic figures, NGO advisors, government
            officials, and private sector actors.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto mt-12 mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Keynote Speakers
        </h1>
      </div>

      {/* Speakers List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {speakers && speakers.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-12">
              {speakers.map((speaker, index) => (
                <div
                  key={speaker._id}
                  className={`flex flex-col lg:flex-row gap-8 p-8 rounded-lg shadow-lg bg-white border ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Speaker Image */}
                  <div className="flex-shrink-0 lg:w-80">
                    <div className="relative w-64 h-64 mx-auto lg:w-full lg:h-80 overflow-hidden rounded-lg">
                      <Image
                        src={
                          speaker.imageUrl ||
                          "/placeholder.svg?height=320&width=320"
                        }
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="flex-grow">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        {speaker.name}
                        {speaker.websiteUrl && (
                          <Link
                            href={speaker.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-800"
                          >
                            <LuExternalLink className="h-6 w-6" />
                            <span className="sr-only">Website</span>
                          </Link>
                        )}
                      </h2>
                      <p className="text-xl text-gray-600 mb-2">
                        {speaker.title}
                      </p>
                      <p className="text-lg text-gray-500">
                        {speaker.organization}
                      </p>
                    </div>

                    {/* Keynote Information */}
                    {(speaker.keynoteTitle || speaker.description) && (
                      <div className="bg-emerald-50 p-6 rounded-lg">
                        <h3 className="font-bold text-xl text-emerald-800 mb-3">
                          KEYNOTE PRESENTATION
                        </h3>
                        {speaker.keynoteTitle && (
                          <h4 className="font-semibold text-lg text-gray-900 mb-3">
                            {speaker.keynoteTitle}
                          </h4>
                        )}
                        {speaker.description && (
                          <div className="text-gray-700 leading-relaxed">
                            {speaker.description}
                          </div>
                        )}
                      </div>
                    )}

                    {/* No keynote info message */}
                    {!speaker.keynoteTitle && !speaker.description && (
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-600 italic">
                          Keynote details will be announced soon. Stay tuned for
                          more information about this speaker's presentation.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">
                  Speakers Coming Soon
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  We're currently finalizing our lineup of distinguished
                  speakers for this year's conference. Check back soon for
                  updates!
                </p>
                {siteSettings?.contactEmail && (
                  <p className="text-gray-600">
                    Interested in speaking at GeoMundus?{" "}
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
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Workshops Leaders
        </h1>
      </div>

      {/* Workshop Leaders List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {workshopLeaders && workshopLeaders.length > 0 ? (
            <div className="max-w-4xl mx-auto space-y-12">
              {workshopLeaders.map((speaker, index) => (
                <div
                  key={speaker._id}
                  className={`flex flex-col lg:flex-row gap-8 p-8 rounded-lg shadow-lg bg-white border ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Speaker Image */}
                  <div className="flex-shrink-0 lg:w-80">
                    <div className="relative w-64 h-64 mx-auto lg:w-full lg:h-80 overflow-hidden rounded-lg">
                      <Image
                        src={
                          speaker.imageUrl ||
                          "/placeholder.svg?height=320&width=320"
                        }
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Speaker Details */}
                  <div className="flex-grow">
                    <div className="mb-6">
                      <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        {speaker.name}
                        {speaker.websiteUrl && (
                          <Link
                            href={speaker.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-800"
                          >
                            <LuExternalLink className="h-6 w-6" />
                            <span className="sr-only">Website</span>
                          </Link>
                        )}
                      </h2>
                      <p className="text-xl text-gray-600 mb-2">
                        {speaker.title}
                      </p>
                      <p className="text-lg text-gray-500">
                        {speaker.organization}
                      </p>
                    </div>

                    {/* Keynote Information */}
                    {(speaker.keynoteTitle || speaker.description) && (
                      <div className="bg-emerald-50 p-6 rounded-lg">
                        <h3 className="font-bold text-xl text-emerald-800 mb-3">
                          Workshop
                        </h3>
                        {speaker.keynoteTitle && (
                          <h4 className="font-semibold text-lg text-gray-900 mb-3">
                            {speaker.keynoteTitle}
                          </h4>
                        )}
                        {speaker.description && (
                          <div className="text-gray-700 leading-relaxed">
                            {speaker.description}
                          </div>
                        )}
                      </div>
                    )}

                    {/* No keynote info message */}
                    {!speaker.keynoteTitle && !speaker.description && (
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-600 italic">
                          Keynote details will be announced soon. Stay tuned for
                          more information about this speaker's presentation.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">
                  Speakers Coming Soon
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  We're currently finalizing our lineup of distinguished
                  speakers for this year's conference. Check back soon for
                  updates!
                </p>
                {siteSettings?.contactEmail && (
                  <p className="text-gray-600">
                    Interested in speaking at GeoMundus?{" "}
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
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50"></section>
    </main>
  );
}
