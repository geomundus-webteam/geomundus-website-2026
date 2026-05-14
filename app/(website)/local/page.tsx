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
      <section
        className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white"
        style={{ background: "linear-gradient(135deg, #036154, #058a78)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Venue & Local Info
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-85">
            Everything you need to know about getting to and around Castellón de la Plana.
          </p>
        </div>
      </section>

      {/* Welcome section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-4">The city</p>

          {/* Row 1: title + image */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <div>
              <h2 className="text-[36px] font-medium text-[#1d1d1f] tracking-tight mb-6">
                Welcome to Castellón de la Plana
              </h2>
              <p className="text-[15px] text-[#6e6e73] leading-[1.85] mb-5 text-justify">
                Castellón de la Plana is a mid-sized Mediterranean city on Spain's Costa del Azahar. Relaxed, sunny, and easy to enjoy. Founded in the 13th century by King James I, it has a compact historic centre built around the Plaza Mayor, where the baroque Town Hall faces the Concatedral de Santa María and the city's landmark bell tower, El Fadrí, rises freely beside it.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#e0eada] aspect-[4/3] bg-[#f5f9f4]">
              <img
                src="/travel/plaza-mayor-castellon.webp"
                alt="Plaza Mayor, Castellón"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Row 2: image + text */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div className="rounded-2xl overflow-hidden border border-[#e0eada] aspect-[4/3] bg-[#f5f9f4]">
              <img
                src="/travel/grao-port.jpg"
                alt="Grao port"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-[15px] text-[#6e6e73] leading-[1.85] mb-5 text-justify">
                A few kilometres down the avenue lies the Grao, the old port neighbourhood, with waterfront restaurants, a fish market, and boats heading out to the volcanic Columbretes Islands. The beaches are urban and walkable, the weather in autumn is still warm.
              </p>
              <p className="text-[15px] text-[#6e6e73] leading-[1.85] text-justify">
                It's not a city that tries too hard, and that's exactly what makes it a good place to spend a few days.
              </p>
            </div>
          </div>

          {/* Food & don't miss */}
          <div className="space-y-12">
            {/* Local food */}
            <div>
              <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-6">Local food</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    name: "Coca de tomate",
                    desc: "A flatbread topped with tomato, grab one from any local bakery.",
                    img: "/travel/coca-tomate.jpg",
                  },
                  {
                    name: "Fartón con horchata",
                    desc: "A soft elongated pastry dipped in cold tiger nut milk.",
                    img: "/travel/farton.jpg",
                  },
                  {
                    name: "Paella by the port",
                    desc: "Save room for a proper paella at one of the Grao restaurants.",
                    img: "/travel/paella.jpg",
                  },
                ].map((item) => (
                  <div key={item.name} className="rounded-2xl overflow-hidden border border-[#e0eada] bg-[#f5f9f4]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-[14px] font-medium text-[#1d1d1f] mb-1">{item.name}</p>
                      <p className="text-[13px] text-[#6e6e73] leading-[1.6]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Don't miss */}
            <div>
              <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-6">Don't miss</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Plaza Mayor & El Fadrí bell tower",
                  "Concatedral de Santa María",
                  "Grao port neighbourhood",
                  "Columbretes Islands boat trips",
                  "Urban beaches on the Costa del Azahar",
                ].map((item) => (
                  <div key={item} className="flex gap-3 items-center rounded-xl border border-[#e0eada] px-4 py-3 bg-[#f5f9f4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#058a78] shrink-0" />
                    <p className="text-[14px] text-[#6e6e73]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transport & accommodation */}
      <section className="py-16 px-6 bg-[#f5f9f4] border-t border-[#e0eada]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-4">Getting here</p>
          <h2 className="text-[28px] font-medium text-[#1d1d1f] tracking-tight mb-4">
            Transport & accommodation
          </h2>
          <p className="text-[15px] text-[#6e6e73] mb-6 text-justify">
            Detailed travel information including transport options, recommended accommodation, and arrival tips will be published here soon.
          </p>
          {siteSettings?.contactEmail && (
            <p className="text-[14px] text-[#6e6e73]">
              Have questions?{" "}
              <Link
                href={`mailto:${siteSettings.contactEmail}`}
                className="text-[#058a78] hover:underline font-medium"
              >
                Contact us
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}