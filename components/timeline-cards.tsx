"use client"
import ScrollRevealGrid from "@/components/scroll-grid"

const items = [
  { n: "01", t: "Call for papers", d: "Submit your abstract for oral or poster presentation" },
  { n: "02", t: "Submission deadline", d: "Final day for papers and posters" },
  { n: "03", t: "Registration opens", d: "Secure your spot at GeoMundus 2026" },
  { n: "04", t: "Conference days", d: "Talks, workshops, and networking" },
]

export default function TimelineCards() {
  return (
    <ScrollRevealGrid
      items={items}
      getKey={(item) => item.n}
      gridClassName="grid grid-cols-1 md:grid-cols-4 border border-[#e8e8e8] rounded-2xl overflow-hidden bg-white"
      containerHeight="200vh"
      stagger={0.2}
      slideDistance={40}
      renderItem={(item, i) => (
        <div className={`p-7 ${i < 3 ? "border-b md:border-b-0 md:border-r" : ""} border-[#e8e8e8]`}>
          <p className="text-[14px] font-medium text-[#757578] tracking-widest mb-3">{item.n}</p>
          <p className="text-[18px] font-medium text-[#1d1d1f] mb-2">{item.t}</p>
          <p className="text-[14px] text-[#6e6e73] leading-snug mb-3">{item.d}</p>
          <p className="text-[14px] font-medium text-[#058a78]">TBD 2026</p>
        </div>
      )}
    />
  )
}