import Link from "next/link";
import Image from "next/image";
import { cachedClient } from "@/lib/sanity.client";
import {
  siteSettingsQuery,
  currentConferenceQuery,
  scheduleQuery,
  faqsQuery,
  currentConferenceYearQuery,
} from "@/lib/sanity.queries";
import ScheduleSection from "@/components/schedule-section";
import FaqSection from "@/components/faq-section";
import { RegisterButton } from "@/components/register-button";
import PortableTextRenderer from "@/components/portable-text-renderer";
import type { Conference, Faq, Schedule, SiteSettings } from "@/sanity.types";
import { SocialLinks } from "@/components/socialLinks";
import CookieConsent from "@/components/cookie-consent";

interface KeynoteSpeaker {
  name?: string;
  organization?: string;
  topic?: string;
  imageUrl?: string;
  websiteUrl?: string;
}

interface CurrentConference extends Conference {
  about?: { title?: string; content?: any };
  focusTopic?: { title?: string; description?: any; topics?: string[] };
  keynoteSpeakers?: KeynoteSpeaker[];
  workshopLeaders?: KeynoteSpeaker[];
  partners?: any[];
  sponsors?: any[];
}

const mockSiteSettings: any = {
  title: "GeoMundus 2026",
  conferenceDate: "2026-10-01",
  conferenceEndDate: "2026-10-02",
  conferenceLocation: "Castellón de la Plana, Spain",
  conferenceVenue: "Universitat Jaume I",
  heroSubtitle: "Theme to be announced soon",
  heroMessage: "See you in Spain!",
  contactEmail: "webteam@geomundus.org",
  registrationOpen: false,
  submissionOpen: false,
};

const mockConference: any = {
  year: 2026,
  title: "GeoMundus Conference 2026",
  description: "The 18th edition of the GeoMundus Conference.",
  location: "Castellón de la Plana, Spain",
  keynoteSpeakers: [],
  workshopLeaders: [],
  sponsors: [],
  partners: [],
};

export default async function Home() {
  const siteSettingsRaw = await cachedClient<SiteSettings>(siteSettingsQuery.query);
  const currentConferenceRaw = await cachedClient<CurrentConference>(currentConferenceQuery.query);
  const schedule = await cachedClient<Schedule>(scheduleQuery.query);
  const faqs = await cachedClient<Faq[]>(faqsQuery.query);
  const currentYearRaw = await cachedClient<Conference>(currentConferenceYearQuery.query);

  const siteSettings = siteSettingsRaw ?? mockSiteSettings;
  const currentConference = currentConferenceRaw ?? mockConference;
  const currentYear = currentYearRaw ?? { year: 2026 };

  const startDate = siteSettings?.conferenceDate ? new Date(siteSettings.conferenceDate) : null;
  const endDate = siteSettings?.conferenceEndDate ? new Date(siteSettings.conferenceEndDate) : null;
  const startDay = startDate?.getDate();
  const endDay = endDate?.getDate();
  const month = startDate?.toLocaleString("default", { month: "long" });
  const year = startDate?.getFullYear();

  return (
    <main className="flex min-h-screen flex-col bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative bg-[#f5f9f4] pt-24 pb-20 text-center px-6 overflow-hidden">
        {/* Soft radial glow behind the logo */}
        <div className="absolute inset-x-0 top-0 h-[480px] pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 35%, rgba(125, 186, 90, 0.18) 0%, rgba(125, 186, 90, 0.06) 40%, transparent 75%)" }} />

        <div className="relative z-10">
          <p className="text-[13px] font-medium text-[#3a7a30] tracking-wide mb-8">
            18th Edition · GeoMundus Conference 2026
          </p>

          {/* Big centered logo */}
          <div className="flex justify-center mb-10">
            <Image src="/geo_logo.png" alt="GeoMundus 2026" width={280} height={335} priority className="drop-shadow-[0_10px_40px_rgba(45,106,39,0.15)]" />
          </div>

          <h1 className="text-[44px] md:text-[56px] font-medium text-[#1d1d1f] leading-[1.05] tracking-tight mb-5">
            Mapping the path to <em className="not-italic text-[#3a7a30]">resilience.</em>
          </h1>
          <p className="text-[18px] text-[#6e6e73] leading-relaxed max-w-[520px] mx-auto mb-10">
            Geospatial Intelligence for Disaster Resilience. Castellón de la Plana, Spain.
          </p>

        <div className="flex justify-center gap-3 mb-12">
          <RegisterButton registrationOpen={siteSettings?.registrationOpen} />
          <Link
            href="/#info"
            className="text-[15px] text-[#2d6a27] border border-[#2d6a27] px-7 py-3 rounded-full hover:bg-[#2d6a27] hover:text-white transition-all duration-200"
          >
            Learn more
          </Link>
        </div>

        {/* Meta pills */}
        <div className="inline-flex border border-[#d8e8d4] rounded-2xl overflow-hidden bg-white max-w-[480px] w-full">
          <div className="flex-1 py-4 px-5 text-center border-r border-[#e8f0e4]">
            <p className="text-[11px] text-[#aeaeb2] uppercase tracking-wider mb-1">Date</p>
            <p className="text-[15px] font-medium text-[#1d1d1f]">
              {startDay && endDay && month ? `${month} ${startDay}–${endDay}, ${year}` : "TBD · 2026"}
            </p>
          </div>
          <div className="flex-1 py-4 px-5 text-center border-r border-[#e8f0e4]">
            <p className="text-[11px] text-[#aeaeb2] uppercase tracking-wider mb-1">Location</p>
            <p className="text-[15px] font-medium text-[#1d1d1f]">
              {siteSettings?.conferenceLocation ?? "Castellón, Spain"}
            </p>
          </div>
          <div className="flex-1 py-4 px-5 text-center">
            <p className="text-[11px] text-[#aeaeb2] uppercase tracking-wider mb-1">Edition</p>
            <p className="text-[15px] font-medium text-[#1d1d1f]">18th</p>
          </div>
        </div>

        {/* Topographic ring illustration */}
        <div className="mt-16 flex justify-center">
          <svg width="560" height="160" viewBox="0 0 560 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
            <ellipse cx="280" cy="80" rx="260" ry="70" stroke="#d4e8d0" strokeWidth="0.8"/>
            <ellipse cx="280" cy="80" rx="196" ry="53" stroke="#c4dfc0" strokeWidth="0.8"/>
            <ellipse cx="280" cy="80" rx="138" ry="37" stroke="#a8cfa4" strokeWidth="0.8"/>
            <ellipse cx="280" cy="80" rx="86" ry="23" stroke="#7dba5a" strokeWidth="1"/>
            <ellipse cx="280" cy="80" rx="40" ry="11" fill="#e6f2e4"/>
            <circle cx="280" cy="80" r="5" fill="#2d6a27"/>
            <circle cx="280" cy="80" r="2" fill="white"/>
            <circle cx="170" cy="55" r="3" fill="#7dba5a" fillOpacity="0.55"/>
            <circle cx="400" cy="100" r="2.5" fill="#7dba5a" fillOpacity="0.45"/>
            <circle cx="128" cy="87" r="2" fill="#7dba5a" fillOpacity="0.35"/>
            <line x1="170" y1="55" x2="280" y2="80" stroke="#c8dfc4" strokeWidth="0.5" strokeDasharray="3 3"/>
            <line x1="400" y1="100" x2="280" y2="80" stroke="#c8dfc4" strokeWidth="0.5" strokeDasharray="3 3"/>
          </svg>
        </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#1a2e18] grid grid-cols-2 md:grid-cols-4 border-t border-[#ffffff10]">
        {[
          { num: "18th", label: "Edition" },
          { num: "100+", label: "Participants" },
          { num: "5+", label: "Keynote speakers" },
          { num: "3", label: "Workshops" },
        ].map(({ num, label }) => (
          <div key={label} className="py-6 px-6 text-center border-r border-[#ffffff08] last:border-r-0">
            <p className="text-[28px] font-medium text-white">{num}</p>
            <p className="text-[11px] text-[#ffffff40] uppercase tracking-wider mt-1">{label}</p>
          </div>
        ))}
      </section>

      {/* ── ABOUT ── */}
      <section id="info" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">About</p>
            <h2 className="text-[36px] font-medium text-[#1d1d1f] leading-tight tracking-tight mb-5">
              Geospatial science,<br />shaped by students
            </h2>
            <p className="text-[15px] text-[#6e6e73] leading-[1.85] mb-4">
              GeoMundus is a free international conference organized by students of the Erasmus Mundus Master in Geospatial Technologies. Since 2009, it has united researchers, practitioners, and students from across the globe.
            </p>
            <p className="text-[15px] text-[#6e6e73] leading-[1.85]">
              The 18th edition comes to Castellón de la Plana, hosted by Universitat Jaume I.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#e0eada] bg-[#f5f9f4]">
            <svg width="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="#f5f9f4"/>
              <ellipse cx="200" cy="150" rx="165" ry="120" stroke="#d4e8d0" strokeWidth="1"/>
              <ellipse cx="200" cy="150" rx="120" ry="87" stroke="#c0debb" strokeWidth="1"/>
              <ellipse cx="200" cy="150" rx="82" ry="60" stroke="#a8cfa4" strokeWidth="1"/>
              <ellipse cx="200" cy="150" rx="50" ry="36" stroke="#7dba5a" strokeWidth="1"/>
              <ellipse cx="200" cy="150" rx="22" ry="16" fill="#e6f2e4"/>
              <circle cx="200" cy="150" r="5" fill="#2d6a27"/>
              <circle cx="200" cy="150" r="2" fill="white"/>
              <circle cx="135" cy="112" r="3" fill="#7dba5a" fillOpacity="0.5"/>
              <circle cx="268" cy="178" r="2.5" fill="#7dba5a" fillOpacity="0.45"/>
              <line x1="135" y1="112" x2="200" y2="150" stroke="#c8dfc4" strokeWidth="0.5" strokeDasharray="3 3"/>
              <text x="16" y="24" fill="#c4dfc0" fontSize="10" fontFamily="monospace">GeoMundus · 2026</text>
              <text x="16" y="288" fill="#c4dfc0" fontSize="10" fontFamily="monospace">Castellón, Spain</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ── THEME ── */}
      <section className="py-24 px-6 bg-[#f5f9f4] border-t border-[#f0f0f0]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Theme</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">Geospatial Intelligence for Disaster Resilience</h2>
          <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-12 max-w-[480px] mx-auto">
            The 2026 theme explores how geospatial science strengthens early warning systems, disaster response, and climate adaptation.
          </p>
          <div className="bg-white rounded-2xl border border-[#deeada] p-10 text-left">
            <span className="inline-block text-[11px] font-medium tracking-widest uppercase bg-[#e0f0dc] text-[#3a7a30] px-4 py-1.5 rounded-full mb-5">
              2026 Theme
            </span>
            <h3 className="text-[22px] font-medium text-[#1d1d1f] tracking-tight mb-3">
              GeoMundus 2026 — focus areas
            </h3>
            <p className="text-[14px] text-[#6e6e73] leading-[1.8] mb-6">
              GeoMundus 2026 brings together researchers, practitioners, and students working at the intersection of geospatial science and disaster resilience — from satellite-based early warning to participatory risk mapping.
            </p>
            <div className="flex flex-wrap gap-2">
              {["GIS", "Remote sensing", "Spatial AI", "Earth observation", "Disaster resilience"].map((tag) => (
                <span key={tag} className="text-[13px] bg-white text-[#3a7a30] border border-[#c4dcc0] px-4 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPEAKERS ── */}
      {currentConference?.keynoteSpeakers && currentConference.keynoteSpeakers.length > 0 ? (
        <section id="speakers" className="py-24 px-6 bg-white border-t border-[#f0f0f0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Speakers</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">Keynote speakers</h2>
              <p className="text-[17px] text-[#6e6e73] max-w-[440px] mx-auto">World-class voices from academia, research, and industry.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentConference.keynoteSpeakers.map((speaker, i) => (
                <div key={i} className="bg-[#f5f9f4] rounded-2xl border border-[#e0eada] p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#e8f4e4] border border-[#c8ddb8] mx-auto mb-4 flex items-center justify-center">
                    <span className="text-[#3a7a30] font-medium text-lg">{speaker.name?.[0] ?? "?"}</span>
                  </div>
                  <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">{speaker.name}</p>
                  <p className="text-[13px] text-[#3a7a30]">{speaker.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section id="speakers" className="py-24 px-6 bg-[#f5f9f4] border-t border-[#f0f0f0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Speakers</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">Keynote speakers</h2>
              <p className="text-[17px] text-[#6e6e73] max-w-[440px] mx-auto">World-class voices from academia, research, and industry. Full lineup coming soon.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[{ icon: "🌍", slot: "Keynote speaker #1" }, { icon: "🛰️", slot: "Keynote speaker #2" }, { icon: "🗺️", slot: "Keynote speaker #3" }].map(({ icon, slot }) => (
                <div key={slot} className="bg-white rounded-2xl border border-[#e8e8e8] p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#e8f4e4] mx-auto mb-4 flex items-center justify-center text-2xl">{icon}</div>
                  <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">To be announced</p>
                  <p className="text-[13px] text-[#3a7a30]">{slot}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SCHEDULE ── */}
      {schedule && schedule.days && schedule.days.length > 0 && (
        <section id="schedule" className="py-24 px-6 bg-white border-t border-[#f0f0f0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Programme</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight">Conference schedule</h2>
            </div>
            <ScheduleSection schedule={schedule} />
          </div>
        </section>
      )}

      {/* ── TIMELINE ── */}
      <section className="py-24 px-6 bg-[#f5f9f4] border-t border-[#f0f0f0]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Timeline</p>
            <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">Key dates</h2>
            <p className="text-[16px] text-[#6e6e73]">All dates subject to confirmation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 border border-[#e8e8e8] rounded-2xl overflow-hidden bg-white">
            {[
              { n: "01", t: "Call for papers", d: "Submit your abstract for oral or poster presentation" },
              { n: "02", t: "Submission deadline", d: "Final day for papers and posters" },
              { n: "03", t: "Registration opens", d: "Secure your spot at GeoMundus 2026" },
              { n: "04", t: "Conference days", d: "Talks, workshops, and networking" },
            ].map(({ n, t, d }, i) => (
              <div key={n} className={`p-7 ${i < 3 ? "border-b md:border-b-0 md:border-r" : ""} border-[#f0f0f0]`}>
                <p className="text-[11px] font-medium text-[#c4c4c8] tracking-widest mb-3">{n}</p>
                <p className="text-[15px] font-medium text-[#1d1d1f] mb-2">{t}</p>
                <p className="text-[13px] text-[#6e6e73] leading-snug mb-3">{d}</p>
                <p className="text-[13px] font-medium text-[#3a7a30]">TBD 2026</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section id="sponsors" className="py-24 px-6 bg-white border-t border-[#f0f0f0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Sponsors</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-5">Sponsors & partners</h2>
          <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-3 max-w-xl mx-auto">
            GeoMundus is seeking partners from public and private entities including spatial, technological, scientific, and academic fields.
          </p>
          <p className="text-[15px] text-[#6e6e73] mb-10">
            Contact us at{" "}
            <Link href="mailto:budget@geomundus.org" className="text-[#2d6a27] hover:underline">
              budget@geomundus.org
            </Link>
          </p>
          <Link href="/sponsors" className="inline-block bg-[#2d6a27] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#245520] transition-colors">
            View sponsors
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqs && faqs.length > 0 && (
        <section id="faq" className="py-24 px-6 bg-[#f5f9f4] border-t border-[#f0f0f0]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">FAQ</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight">Frequently asked questions</h2>
            </div>
            <FaqSection faqs={faqs} />
          </div>
        </section>
      )}

      {/* ── VENUE ── */}
      <section className="py-24 px-6 bg-[#1a2e18]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[12px] font-medium text-[#7dba5a] uppercase tracking-widest mb-5">Venue</p>
            <h2 className="text-[36px] font-medium text-[#f2f9f0] tracking-tight mb-3">Universitat Jaume I</h2>
            <p className="text-[14px] text-[#ffffff40] mb-5">Castellón de la Plana, Spain</p>
            <p className="text-[15px] text-[#ffffff50] leading-[1.8]">
              One of three host universities of the Erasmus Mundus Master in Geospatial Technologies, alongside NOVA IMS in Lisbon and WWU Münster in Germany.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#ffffff10]">
            <svg width="100%" viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="260" fill="#1e3520"/>
              <ellipse cx="222" cy="130" rx="175" ry="106" stroke="rgba(125,186,90,0.1)" strokeWidth="1"/>
              <ellipse cx="222" cy="130" rx="128" ry="78" stroke="rgba(125,186,90,0.15)" strokeWidth="1"/>
              <ellipse cx="222" cy="130" rx="86" ry="52" stroke="rgba(125,186,90,0.22)" strokeWidth="1"/>
              <ellipse cx="222" cy="130" rx="46" ry="28" stroke="rgba(125,186,90,0.32)" strokeWidth="1"/>
              <ellipse cx="222" cy="130" rx="18" ry="11" fill="rgba(125,186,90,0.15)"/>
              <circle cx="222" cy="130" r="5.5" fill="#7dba5a"/>
              <circle cx="222" cy="130" r="2" fill="white"/>
              <circle cx="222" cy="130" r="16" stroke="#7dba5a" strokeWidth="0.5" strokeOpacity="0.35"/>
              <text x="234" y="126" fill="rgba(125,186,90,0.75)" fontSize="11" fontFamily="sans-serif">Castellón</text>
              <text x="234" y="140" fill="rgba(125,186,90,0.4)" fontSize="9" fontFamily="sans-serif">Universitat Jaume I</text>
              <circle cx="128" cy="92" r="3" fill="rgba(125,186,90,0.35)"/>
              <line x1="128" y1="92" x2="222" y2="130" stroke="rgba(125,186,90,0.1)" strokeWidth="0.5" strokeDasharray="3 3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      {siteSettings && (
        <section id="contact" className="py-24 px-6 bg-white border-t border-[#f0f0f0]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Contact</p>
            <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-14">Get in touch</h2>
            {siteSettings?.googleMapsEmbedUrl && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-[#e8e8e8]">
                <iframe src={siteSettings.googleMapsEmbedUrl} width="100%" height="400" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0"/>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-3">Email</h4>
                <Link href={`mailto:${siteSettings?.contactEmail}`} className="text-[14px] text-[#2d6a27] hover:underline">
                  {siteSettings?.contactEmail}
                </Link>
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-3">Address</h4>
                {siteSettings?.mailingAddress && (
                  <div className="text-[14px] text-[#6e6e73]">
                    <PortableTextRenderer content={siteSettings.mailingAddress} />
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-3">Social media</h4>
                <SocialLinks
                  twitter={siteSettings?.socialLinks?.twitter}
                  facebook={siteSettings?.socialLinks?.facebook}
                  instagram={siteSettings?.socialLinks?.instagram}
                  linkedin={siteSettings?.socialLinks?.linkedin}
                  github={siteSettings?.socialLinks?.github}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PAST CONFERENCES ── */}
      <section className="py-24 px-6 bg-[#f5f9f4] border-t border-[#f0f0f0]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[12px] font-medium text-[#3a7a30] uppercase tracking-widest mb-4">Archive</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-5">Past conferences</h2>
          <p className="text-[16px] text-[#6e6e73] mb-10 leading-relaxed">
            GeoMundus has a rich history of bringing together students, researchers, and professionals since 2009.
          </p>
          <Link href="/archive" className="inline-block bg-[#2d6a27] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#245520] transition-colors">
            Explore past editions
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#f5f5f7] border-t border-[#e8e8e8] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#aeaeb2]">© GeoMundus {currentYear?.year} · Designed by the Web Team</p>
          <div className="flex gap-5">
            {["Instagram", "LinkedIn", "Twitter", "GitHub"].map((s) => (
              <span key={s} className="text-[12px] text-[#aeaeb2] cursor-pointer hover:text-[#6e6e73] transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
