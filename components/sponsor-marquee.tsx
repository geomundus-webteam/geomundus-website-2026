"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Entity {
  _id: string
  name: string
  logoUrl?: string
  websiteUrl?: string
}

interface SponsorsMarqueeProps {
  sponsors?: Entity[]
  partners?: Entity[]
}

export default function SponsorsMarquee({ sponsors = [], partners = [] }: SponsorsMarqueeProps) {
  const [sponsorsPaused, setSponsorsPaused] = useState(false)
  const [partnersPaused, setPartnersPaused] = useState(false)

  if (sponsors.length === 0 && partners.length === 0) return null

  const renderRow = (
    items: Entity[],
    label: string,
    paused: boolean,
    setPaused: (v: boolean) => void
  ) => {
    if (items.length === 0) return null
    const isScrolling = items.length > 6
    const displayed = isScrolling ? [...items, ...items] : items

    return (
      <div className="mb-10 overflow-hidden">
        <div className="flex items-center justify-center gap-4 mb-6">
          <p className="text-[11px] font-medium text-[#aeaeb2] uppercase tracking-widest">
            {label}
          </p>
          {isScrolling && (
            <button
              onClick={() => setPaused(!paused)}
              className="text-[11px] text-[#aeaeb2] hover:text-[#058a78] transition-colors border border-[#e0eada] rounded-full px-3 py-1"
            >
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
          )}
        </div>
        <div
          className={`flex gap-20 items-center ${isScrolling ? "whitespace-nowrap" : "justify-center flex-wrap"}`}
          style={{
            animation: isScrolling ? "marquee 30s linear infinite" : "none",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {displayed.map((item, i) => (
            <Link
              key={`${item._id}-${i}`}
              href={item.websiteUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              {item.logoUrl ? (
                <Image
                  src={item.logoUrl}
                  alt={item.name}
                  width={180}
                  height={72}
                  className="max-h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-[15px] font-semibold text-[#6e6e73] px-4">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-10 bg-[#ffffff] border-t border-[#07686f]">
      {renderRow(sponsors, "Supported by", sponsorsPaused, setSponsorsPaused)}
      {partners.length > 0 && sponsors.length > 0 && (
        <hr className="border-[#e0eada] max-w-4xl mx-auto mb-10" />
      )}
      {renderRow(partners, "Partners", partnersPaused, setPartnersPaused)}
    </section>
  )
}