"use client"
import { useState, useEffect } from "react"

interface Slide {
  url: string
  caption?: string
}

interface SlideshowProps {
  slides: Slide[]
}

export default function Slideshow({ slides }: SlideshowProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (!slides || slides.length === 0) return null

  return (
    <div className="rounded-2xl overflow-hidden border border-[#e0eada] relative aspect-[4/3] bg-[#f5f9f4]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.url}
            alt={slide.caption ?? ""}
            className="w-full h-full object-cover"
          />
          {slide.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-5 py-4">
              <p className="text-white text-[13px] font-medium">{slide.caption}</p>
            </div>
          )}
        </div>
      ))}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{ background: i === current ? "white" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </div>
  )
}