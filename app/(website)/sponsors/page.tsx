import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  Mail,
  Users,
  Globe,
  Award,
  Zap,
  BarChart,
  Presentation,
  Coffee,
  Trophy,
  Megaphone,
  CreditCard,
  Eye,
  Mic,
} from "lucide-react";
import { cachedClient } from "@/lib/sanity.client";
import { currentConferenceQuery } from "@/lib/sanity.queries";
import WhySponsorCards from "@/components/why-sponsors-grid";

export const metadata: Metadata = {
  title: "GeoMundus - Become a Sponsor",
  description:
    "Support the GeoMundus Conference 2026 in Castellón de la Plana and connect with the geospatial community",
};

export default async function SponsorsPage() {
  const currentConference = await cachedClient(currentConferenceQuery.query);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Become a Sponsor
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Support GeoMundus 2026 in Castellón de la Plana and connect with the geospatial
            community
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6">
            <p className="text-sm font-medium">
              TBD 2026 • Castellón de la Plana, Spain
            </p>
            <p className="text-xs mt-1">
              Theme: Geospatial Intelligence for Disaster Resilience
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Sponsor GeoMundus 2026?
            </h2>

            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                The Geomundus Conference has been held annually, bringing
                together leading professionals, innovators, and experts from
                around the world in the Geographic Information Science field
                since 2009. The next GeoMundus 2026 conference will be held in
                Castellón de la Plana, Spain in 2026.
              </p>

              <p>
                This year's conference topic will be{" "}
                <strong>Geospatial Intelligence for Disaster Resilience</strong>, but
                we will include extra topics focused on Geographic Information
                Science and Geographic Information Systems.
              </p>

              <p>
                The GeoMundus Conference 2026 will help your organization gain
                exposure among researchers, highly skilled professionals and
                business partners coming from all over Europe. We are very
                flexible and would be happy to accommodate any suggestions or
                requests from potential sponsors and create bespoke packages
                where required.
              </p>
            </div>

            <WhySponsorCards />
          </div>
        </div>
      </section>

      {/* Sponsorship Packages Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Sponsorship Packages
            </h2>
            <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
              These packages aim to adjust to different budgets and purposes. We
              offer flexible options to meet your organization's specific needs
              and objectives.
            </p>


            {/* Benefits Table */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8">Tier Benefits</h3>
                <div className="flex justify-center mb-10">
                  <Image src="/sponsorship_1.png" alt="Tier Benefits 2026" width={800} height={800} priority className="drop-shadow-[0_10px_40px_rgba(45,106,39,0.15)]" />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Sponsors Section */}
      {(currentConference?.sponsors?.length > 0 ||
        currentConference?.partners?.length > 0) && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Sponsors and Partners
              </h2>

              {currentConference.sponsors?.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-bold text-center mb-8">
                    Sponsors
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {currentConference?.sponsors?.map((sponsor) => (
                      <div
                        key={sponsor._id}
                        className="flex items-center justify-center"
                      >
                        {sponsor.logoUrl ? (
                          <Link
                            href={sponsor.websiteUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <Image
                              src={sponsor.logoUrl || "/placeholder.svg"}
                              alt={sponsor.name}
                              width={150}
                              height={80}
                              className="max-h-20 w-auto object-contain"
                            />
                          </Link>
                        ) : (
                          <div className="bg-gray-200 p-4 rounded-md">
                            <p className="text-gray-700 font-medium">
                              {sponsor.name}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentConference.partners?.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-center mb-8">
                    Partners
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {currentConference?.partners?.map((partner) => (
                      <div
                        key={partner._id}
                        className="flex items-center justify-center"
                      >
                        {partner.logoUrl ? (
                          <Link
                            href={partner.websiteUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                          >
                            <Image
                              src={partner.logoUrl || "/placeholder.svg"}
                              alt={partner.name}
                              width={150}
                              height={80}
                              className="max-h-20 w-auto object-contain"
                            />
                          </Link>
                        ) : (
                          <div className="bg-gray-200 p-4 rounded-md">
                            <p className="text-gray-700 font-medium">
                              {partner.name}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Become a Sponsor Today</h2>
            <p className="text-gray-700 mb-8">
              Please feel free to reach out to us at any moment, we are ready to
              discuss alternatives for you to sponsor and join our community. Do
              you have in mind a different idea on how you can participate as a
              sponsor? We are very flexible and would be happy to accommodate
              any suggestions or requests from potential sponsors and create
              bespoke packages where required.
            </p>

            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Mail className="h-12 w-12 text-emerald-600" />
                  <h3 className="text-xl font-bold">
                    Contact Our Sponsorship Team
                  </h3>
                  <p className="text-gray-700">
                    Email us at{" "}
                    <Link
                      href="mailto:budget@geomundus.org"
                      className="text-emerald-700 font-medium hover:underline"
                    >
                      budget@geomundus.org
                    </Link>{" "}
                    to discuss sponsorship opportunities.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="mt-4 bg-emerald-700 hover:bg-emerald-800"
                  >
                    <Link href="mailto:budget@geomundus.org">
                      Contact Us About Sponsorship
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
