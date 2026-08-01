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
import VenueSlideshow from "@/components/slideshow-images";
import Slideshow from "@/components/slideshow-images";
import SponsorsMarquee from "@/components/sponsor-marquee";
import { speakersQuery } from "@/lib/sanity.queries"

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
  const speakers = await cachedClient<any[]>(speakersQuery.query)
  const keynoteSpeakers = speakers?.filter(s => s.role === "keynote" && s.confirmed) ?? []
  const workshopLeaders = speakers?.filter(s => s.role === "workshop" && s.confirmed) ?? []
  const panelSpeakers = speakers?.filter(s => s.role === "panel" && s.confirmed) ?? []

  const AboutSlideshowImages = currentConference?.gallery && currentConference.gallery.length > 0
    ? currentConference.gallery.map((img: any) => ({
        url: urlForImage(img)?.url() ?? "",
        caption: img.caption ?? "",
      })).filter((s: any) => s.url !== "")
    : [
        { url: "/about/about-2.jpg", caption: "" },
        { url: "/about/about-1.jpeg", caption: "" },
      ]

  const VenueSlideshowImages = currentConference?.gallery && currentConference.gallery.length > 0
    ? currentConference.gallery.map((img: any) => ({
        url: urlForImage(img)?.url() ?? "",
        caption: img.caption ?? "",
      })).filter((s: any) => s.url !== "")
    : [
        { url: "/venue/UJI_campus.jpg", caption: "Universitat Jaume I" },
        { url: "/venue/plaza-mayor-castellon.jpeg", caption: "Plaza Mayor, Castellón de la Plana" },
        { url: "/venue/castellon-2.jpg", caption: "Grao de Castellón" },
      ]
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
    
          <h1 className="text-[44px] md:text-[56px] font-medium text-[#1d1d1f] leading-[1.05] tracking-tight mb-5">
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
        {!siteSettings?.registrationOpen && (
          <div className="max-w-[560px] mx-auto mb-10 text-center">
            <p className="text-[18px] font-medium text-[#1d1d1f] mb-2">
              Registrations Opening Soon!
            </p>
            <p className="text-[15px] text-[#6e6e73] mb-3">
              Look at the theme and plan your submission.
            </p>
            <Link
              href="/#theme"
              className="text-[15px] text-[#058a78] font-medium hover:underline"
            >
              Explore the theme
            </Link>
          </div>
        )}

        {/* Meta pills */}
        <div className="inline-flex flex-col sm:flex-row border border-[#b2d8d4] rounded-2xl overflow-hidden bg-white w-full max-w-[900px] cursor-pointer hover:border-[#058a78] transition-colors">
          <Link href="/#schedule" className="flex-1">
            <div className="py-4 px-5 text-center sm:border-r sm:border-b-0 border-b border-[#d0ecea]">
              <p className="text-[14px] font-bold text-[#058a78] uppercase tracking-wider mb-1">Date</p>
              <p className="text-[16px] font-bold text-[#1d1d1f]">
                {startDay && endDay && month ? `${month} ${startDay} - ${endDay}, ${year}` : "TBD · 2026"}
              </p>
            </div>
          </Link>

          <Link href="/#contact" className="flex-1">
            <div className="py-4 px-5 text-center sm:border-r sm:border-b-0 border-b border-[#d0ecea]">
              <p className="text-[14px] font-bold text-[#058a78] uppercase tracking-wider mb-1">Location</p>
              <p className="text-[16px] font-bold text-[#1d1d1f]">
                {siteSettings?.conferenceLocation ?? "Castellón, Spain"}
              </p>
            </div>
          </Link>

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
        <AnimateOnScroll staggerChildren className="grid grid-cols-2 md:grid-cols-3">
          {[
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
          <Slideshow slides={AboutSlideshowImages} />
        </AnimateOnScroll>
      </section>

      {/* ── THEME ── */}
      <section id="theme" className="py-24 px-6 bg-[#f2f7f7] border-t border-[#07686f]">
        <AnimateOnScroll staggerChildren className="max-w-4xl mx-auto text-center">
          <p className="text-[28px] font-bold text-[#058a78] tracking-widest mb-4">Theme</p>
          <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">
            <RevealText text="Geospatial Intelligence for Disaster Resilience" />
          </h2>
          <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-12 max-w-[580px] mx-auto">
            From prevention to reconstruction - geospatial tools at every stage of disaster management.
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
                "Natural Hazards - caused by natural processes",
                "Anthropogenic Hazards - caused by human activities",
                "Socionatural Hazards - caused by the combination of natural and anthropogenic factors",
                "Geological - earthquakes, volcanic activity, landslides, rockslides, surface collapses, debris or mud flows",
                "Hydrometeorological - floods, droughts, heatwaves, hurricanes/typhoons/cyclones",
                "Biological - pandemics, epidemics",
                "Technological - industrial pollution, nuclear radiation, toxic wastes, dam failures, transport accidents, factory explosions, fires and chemical spills",
                "Environmental - soil degradation, deforestation, loss of biodiversity, sea-level rise, air/water/soil pollution",
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
              GeoMundus 2026
            </h3>
            <ol className="space-y-4">
              {[
                { n: "01", t: "Hazard Intelligence & Risk Modeling", d: "SAR satellites, AI/ML hazard prediction, LiDAR for terrain analysis, Data fusion" },
                { n: "02", t: "Early Warning & Preparedness Systems", d: "IoT sensor networks, Mobile GIS apps, Multi-hazard alert platforms, AI hazard forecasting" },
                { n: "03", t: "Emergency Response & Humanitarian Logistics", d: "High-resolution satellite imagery for situational awareness, UAVs for rapid damage assessment, GIS for resources allocation, Crowdsourced VGI, Accessibility analysis" },
                { n: "04", t: "Recovery & Resilient Reconstruction", d: "Change detection AI for damage assessment, Digital Twins simulation, Participatory GIS for community engagement, Spatial planning tools" },
              ].map(({ n, t, d }) => (
                <li key={n} className="flex gap-4">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#058a78] shrink-0" aria-hidden="true" />
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
      <section id="speakers" className="py-24 px-6 bg-[#ffffff] border-t border-[#07686f]">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll staggerChildren className="text-center mb-14">
            <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Speakers</p>
            <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight mb-4">
              <RevealText text={speakers && speakers.length > 0 ? "Meet our speakers" : "Speakers Coming Soon"} />
            </h2>
            {(!speakers || speakers.length === 0) && (
              <>
                <p className="text-[14px] text-[#6e6e73] leading-[1.8] mb-4">
                  We&apos;re currently finalizing our lineup. Check back soon for updates.
                </p>
                <p className="text-[13px] text-[#6e6e73]">
                  Interested in speaking?{" "}
                  <Link href="/#contact" className="text-[#058a78] font-medium hover:underline">Contact us</Link>
                </p>
              </>
            )}
          </AnimateOnScroll>

          {[
            { label: "Keynote Speakers", list: keynoteSpeakers },
            { label: "Workshop Leaders", list: workshopLeaders },
            { label: "Panel Speakers", list: panelSpeakers },
          ].map(({ label, list }) => list.length > 0 && (
            <div key={label} className="mb-16">
              <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-6">{label}</p>
              <AnimateOnScroll staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {list.map((speaker, i) => (
                  <GlowCard key={speaker._id ?? i} className="bg-[#f5f9f4] rounded-2xl border border-[#e0eada] p-6 text-center overflow-hidden">
                    <div className="w-20 h-20 rounded-full bg-[#e8f4e4] border border-[#c8ddb8] mx-auto mb-4 overflow-hidden flex items-center justify-center">
                      {speaker.imageUrl ? (
                        <img src={speaker.imageUrl} alt={speaker.name ?? ""} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[#058a78] font-medium text-2xl">{speaker.name?.[0] ?? "?"}</span>
                      )}
                    </div>
                    <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">{speaker.name}</p>
                    {speaker.title && <p className="text-[12px] text-[#6e6e73] mb-1">{speaker.title}</p>}
                    {speaker.organization && <p className="text-[13px] text-[#058a78] mb-2">{speaker.organization}</p>}
                    {speaker.bio && <p className="text-[12px] text-[#6e6e73] mb-2 line-clamp-2">{speaker.bio}</p>}
                    <div className="flex justify-center gap-3 mt-2">
                      {speaker.websiteUrl && (
                        <Link href={speaker.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#6e6e73] hover:text-[#058a78]">Website</Link>
                      )}
                      {speaker.linkedin && (
                        <Link href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#6e6e73] hover:text-[#058a78]">LinkedIn</Link>
                      )}
                    </div>
                  </GlowCard>
                ))}
              </AnimateOnScroll>
            </div>
          ))}

          {speakers && speakers.length > 0 && (
            <div className="text-center mt-4">
              <Link
                href="/speakers"
                className="inline-block border border-[#058a78] text-[#058a78] text-[15px] px-8 py-3.5 rounded-full hover:bg-[#058a78] hover:text-white transition-colors"
              >
                View speaker details
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── SCHEDULE ── */}
      {schedule && schedule.days && schedule.days.length > 0 && (
        <section id="schedule" className="py-24 px-6 bg-[#f2f7f7] border-t border-[#07686f]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">Programme</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight">Conference Schedule (Tentative)</h2>
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
                // href={siteSettings.sponsorshipBrochureUrl? siteSettings.sponsorshipBrochureUrl : "https://drive.google.com/file/d/1i05nET_qYiL4EdPsH7nmhhhPa4o-W0Ue/view?usp=drive_link"}
                href="/sponsors" 
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

      {/* ── SPONSORS BANNER ── */}
      {currentConference?.sponsors && currentConference.sponsors.length > 0 && (
        <SponsorsMarquee 
          sponsors={currentConference.sponsors}
          partners={currentConference.partners} />
      )}

      {/* ── FAQ ── */}
      {/* {faqs && faqs.length > 0 && (
        <section id="faq" className="py-24 px-6 bg-[#ffffff] border-t border-[#07686f]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-[28px] font-bold text-[#058a78] uppercase tracking-widest mb-4">FAQ</p>
              <h2 className="text-[40px] font-medium text-[#1d1d1f] tracking-tight">Frequently asked questions</h2>
            </div>
            <FaqSection faqs={faqs} />
          </div>
        </section>
      )} */}

      {/* ── VENUE ── */}
      <AnimateOnScroll>
      <section className="py-24 px-6 bg-[#2a4c50]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[28px] font-medium text-[#ea8a29] uppercase tracking-widest mb-5">Venue</p>
            <h2 className="text-[36px] font-medium text-[#f2f9f0] tracking-tight mb-3">Universitat Jaume I</h2>
            <p className="text-[14px] text-[#ffffffc9] mb-5">Castellón de la Plana, Spain</p>
            <p className="text-[15px] text-[#ffffffc9] leading-[1.8] mb-5">
              One of three host universities of the Erasmus Mundus Master in Geospatial Technologies, alongside NOVA IMS in Lisbon and WWU Münster in Germany.
            </p>
            <Link
              href="https://gis.uji.es/ujiapps/bessodigital/localitzacioespais/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#f2f9f0] border border-[#ffffff40] rounded-full px-5 py-2.5 hover:bg-[#ffffff14] transition-colors"
            >
              Explore the campus digital twin
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          
          <Slideshow slides={VenueSlideshowImages} />
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
          {/* <div className="flex gap-5">
            {["Instagram", "LinkedIn", "Twitter", "GitHub"].map((s) => (
              <span key={s} className="text-[12px] text-[#868688] cursor-pointer hover:text-[#29292a] transition-colors">{s}</span>
            ))}
          </div> */}
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
