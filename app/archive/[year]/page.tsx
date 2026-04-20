import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cachedClient } from "@/lib/sanity.client";
import {
  conferenceByYearQuery,
  currentConferenceYearQuery,
} from "@/lib/sanity.queries";
import type { Conference } from "@/sanity.types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  CalendarIcon,
  MapPinIcon,
  ExternalLinkIcon,
  UsersIcon,
  BookOpenIcon,
  AwardIcon,
  BuildingIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: {
    year: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const query = conferenceByYearQuery(Number.parseInt(year));
  const conference = await cachedClient<Conference>(query.query, {
    year: Number.parseInt(year),
  });

  if (!conference) {
    return {
      title: "Conference Not Found - GeoMundus",
      description: "The requested conference year could not be found.",
    };
  }

  return {
    title: `${conference.title} - GeoMundus ${year}`,
    description:
      conference.description || `GeoMundus ${year} - Past Conference Archive`,
  };
}

export default async function ConferenceArchivePage({ params }: Props) {
  const { year } = await params;
  const parsedYear = Number.parseInt(year);
  const currentYear = await cachedClient(currentConferenceYearQuery.query);

  // Redirect to home page if trying to access current year in archive
  if (parsedYear === currentYear) {
    redirect("/");
  }

  const query = conferenceByYearQuery(parsedYear);
  const conference = await cachedClient<Conference>(query.query, {
    year: parsedYear,
  });

  if (!conference) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Archive Banner */}
      <div className="bg-amber-100 text-amber-800 p-4 text-center">
        <p className="font-medium">
          You are viewing an archived conference from {year}.
          <Link href="/" className="ml-2 underline">
            View the current conference
          </Link>
        </p>
      </div>

      {/* Hero Section with Image Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-600 opacity-90" />
        {conference.imageUrl ? (
          <div className="absolute inset-0">
            <Image
              src={conference.imageUrl || "/placeholder.svg"}
              alt={conference.title || "Conference image"}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        ) : null}

        <div className="relative container mx-auto px-4 py-24 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center">
              <Link
                href="/archive"
                className="text-white/80 hover:text-white flex items-center gap-2 mb-4 transition-colors"
              >
                <span>← Back to Archive</span>
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              GeoMundus {year}
              {conference.title && (
                <span className="block text-3xl md:text-4xl mt-2">
                  {conference.title}
                </span>
              )}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8">
              {conference.year && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{conference.year}</span>
                </div>
              )}

              {conference.location && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{conference.location}</span>
                </div>
              )}
            </div>

            {conference.description && (
              <div className="text-lg md:text-xl max-w-3xl bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                {conference.description}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Overview Section */}
      <div className="bg-white dark:bg-gray-800 py-12 shadow-md">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <UsersIcon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  International Participants
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Bringing together researchers, students, and professionals
                  from around the world.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <BookOpenIcon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Knowledge Exchange</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Featuring keynote speeches, workshops, and poster
                  presentations on cutting-edge research.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <AwardIcon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Student-Organized</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Entirely organized by students of the Erasmus Mundus Master's
                  program in Geospatial Technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-16">
            {/* Host Institution Section */}
            {conference.hostInstitution && (
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <BuildingIcon className="h-8 w-8 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Host Institution
                    </h2>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {conference.hostInstitution.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {conference.hostInstitution.description}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <MapPinIcon className="h-5 w-5" />
                        <span>{conference.location}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="aspect-video relative rounded-lg overflow-hidden">
                        <Image
                          src={
                            conference.hostInstitution.imageUrl ||
                            "/placeholder.svg?height=300&width=500"
                          }
                          alt={
                            conference.hostInstitution.name ||
                            "Host institution"
                          }
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Conference Themes Section */}
            {conference.themes && conference.themes.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Conference Themes
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {conference.themes.map((theme, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-4 py-2 text-base bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Keynote Speakers Section */}
            {conference.keynoteSpeakers &&
              conference.keynoteSpeakers.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      Keynote Speakers
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {conference.keynoteSpeakers.map((speaker, index) => (
                        <Card
                          key={index}
                          className="border-0 shadow-md hover:shadow-lg transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                              {speaker.imageUrl ? (
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                                  <Image
                                    src={speaker.imageUrl || "/placeholder.svg"}
                                    alt={speaker.name || "Speaker"}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              ) : (
                                <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                                  <UsersIcon className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                                </div>
                              )}
                              <h3 className="text-lg font-bold mb-1">
                                {speaker.name}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                {speaker.organization}
                              </p>
                              <Separator className="mb-3" />
                              <p className="text-sm italic">{speaker.topic}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>
              )}

            {/* Highlights Section */}
            {conference.highlights && conference.highlights.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Conference Highlights
                  </h2>
                  <div className="prose dark:prose-invert max-w-none prose-emerald prose-lg">
                    <PortableTextRenderer content={conference.highlights} />
                  </div>
                </div>
              </section>
            )}

            {/* Gallery Section */}
            {conference.galleryImages &&
              conference.galleryImages.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                      Photo Gallery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {conference.galleryImages.map((image, index) => (
                        <Card
                          key={index}
                          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all"
                        >
                          <CardContent className="p-0">
                            <div className="relative aspect-square">
                              <Image
                                src={image || "/placeholder.svg"}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>
              )}
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 flex flex-col sm:flex-row justify-between gap-4 pt-8">
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href="/archive">
                  <span>← All Archives</span>
                </Link>
              </Button>

              {parsedYear > 2009 && (
                <Button asChild variant="outline">
                  <Link href={`/archive/${parsedYear - 1}`}>
                    <span>← GeoMundus {parsedYear - 1}</span>
                  </Link>
                </Button>
              )}

              {parsedYear < currentYear && (
                <Button asChild variant="outline">
                  <Link href={`/archive/${parsedYear + 1}`}>
                    <span>GeoMundus {parsedYear + 1} →</span>
                  </Link>
                </Button>
              )}
            </div>

            <Button asChild className="bg-emerald-700 text-white">
              <Link href="/">Return to Current Conference</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
