import type { Metadata } from "next";
import Link from "next/link";
import { cachedClient } from "@/lib/sanity.client";
import { speakersQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import { LuExternalLink, LuLinkedin, LuTwitter, LuBookOpen } from "react-icons/lu";
import SpeakerBio from "@/components/speaker-bio";

export const metadata: Metadata = {
  title: "Speakers | GeoMundus Conference",
  description: "Meet our speakers for the GeoMundus Conference 2026",
};

const roleLabel: Record<string, string> = {
  keynote: "Keynote Speaker",
  workshop: "Workshop Leader",
  panel: "Panel Speaker",
  moderator: "Moderator",
  invited: "Invited Speaker",
}

const roleBadgeColor: Record<string, string> = {
  keynote: "bg-[#e0f0dc] text-[#058a78]",
  workshop: "bg-[#e8f4e4] text-[#3a7a30]",
  panel: "bg-[#eaf2f8] text-[#457b9d]",
  moderator: "bg-[#f5f0ff] text-[#6b4fa0]",
  invited: "bg-[#fff4e0] text-[#b07000]",
}

const roleGroups = [
  { key: "keynote", label: "Keynote Speakers" },
  { key: "workshop", label: "Workshop Leaders" },
  { key: "panel", label: "Panel Speakers" },
  { key: "moderator", label: "Moderators" },
  { key: "invited", label: "Invited Speakers" },
]

export default async function SpeakersPage() {
  const speakers = await cachedClient(speakersQuery.query) ?? []
  const siteSettings = await cachedClient(siteSettingsQuery.query)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section
        className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white"
        style={{ background: "linear-gradient(135deg, #036154, #058a78)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Speakers</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-85">
            GeoMundus features a broad landscape of expertise within the GIS field, including academic figures, NGO advisors, government officials, and private sector actors.
          </p>
        </div>
      </section>

      {/* Speakers by role */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {roleGroups.map(({ key, label }) => {
            const group = speakers.filter((s: any) => s.role === key && s.confirmed)
            if (group.length === 0) return null
            return (
              <div key={key} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <p className="text-[20px] font-medium text-[#058a78] uppercase tracking-widest">{label}</p>
                  <div className="flex-1 h-px bg-[#e0eada]" />
                </div>
                <div className="space-y-6">
                  {group.map((speaker: any) => (
                    <div key={speaker._id} className="flex gap-5 p-6 rounded-2xl border border-[#e0eada] bg-white hover:border-[#b2d8d4] transition-colors">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full bg-[#e8f4e4] border border-[#c8ddb8] flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {speaker.imageUrl ? (
                          <img src={speaker.imageUrl} alt={speaker.name ?? ""} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[#058a78] font-medium text-2xl">{speaker.name?.[0] ?? "?"}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div>
                            <span className={`inline-block text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-full mb-2 ${roleBadgeColor[key]}`}>
                              {roleLabel[key]}
                            </span>
                            <h2 className="text-[17px] font-medium text-[#1d1d1f]">{speaker.name}</h2>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            {speaker.websiteUrl && (
                              <Link href={speaker.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#058a78]">
                                <LuExternalLink className="h-4 w-4" />
                              </Link>
                            )}
                            {speaker.linkedin && (
                              <Link href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#058a78]">
                                <LuLinkedin className="h-4 w-4" />
                              </Link>
                            )}
                            {speaker.twitter && (
                              <Link href={speaker.twitter} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#058a78]">
                                <LuTwitter className="h-4 w-4" />
                              </Link>
                            )}
                            {speaker.googleScholarUrl && (
                              <Link href={speaker.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="text-[#6e6e73] hover:text-[#058a78]">
                                <LuBookOpen className="h-4 w-4" />
                              </Link>
                            )}
                          </div>
                        </div>

                        {speaker.title && <p className="text-[13px] text-[#6e6e73] mb-0.5">{speaker.title}</p>}
                        {speaker.organization && <p className="text-[13px] text-[#058a78] mb-3">{speaker.organization}</p>}

                        {speaker.topic && (
                          <div className="border-l-2 border-[#058a78] pl-3 mb-3">
                            <p className="text-[11px] font-medium text-[#058a78] uppercase tracking-widest mb-0.5">
                              {key === "workshop" ? "Workshop" : "Keynote"}
                            </p>
                            <p className="text-[13px] font-medium text-[#1d1d1f]">{speaker.topic}</p>
                          </div>
                        )}

                        <SpeakerBio shortBio={speaker.bio} fullBio={speaker.fullBio} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}

          {speakers.filter((s: any) => s.confirmed).length === 0 && (
            <div className="text-center py-16 bg-[#f5f9f4] rounded-2xl">
              <p className="text-[16px] text-[#6e6e73] mb-4">Speakers will be announced soon.</p>
              {siteSettings?.contactEmail && (
                <p className="text-[14px] text-[#6e6e73]">
                  Interested in speaking?{" "}
                  <Link href={`mailto:${siteSettings.contactEmail}`} className="text-[#058a78] hover:underline font-medium">
                    Contact us
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#f5f9f4] border-t border-[#e0eada]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[15px] text-[#6e6e73] mb-4">Interested in speaking at GeoMundus 2026?</p>
          {siteSettings?.contactEmail && (
            <Link
              href={`mailto:${siteSettings.contactEmail}`}
              className="inline-block bg-[#058a78] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#036154] transition-colors"
            >
              Contact us
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}