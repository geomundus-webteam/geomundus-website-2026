"use client"
import { Users, Globe, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollRevealGrid from "@/components/scroll-grid"

const items = [
  {
    icon: <Users className="h-8 w-8 text-emerald-600 mb-2" />,
    title: "Network with Experts",
    description: "Connect with leading professionals, researchers, and innovators from across Europe.",
  },
  {
    icon: <Globe className="h-8 w-8 text-emerald-600 mb-2" />,
    title: "European Exposure",
    description: "Gain visibility among highly skilled professionals and business partners from all over Europe.",
  },
  {
    icon: <Zap className="h-8 w-8 text-emerald-600 mb-2" />,
    title: "Disaster Management Focus",
    description: "Be part of the conversation on geospatial technologies for disaster management.",
  },
]

export default function WhySponsorCards() {
  return (
    <ScrollRevealGrid
      items={items}
      getKey={(item) => item.title}
      gridClassName="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      containerHeight="200vh"
      stagger={0.2}
      slideDistance={40}
      renderItem={(item) => (
        <Card className="bg-gray-50">
          <CardHeader className="pb-2">
            {item.icon}
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{item.description}</p>
          </CardContent>
        </Card>
      )}
    />
  )
}