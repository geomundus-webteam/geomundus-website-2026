import Link from "next/link";
import Image from "next/image";
import { AnimateOnScroll, RevealText, GlowCard } from "@/components/animate-on-scroll";
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
import SpeakersGrid from "@/components/speakers-grid";
import CountdownTimer from "@/components/countdown-timer"
import TimelineCards from "@/components/timeline-cards";
import sitesettings from "@/sanity/schemas/siteSettings";
import { urlFor } from "@/lib/sanity.client";
import { urlForImage } from "@/sanity/lib/image";
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
  conferenceDate: "2026-10-16",
  conferenceEndDate: "2026-10-17",
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

  const sanityLogoUrl = siteSettings?.logo ? urlForImage(siteSettings.logo)?.url() : null;

  const logoUrl = typeof sanityLogoUrl === "string" && sanityLogoUrl.trim() !== "" ? sanityLogoUrl: "/coloured_light_text.svg";

  return (
    <main className="flex min-h-screen flex-col bg-white" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative bg-[#f2f7f7] pt-24 pb-20 text-center px-6 overflow-hidden">
        {/* Soft radial glow behind the logo */}
        {/* <div className="absolute inset-x-0 top-0 h-[480px] pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 70% at 50% 35%, rgba(125, 186, 90, 0.18) 0%, rgba(125, 186, 90, 0.06) 40%, transparent 75%)" }} /> */}

        <div className="relative z-10">
          {/* <p className="text-[16px] font-medium text-[#058a78] tracking-wide mb-8">
            18th Edition · GeoMundus Conference 2026
          </p> */}
          {/* Big centered logo */}
          {/* {(() => { console.log("logo url:", siteSettings?.logo ? urlForImage(siteSettings.logo)?.url() : "no logo"); return null; })()} */}
          <div className="flex justify-center mb-10">
            <Image src={logoUrl} alt="GeoMundus 2026" width={280} height={335} priority className="drop-shadow-[0_10px_40px_rgba(45,106,39,0.15)]"/>
            {/* <Image src={siteSettings?.logo ? urlForImage(siteSettings.logo)?.url() : "/enhanced logo.png"} alt="GeoMundus 2026" width={280} height={335} priority className="drop-shadow-[0_10px_40px_rgba(45,106,39,0.15)]" /> */}
          </div>
    
          <h1 className="text-[44px] md:text-[56px] font-medium text-[#1d1d1f] leading-[1.05] tracking-tight mb-5 uppercase">
            Geospatial Intelligence<br />for <em className="not-italic text-[#058a78]">Disaster Resilience.</em>
          </h1>
          <p className="text-[18px] text-[#434346] leading-relaxed max-w-[520px] mx-auto mb-10">
            From Data to Action: Mapping Risk, Strengthening Response, and Building Safer Communities
          </p>

        <div className="flex justify-center gap-3 mb-12">
          <RegisterButton registrationOpen={siteSettings?.registrationOpen} />
          <Link
            href="/#info"
            className="text-[15px] text-[#058a78] border border-[#058a78] px-7 py-3 rounded-full hover:bg-[#036154] hover:text-white transition-all duration-200"
          >
            Learn more
          </Link>
        </div>

        {/* Meta pills */}
        <div className="inline-flex flex-col sm:flex-row border border-[#b2d8d4] rounded-2xl overflow-hidden bg-white w-full max-w-[900px]">
          <div className="flex-1 py-4 px-5 text-center sm:border-r sm:border-b-0 border-b border-[#d0ecea]">
            <p className="text-[14px] font-bold text-[#058a78] uppercase tracking-wider mb-1">Date</p>
            <p className="text-[16px] font-bold text-[#1d1d1f]">
              {startDay && endDay && month ? `${month} ${startDay}–${endDay}, ${year}` : "TBD · 2026"}
            </p>
          </div>
          <div className="flex-1 py-4 px-5 text-center sm:border-r sm:border-b-0 border-b border-[#d0ecea]">
            <p className="text-[14px] font-bold text-[#058a78] uppercase tracking-wider mb-1">Location</p>
            <p className="text-[16px] font-bold text-[#1d1d1f]">
              {siteSettings?.conferenceLocation ?? "Castellón, Spain"}
            </p>
          </div>
          <div className="flex-1 py-4 px-5 text-center">
            <p className="text-[14px] font-bold text-[#058a78] uppercase tracking-wider mb-1">Edition</p>
            <p className="text-[16px] font-bold text-[#1d1d1f]">18th</p>
          </div>
        </div>

        {/* Countdown */}
        {startDate && (
          <div className="mt-8">
            <CountdownTimer targetDate={siteSettings.conferenceDate} />
          </div>
        )}
        {/* Topographic ring illustration [to be replaced] */}
        {/* <div className="mt-16 flex justify-center">
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
        </div> */}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#000000] border-t border-[#ffffff10]">
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <p className="text-[14px] md:text-[16px] text-white/80 uppercase tracking-[0.2em] text-center">
            Previous edition highlights
          </p>
        </div>
        <AnimateOnScroll staggerChildren className="grid grid-cols-2 md:grid-cols-4">
          {[
            { num: "18th", label: "Edition" },
            { num: "100+", label: "Participants" },
            { num: "4", label: "Keynote speakers" },
            { num: "3", label: "Workshops" },
          ].map(({ num, label }) => (
            <div key={label} className="py-6 px-6 text-center border-r border-[#ffffff08] last:border-r-0">
              <p className="text-[28px] font-medium text-white">{num}</p>
              <p className="text-[14px] text-[#fffffffd] uppercase tracking-wider mt-1">{label}</p>
            </div>
          ))}
        </AnimateOnScroll>
      </section>

      {/* ── ABOUT ── */}
      <section id="info" className="py-24 px-6 bg-[#ffffff] border-[#07686f]">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest inline-block">About</p>
        </div>
        <AnimateOnScroll staggerChildren className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[36px] font-medium text-[#1d1d1f] leading-tight tracking-tight mb-5">
              <RevealText text="Geospatial science, shaped by students" />
            </h2>
            <p className="text-[15px] text-[#6e6e73] leading-[1.85] mb-4">
              GeoMundus is a free international conference organized by students of the Erasmus Mundus Master in Geospatial Technologies. Since 2009, it has united researchers, practitioners, and students from across the globe.
            </p>
            <p className="text-[15px] text-[#6e6e73] leading-[1.85]">
              The 18th edition comes to Castellón de la Plana, hosted by Universitat Jaume I.
            </p>
          </div>
          {/* to be replaced */}
          {/* <div className="rounded-2xl overflow-hidden border border-[#e0eada] bg-[#f5f9f4]"> */}
            {/* <svg width="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </svg> */}
          {/* </div> */}
        </AnimateOnScroll>
      </section>

      {/* ── THEME ── */}
      <section className="py-24 px-6 bg-[#f2f7f7] border-t border-[#07686f]">
        <AnimateOnScroll staggerChildren className="max-w-4xl mx-auto text-center">
          <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Theme</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">
            <RevealText text="Geospatial Intelligence for Disaster Resilience" />
          </h2>
          <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-12 max-w-[580px] mx-auto">
            From early warning to recovery - geospatial tools at every stage of disaster.
          </p>

          <GlowCard className="bg-white rounded-2xl border border-[#deeada] p-10 text-left overflow-hidden mb-6">
            <span className="inline-block text-[11px] font-medium tracking-widest uppercase bg-[#e0f0dc] text-[#058a78] px-4 py-1.5 rounded-full mb-5">
              Disaster Management
            </span>
            <h3 className="text-[18px] font-medium text-[#1d1d1f] tracking-tight mb-4">
              Disaster Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Natural Disasters - earthquakes, floods, cyclones, droughts, landslides, avalanches, heatwaves, volcanic eruptions",
                "Man-Made Disasters - industrial accidents, chemical spills, nuclear incidents, terrorist attacks, structural failures",
                "Complex / Hybrid Disasters - epidemics, armed conflicts, or combination of natural and human-induced factors",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[14px] text-[#6e6e73] leading-[1.7]">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#058a78] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </GlowCard>

          <GlowCard className="bg-white rounded-2xl border border-[#deeada] p-10 text-left overflow-hidden">
            <span className="inline-block text-[11px] font-medium tracking-widest uppercase bg-[#e0f0dc] text-[#058a78] px-4 py-1.5 rounded-full mb-5">
              Focus Areas
            </span>
            <h3 className="text-[18px] font-medium text-[#1d1d1f] tracking-tight mb-4">
              GeoMundus 2026 - research tracks
            </h3>
            <ol className="space-y-4">
              {[
                { n: "01", t: "Hazard Modelling & Risk Assessment", d: "GIS mapping, Remote Sensing, AI & ML for predictive analytics, urban risk intelligence" },
                { n: "02", t: "Early Warning & Monitoring Systems", d: "Multi-hazard alert systems, IoT Sensors" },
                { n: "03", t: "Geospatial Decision Support Systems", d: "Spatial Data Infrastructure (SDI), DSS for crisis management, MCDA in disaster planning, Data Fusion (IoT + Remote Sensing + GIS)" },
                { n: "04", t: "Emergency Response & Logistics", d: "Routing optimization, resource allocation, UAVs/drones for rapid situational awareness, mobile GIS, accessibility analysis" },
                { n: "05", t: "Rapid Damage Assessment & Recovery", d: "Damage mapping, change detection, AI automated damage classification, infrastructure assessment, recovery planning, VGI" },
              ].map(({ n, t, d }) => (
                <li key={n} className="flex gap-4">
                  <span className="text-[11px] font-medium text-[#058a78] tracking-widest mt-1 shrink-0">{n}</span>
                  <div>
                    <p className="text-[14px] font-medium text-[#1d1d1f] mb-1">{t}</p>
                    <p className="text-[13px] text-[#6e6e73] leading-[1.7]">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </GlowCard>
        </AnimateOnScroll>
      </section>

      {/* ── SPEAKERS ── */}
      {currentConference?.keynoteSpeakers && currentConference.keynoteSpeakers.length > 0 ? (
        <section id="speakers" className="py-24 px-6 bg-white border-t border-[#07686f]">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll staggerChildren className="text-center mb-14">
              <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Speakers</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">
                <RevealText text="Keynote speakers" />
              </h2>
              <p className="text-[17px] text-[#6e6e73] max-w-[440px] mx-auto">World-class voices from academia, research, and industry.</p>
            </AnimateOnScroll>
            <AnimateOnScroll staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {currentConference.keynoteSpeakers.map((speaker, i) => (
                <GlowCard key={i} className="bg-[#f5f9f4] rounded-2xl border border-[#e0eada] p-6 text-center overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-[#e8f4e4] border border-[#c8ddb8] mx-auto mb-4 flex items-center justify-center">
                    <span className="text-[#058a78] font-medium text-lg">{speaker.name?.[0] ?? "?"}</span>
                  </div>
                  <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">{speaker.name}</p>
                  <p className="text-[13px] text-[#058a78]">{speaker.organization}</p>
                </GlowCard>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      ) : (
        <section id="speakers" className="py-24 px-6 bg-[#ffffff] border-t border-[#07686f]">
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll staggerChildren className="text-center mb-14">
              <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Speakers</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">
                <RevealText text="Keynote speakers" />
              </h2>
              <p className="text-[17px] text-[#6e6e73] max-w-[440px] mx-auto">World-class voices from academia, research, and industry. Full lineup coming soon.</p>
            </AnimateOnScroll>
            {/* <AnimateOnScroll staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[{ icon: "🌍", slot: "Keynote speaker #1" }, { icon: "🛰️", slot: "Keynote speaker #2" }, { icon: "🗺️", slot: "Keynote speaker #3" }].map(({ icon, slot }) => (
                <GlowCard key={slot} className="bg-white rounded-2xl border border-[#e8e8e8] p-8 text-center overflow-hidden">
                  <div className="w-14 h-14 rounded-full bg-[#e8f4e4] mx-auto mb-4 flex items-center justify-center text-2xl">{icon}</div>
                  <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">To be announced</p>
                  <p className="text-[13px] text-[#058a78]">{slot}</p>
                </GlowCard>
              ))}
            </AnimateOnScroll> */}
            {/* <SpeakersGrid /> */}
          </div>
        </section>
      )}

      {/* ── SCHEDULE ── */}
      {schedule && schedule.days && schedule.days.length > 0 && (
        <section id="schedule" className="py-24 px-6 bg-[#f2f7f7] border-t border-[#07686f]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Programme</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight">Conference Schedule</h2>
            </div>
            <ScheduleSection schedule={schedule} />
          </div>
        </section>
      )}

      {/* ── TIMELINE ── */}
      <AnimateOnScroll>
        
      <section className="py-24 px-6 bg-[#ffffff] border-t border-[#07686f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Timeline</p>
            <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">Key dates</h2>
            <p className="text-[16px] text-[#6e6e73]">All dates subject to confirmation.</p>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-4 border border-[#e8e8e8] rounded-2xl overflow-hidden bg-white">
            {[
              { n: "01", t: "Call for papers", d: "Submit your abstract for oral or poster presentation" },
              { n: "02", t: "Submission deadline", d: "Final day for papers and posters" },
              { n: "03", t: "Registration opens", d: "Secure your spot at GeoMundus 2026" },
              { n: "04", t: "Conference days", d: "Talks, workshops, and networking" },
            ].map(({ n, t, d }, i) => (
              <div key={n} className={`p-7 ${i < 3 ? "border-b md:border-b-0 md:border-r" : ""} border-[#e8e8e8]`}>
                <p className="text-[11px] font-medium text-[#c4c4c8] tracking-widest mb-3">{n}</p>
                <p className="text-[15px] font-medium text-[#1d1d1f] mb-2">{t}</p>
                <p className="text-[13px] text-[#6e6e73] leading-snug mb-3">{d}</p>
                <p className="text-[13px] font-medium text-[#058a78]">TBD 2026</p>
              </div>
            ))}
          </div> */}
          <TimelineCards />
        </div>
      </section>
      </AnimateOnScroll>

      {/* ── SPONSORS ── */}
      <AnimateOnScroll>
      <section id="sponsors" className="py-24 px-6 bg-[#f2f7f7] border-t border-[#07686f]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Sponsors</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-5">Sponsors & partners</h2>
          <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-3 max-w-xl mx-auto">
            GeoMundus is seeking partners from public and private entities including spatial, technological, scientific, and academic fields.
          </p>
          <p className="text-[15px] text-[#6e6e73] mb-10">
            Interested in sponsoring?{" "}
            <Link href="mailto:budget@geomundus.org" className="text-[#058a78] hover:underline">
              budget@geomundus.org
            </Link>
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
                href={siteSettings.sponsorshipBrochureUrl? siteSettings.sponsorshipBrochureUrl : "https://drive.google.com/file/d/1Jp2ZNXecmsvW5nw_A0fSCBpyp8KlFTc0/view?usp=sharing"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#058a78] border border-[#058a78] text-[15px] px-8 py-3.5 rounded-full hover:bg-[#f0faf8] transition-colors"
              >
                More info
              </Link>
          
            <Link
              href="mailto:budget@geomundus.org?subject=Sponsorship%20Inquiry%20—%20GeoMundus%202026&body=Hello%20GeoMundus%20Team%2C%0A%0AI%20am%20interested%20in%20sponsoring%20GeoMundus%202026.%20Please%20send%20me%20more%20information%20about%20the%20sponsorship%20packages.%0A%0AOrganization%3A%0AContact%20person%3A%0A%0AThank%20you."
              className="inline-block bg-[#058a78] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#036154] transition-colors"
            >
              Become a sponsor
            </Link>
          </div>
        </div>
      </section>
      </AnimateOnScroll>

      {/* ── FAQ ── */}
      {faqs && faqs.length > 0 && (
        <section id="faq" className="py-24 px-6 bg-[#ffffff] border-t border-[#07686f]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">FAQ</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight">Frequently asked questions</h2>
            </div>
            <FaqSection faqs={faqs} />
          </div>
        </section>
      )}

      {/* ── VENUE ── */}
      <AnimateOnScroll>
      <section className="py-24 px-6 bg-[#2a4c50]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[28px] font-medium text-[#ea8a29] uppercase tracking-widest mb-5">Venue</p>
            <h2 className="text-[36px] font-medium text-[#f2f9f0] tracking-tight mb-3">Universitat Jaume I</h2>
            <p className="text-[14px] text-[#ffffffc9] mb-5">Castellón de la Plana, Spain</p>
            <p className="text-[15px] text-[#ffffffc9] leading-[1.8]">
              One of three host universities of the Erasmus Mundus Master in Geospatial Technologies, alongside NOVA IMS in Lisbon and WWU Münster in Germany.
            </p>
          </div>
          
          {/* to be replaced */}
          {/* <div className="flex justify-center mb-10">
            <Image src={sitesettings.venueImage} alt="GeoMundus 2026" width={280} height={335} priority className="drop-shadow-[0_10px_40px_rgba(45,106,39,0.15)]" />
          </div> */}
          {/* <div className="rounded-2xl overflow-hidden border border-[#ffffff10]">
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
            </svg>*/}
          {/* </div>  */}
        </div>
      </section>
      </AnimateOnScroll>

      {/* ── CONTACT ── */}
      {/* {(() => { console.log(siteSettings); return null; })()} */}
      {siteSettings && (
        <section id="contact" className="py-24 px-6 bg-[#ffffff] border-t border-[#07686f]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Contact</p>
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
              {(() => { console.log(siteSettings); return null; })()}

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
      <AnimateOnScroll>
      <section className="py-24 px-6 bg-[#f2f7f7] border-t border-[#07686f]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Archive</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-5">Past conferences</h2>
          <p className="text-[16px] text-[#6e6e73] mb-10 leading-relaxed">
            GeoMundus has a rich history of bringing together students, researchers, and professionals since 2009.
          </p>
          <Link href="/archive" className="inline-block bg-[#058a78] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#036154] transition-colors">
            Explore past editions
          </Link>
        </div>
      </section>
      </AnimateOnScroll>

      {/* ── FOOTER ── */}
      <footer className="bg-[#ffffff] border-t border-[#07686f] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[#3f3f40]">© GeoMundus {currentYear?.year} · Designed by the Web Team</p>
          <div className="flex gap-5">
            {["Instagram", "LinkedIn", "Twitter", "GitHub"].map((s) => (
              <span key={s} className="text-[12px] text-[#868688] cursor-pointer hover:text-[#29292a] transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
