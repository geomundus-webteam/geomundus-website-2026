"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface Sponsor {
  _id: string
  name: string
  logoUrl?: string
  websiteUrl?: string
}

export default function SponsorsMarquee({ sponsors }: { sponsors: Sponsor[] }) {
  const [paused, setPaused] = useState(false)

  if (!sponsors || sponsors.length === 0) return null

  const items = [...sponsors, ...sponsors]
  const isScrolling = sponsors.length > 6

  return (
    <section className="py-10 bg-[#ffffff] border-t border-[#07686f] overflow-hidden">
      <div className="flex items-center justify-center gap-4 mb-6">
        <p className="text-[11px] font-medium text-[#aeaeb2] uppercase tracking-widest">
          Supported by
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
      <div className="relative">
        <div
          className={`flex gap-20 items-center ${isScrolling ? "whitespace-nowrap" : "justify-center flex-wrap"}`}
          style={{
            animation: isScrolling ? "marquee 30s linear infinite" : "none",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {(isScrolling ? items : sponsors).map((sponsor, i) => (
            <Link
              key={`${sponsor._id}-${i}`}
              href={sponsor.websiteUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-all duration-300"
            >
              {sponsor.logoUrl ? (
                <Image
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  width={250}
                  height={150}
                  className="max-h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-[15px] font-semibold text-[#6e6e73] px-4">
                  {sponsor.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}