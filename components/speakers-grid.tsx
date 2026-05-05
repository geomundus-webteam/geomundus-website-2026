"use client"
import ScrollRevealGrid from "@/components/scroll-grid"
import SpeakerCard from "@/components/speaker-card"

const speakers = [
  {
    name: "Keynote speaker #1",
    title: "",
    organization: "",
    imageUrl: undefined,
    websiteUrl: undefined,
    keynoteTitle: undefined,
    keynoteDescription: undefined,
  },
  {
    name: "Keynote speaker #2",
    title: "",
    organization: "",
    imageUrl: undefined,
    websiteUrl: undefined,
    keynoteTitle: undefined,
    keynoteDescription: undefined,
  },
  {
    name: "Keynote speaker #3",
    title: "",
    organization: "",
    imageUrl: undefined,
    websiteUrl: undefined,
    keynoteTitle: undefined,
    keynoteDescription: undefined,
  },
]

export default function SpeakersGrid() {
  return (
    <ScrollRevealGrid
      items={speakers}
      getKey={(s) => s.name}
      renderItem={(s) => (
        <SpeakerCard
          name={s.name}
          title={s.title}
          organization={s.organization}
        />
      )}
    />
  )
}