import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cachedClient } from "@/lib/sanity.client";
import {
  conferencesQuery,
  currentConferenceYearQuery,
} from "@/lib/sanity.queries";
import { Conference } from "@/sanity.types";

export const metadata: Metadata = {
  title: "GeoMundus - Conference Archive",
  description: "Archive of past GeoMundus conferences",
};

export default async function ArchivePage() {
  const conferences = await cachedClient(conferencesQuery.query);
  const currentYear = await cachedClient(currentConferenceYearQuery.query);

  // Filter out the current year from the archive
  const pastConferences = conferences.filter(
    (conf: Conference) => conf.year !== currentYear,
  );
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-amber-100 text-amber-800 p-4 text-center">
        <p className="font-medium">
          {
            "We are working on the archive. Please, be aware that some information might be missing."
          }
        </p>
      </div>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            GeoMundus Conference Archive
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Explore the history of GeoMundus conferences through the years
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-emerald-800 hover:bg-gray-100"
          >
            <Link href="/">View Current Conference</Link>
          </Button>
        </div>
      </section>

      {/* Archive Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Past Conferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastConferences.map((conference: Conference) => (
              <Card
                key={conference._id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  {conference.imageUrl ? (
                    <Image
                      src={conference.imageUrl || "/placeholder.svg"}
                      alt={`GeoMundus ${conference.year}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-700">
                        {conference.year}
                      </span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>GeoMundus {conference.year}</CardTitle>
                  <CardDescription>{conference.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{conference.description}</p>
                </CardContent>
                <CardFooter>
                  {conference.websiteUrl ? (
                    <Button asChild variant="outline" className="w-full">
                      <a
                        href={conference.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit External Site
                      </a>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="w-full bg-emerald-700 text-white"
                    >
                      <Link href={`/archive/${conference.year}`}>
                        View Details
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
