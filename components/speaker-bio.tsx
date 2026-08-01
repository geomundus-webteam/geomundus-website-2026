"use client"
import { useState } from "react"
import PortableTextRenderer from "@/components/portable-text-renderer"

export default function SpeakerBio({ shortBio, fullBio }: { shortBio?: string, fullBio?: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      {shortBio && (
        <p className="text-[14px] text-[#6e6e73] leading-[1.8] text-justify">{shortBio}</p>
      )}
      {fullBio && (
        <>
          {expanded && (
            <div className="text-[14px] text-[#6e6e73] leading-[1.8] text-justify mt-3">
              <PortableTextRenderer content={fullBio} />
            </div>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[13px] text-[#058a78] hover:underline mt-2 font-medium"
          >
            {expanded ? "Show less ↑" : "Read full bio ↓"}
          </button>
        </>
      )}
    </div>
  )
}