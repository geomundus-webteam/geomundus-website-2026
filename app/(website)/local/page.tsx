import type { Metadata } from "next";
import { cachedClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Venue | GeoMundus Conference",
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
      <section className="py-16 px-6 bg-[#ffffff] border-t border-[#e0eada]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-4">Getting here</p>
          <h2 className="text-[28px] font-medium text-[#1d1d1f] tracking-tight mb-4">
            Transport to Castellón
          </h2>
          <p className="text-[15px] text-[#6e6e73] mb-10 text-justify">
            Castellón de la Plana is well connected to several major airports in the Valencia region. Below are the most convenient options for reaching the city.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
                          {
              airport: "Valencia Airport (VLC)",
              distance: "~75 km · Closest major international airport",
              options: [
                { mode: "Train", desc: "Take the metro from Valencia Airport to Valencia Joaquín Sorolla or Valencia Nord station, then board a direct Renfe train to Castelló de la Plana. Total journey time is approximately 1.5–2 hours." },
                { mode: "Bus", desc: "Direct bus services operate between Valencia Airport and Castelló de la Plana. Journey time is approximately 1.5 hours." },
                { mode: "Taxi / Rideshare", desc: "Taxis and rideshare services are available outside the airport terminal. Journey time is approximately 1 hour, depending on traffic." },
              ],
            },
            {
              airport: "Castellón–Costa Azahar Airport (CDT)",
              distance: "~35 km · Closest airport",
              options: [
                { mode: "Airport Shuttle Bus", desc: "Airport shuttle buses connect Castellón Airport with Castelló de la Plana. Journey time is approximately 40–50 minutes." },
                { mode: "Taxi", desc: "Taxis are available outside the terminal and provide a direct transfer to Castelló de la Plana. Journey time is approximately 30–40 minutes." },
              ],
            },
            {
              airport: "Reus Airport (REU)",
              distance: "~170 km · Convenient regional airport",
              options: [
                { mode: "Train", desc: "Take a bus or taxi to Reus or Tarragona railway station, then board a regional or long-distance train to Castelló de la Plana. Total journey time is approximately 2–2.5 hours." },
                { mode: "Car Rental", desc: "Car rental services are available at the airport. Driving via the AP-7 motorway to Castelló de la Plana takes approximately 1 hour 45 minutes." },
              ],
            },
            {
              airport: "Barcelona El Prat Airport (BCN)",
              distance: "~300 km · Direct high-speed train available",
              options: [
                { mode: "High-Speed Train", desc: "Travel to Barcelona Sants station and take a direct AVE, Euromed, or Intercity train to Castelló de la Plana. Journey time is approximately 2.5–3 hours." },
                { mode: "Regional Train", desc: "Regional train services also connect Barcelona and Castelló de la Plana via the Mediterranean corridor. Journey time is approximately 3.5–4 hours." },
              ],
            },
            {
              airport: "Madrid–Barajas Airport (MAD)",
              distance: "~420 km · Direct high-speed train available",
              options: [
                { mode: "High-Speed Train", desc: "Travel from the airport to Madrid Chamartín station and take a direct AVE or Avlo high-speed train to Castelló de la Plana. Journey time is approximately 2.5–3 hours." },
                { mode: "Flight + Train", desc: "Alternatively, fly from Madrid to Valencia (approximately 1 hour) and continue by train to Castelló de la Plana. This option is generally less convenient than the direct high-speed train." },
              ],
            },
            ].map((item) => (
              <div key={item.airport} className="rounded-2xl border border-[#e0eada] bg-white p-5">
                <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">{item.airport}</p>
                <p className="text-[12px] text-[#058a78] mb-4">{item.distance}</p>
                <ul className="space-y-3">
                  {item.options.map((opt) => (
                    <li key={opt.mode}>
                      <p className="text-[13px] font-medium text-[#1d1d1f] mb-0.5">{opt.mode}</p>
                      <p className="text-[13px] text-[#6e6e73] leading-[1.6] text-justify">{opt.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#e0eada] bg-[#f5f9f4] p-5">
            <p className="text-[13px] font-medium text-[#1d1d1f] mb-2">Getting around Castellón</p>
            <p className="text-[13px] text-[#6e6e73] leading-[1.6] text-justify">
              Castellón has a modern tram network (TRAM Metropolità de Castelló) connecting the city centre, the university, and the Grao port area. Single tickets cost approximately €1.2. The conference venue at Universitat Jaume I is accessible from most hotels listed below within 15–20 minutes by bus/tram. Check out Bicicas as a bike-renting option.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#f5f9f4] border-t border-[#e0eada]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[12px] font-medium text-[#058a78] uppercase tracking-widest mb-4">Accommodation</p>
          <h2 className="text-[28px] font-medium text-[#1d1d1f] tracking-tight mb-4">
            Where to stay
          </h2>
          <p className="text-[15px] text-[#6e6e73] mb-10 text-justify">
            Participants can find a wide range of accommodation options in Castellón, from budget-friendly hotels to higher-end establishments. Most hotels are located within a short distance of Universitat Jaume I and are easily accessible by public transport.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              name: "Euro Hotel",
              distance: "1.8 km from UJI",
              price: "From €64.50/night (€71.25 with breakfast)",
              desc: "Comfortable accommodation at competitive rates, conveniently situated near the train station.",
              web: "https://www.eurohotelcastello.com",
              email: "reservas@eurohotelcastello.com",
            },
            {
              name: "Luz Castellón",
              distance: "1.9 km from UJI",
              price: "From €68/night (€95 with breakfast)",
              desc: "A modern four-star hotel with spacious rooms and excellent transport connections.",
              web: "https://www.hotelluz.com/en",
              email: "reservas@hotelluz.com",
            },
            {
              name: "Hotel Rostits",
              distance: "1 km from UJI",
              price: "From €46/night",
              desc: "One of the closest options to the university. Contact the hotel directly for breakfast information.",
              web: "https://hotelrostits.com",
              email: "reservas@hotelrostits.com",
            },
            {
              name: "Hotel DL Urban",
              distance: "2 km from UJI",
              price: "From €46/night",
              desc: "Prices are primarily advertised through third-party booking platforms. Contact the hotel directly for current rates.",
              web: "https://hoteldlurban.com",
              email: null,
            },
            {
              name: "Dona Lola",
              distance: "2.3 km from UJI",
              price: "From €55/night (€62 with breakfast)",
              desc: "Affordable accommodation. Contact the hotel directly as online booking may occasionally show limited availability.",
              web: "https://dona-lola.costaazaharhoteles.com/en/",
              email: "reserva@hoteldonalola.com",
            },
            {
              name: "Hotel Jaime I",
              distance: "2.4 km from UJI",
              price: "From €62/night (€73 with breakfast)",
              desc: "A popular choice among visitors offering a good balance between comfort, location, and value.",
              web: "https://www.hoteljaimei.com/en",
              email: "info@hoteljaimei.com",
            },
            {
              name: "Hotel Castellón Center — Meliá",
              distance: "2.3 km from UJI",
              price: "From €70/night (€82 with breakfast)",
              desc: "Centrally located with modern facilities and easy access to the city centre.",
              web: "https://www.melia.com/es/hoteles/espana/castellon",
              email: "hotel.castellon.center@melia.com",
            },
            {
              name: "Intelier Rosa",
              distance: "2.9 km from UJI",
              price: "From €63/night (€76 with breakfast)",
              desc: "Combines a central location with comfortable accommodation.",
              web: "https://www.intelier.com/hotel-intelier-rosa-castellon/",
              email: null,
            },
            {
              name: "B&B Hotel Castellón",
              distance: "3.1 km from UJI",
              price: "From €52/night (€61 with breakfast)",
              desc: "Some of the most economical rates among the listed options.",
              web: "https://www.hotel-bb.com/es/hotel/castellon",
              email: "hotel.castellon@hotelbb.com",
            },
            {
              name: "NH Castellón Mindoro",
              distance: "3.3 km from UJI",
              price: "From €72/night (€86 with breakfast)",
              desc: "Located in the city centre, well-suited for participants seeking a higher level of comfort and services.",
              web: "https://www.nh-hotels.com/en/hotel/nh-castellon-mindoro",
              email: "nhmindoro@nh-hotels.com",
            },
            {
              name: "Hotel Silken Turcosa",
              distance: "7.4 km from UJI · Near port",
              price: "From €71/night (€93 with breakfast)",
              desc: "Convenient access to public transport and pleasant seaside surroundings near the port area.",
              web: "https://www.hoteles-silken.com/es/hotel-castellon-turcosa/",
              email: null,
            },
            {
              name: "Hotel Herreros",
              distance: "7.1 km from UJI · Port area",
              price: "From €48/night",
              desc: "A budget-friendly option in the port district.",
              web: "http://www.hotelherreros.com/",
              email: "info@hotelherreros.com",
            },
            {
              name: "Hotel DL Port",
              distance: "7.6 km from UJI · Near port",
              price: "From €84/night",
              desc: "A comfortable option for participants who prefer accommodation near the coast.",
              web: "https://hotelportcastellon.com/",
              email: "reservas@hoteldlport.com",
            },
            {
              name: "RH Silene Hotel & Spa",
              distance: "8.4 km from UJI · Coastal",
              price: "From €90/night (breakfast included)",
              desc: "Located near the coast. Note that the hotel is farther from the tram network and may require additional travel time.",
              web: "https://www.hotelrhsilene.com/",
              email: "silene@hotelesrh.com",
            },
          ].map((hotel) => (
            <div key={hotel.name} className="rounded-2xl border border-[#e0eada] bg-white p-5">
              <p className="text-[15px] font-medium text-[#1d1d1f] mb-1">{hotel.name}</p>
              <p className="text-[12px] text-[#058a78] mb-2">{hotel.distance}</p>
              <p className="text-[13px] text-[#6e6e73] mb-2 text-justify leading-[1.6]">{hotel.desc}</p>
              <p className="text-[13px] font-medium text-[#1d1d1f] mb-3">{hotel.price}</p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href={hotel.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#058a78] hover:underline"
                >
                  Website →
                </Link>
                {hotel.email && (
                  <Link
                    href={`mailto:${hotel.email}`}
                    className="text-[12px] text-[#6e6e73] hover:underline"
                  >
                    {hotel.email}
                  </Link>
                )}
              </div>
            </div>
          ))}
          </div>

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
