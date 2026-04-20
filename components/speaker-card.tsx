"use client";

import { useState } from "react";
import Image from "next/image";
import { LuExternalLink, LuPlus, LuMinus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface SpeakerCardProps {
  name: string;
  title: string;
  organization: string;
  imageUrl?: string;
  websiteUrl?: string;
  keynoteTitle?: string;
  keynoteDescription?: string;
}

export default function SpeakerCard({
  name,
  title,
  organization,
  imageUrl,
  websiteUrl,
  keynoteTitle,
  keynoteDescription,
}: SpeakerCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Use a placeholder or handle missing imageUrl more gracefully
  const resolvedImageUrl = imageUrl || "/placeholder.svg?height=128&width=128";

  // Check if keynote information is available
  const hasKeynoteInfo = keynoteTitle || keynoteDescription;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Only show the expand button if keynote information is available */}
          {hasKeynoteInfo && (
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                onClick={() => setExpanded(!expanded)}
              ></Button>
            </div>
          )}

          <div className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <Image
                src={resolvedImageUrl || "/placeholder.svg"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg flex items-center justify-center gap-1">
                {name}
                {websiteUrl && (
                  <Link
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800"
                  >
                    <LuExternalLink className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </Link>
                )}
              </h3>
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-sm text-gray-500">{organization}</p>
            </div>
          </div>

          {expanded && hasKeynoteInfo && (
            <div className="p-6 bg-gray-50 border-t">
              <h4 className="font-semibold mb-2">KEYNOTE:</h4>
              {keynoteTitle && (
                <p className="text-sm text-gray-700 mb-2">{keynoteTitle}</p>
              )}
              {keynoteDescription && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {keynoteDescription}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
