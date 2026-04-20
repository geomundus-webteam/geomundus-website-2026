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
              Theme: Geospatial Technologies for Smart Cities
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
                <strong>Geospatial Technologies for Smart Cities</strong>, but
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

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <Users className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>Network with Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Connect with leading professionals, researchers, and
                    innovators from across Europe.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <Globe className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>European Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Gain visibility among highly skilled professionals and
                    business partners from all over Europe.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader className="pb-2">
                  <Zap className="h-8 w-8 text-emerald-600 mb-2" />
                  <CardTitle>Smart Cities Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Be part of the conversation on geospatial technologies for
                    smart cities and urban innovation.
                  </p>
                </CardContent>
              </Card>
            </div>
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

            {/* General Sponsorship Packages */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8">
                General Sponsorship Packages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tier I Packages */}
                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <div className="flex items-center gap-2">
                      <Presentation className="h-5 w-5 text-emerald-600" />
                      <CardTitle className="text-emerald-800">
                        Workshop
                      </CardTitle>
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Tier I
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Tutorial, Demo or Workshop of your products or services
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      Contact us
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-emerald-600" />
                      <CardTitle className="text-emerald-800">
                        Panel Discussion
                      </CardTitle>
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Tier I
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Share Insights on Careers, Skills, and Opportunities
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      Contact us
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-600" />
                      <CardTitle className="text-emerald-800">
                        Reception/Social Event
                      </CardTitle>
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Tier I
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Be the star of the reception or our social event
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      From 1000 €
                    </p>
                  </CardContent>
                </Card>

                {/* Tier II Packages */}
                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-blue-800">
                        Coffee Break
                      </CardTitle>
                    </div>
                    <p className="text-sm text-blue-700 font-medium">Tier II</p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Be the star throughout all the coffee breaks
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      From 800 €
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-blue-800">
                        Sponsor Prize
                      </CardTitle>
                    </div>
                    <p className="text-sm text-blue-700 font-medium">Tier II</p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Prizes for Best Full Paper, Short Paper, Poster, and
                      others
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      From 500 €
                    </p>
                  </CardContent>
                </Card>

                {/* Tier III Packages */}
                <Card className="border-2 border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-purple-800">
                        Signal Sponsor
                      </CardTitle>
                    </div>
                    <p className="text-sm text-purple-700 font-medium">
                      Tier III
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Have your organization's promotional media in our social
                      media
                    </p>
                    <p className="text-lg font-bold text-purple-600">
                      From 350 €
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-purple-800">
                        Business Cards
                      </CardTitle>
                    </div>
                    <p className="text-sm text-purple-700 font-medium">
                      Tier III
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Have your business cards distributed at our conference
                    </p>
                    <p className="text-lg font-bold text-purple-600">
                      From 300 €
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Exhibition Packages */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-4">
                Exhibition - Sponsor Networking
              </h3>
              <p className="text-gray-700 mb-8">
                As part of the conference there will be a Sponsor Networking
                slot in the program of 45 minutes to encourage interaction with
                sponsor booths.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-emerald-600" />
                      <CardTitle className="text-emerald-800">
                        Spotlight
                      </CardTitle>
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Tier I
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Booth space + 15 min pitch at the Conference
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      From 1500 €
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-emerald-200">
                  <CardHeader className="bg-emerald-50">
                    <div className="flex items-center gap-2">
                      <Mic className="h-5 w-5 text-emerald-600" />
                      <CardTitle className="text-emerald-800">
                        GI Profile Speaker
                      </CardTitle>
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Tier I
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      45-Minute Expert Panel on GIS Trends and Opportunities
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      Contact us
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-blue-800">
                        Exhibition Booth
                      </CardTitle>
                    </div>
                    <p className="text-sm text-blue-700 font-medium">Tier II</p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Booth space at the Sponsor Networking
                    </p>
                    <p className="text-lg font-bold text-blue-600">
                      From 800 €
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-purple-800">
                        Banner & Beyond
                      </CardTitle>
                    </div>
                    <p className="text-sm text-purple-700 font-medium">
                      Tier III
                    </p>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700 mb-4">
                      Your promotional material displayed at the conference
                    </p>
                    <p className="text-lg font-bold text-purple-600">
                      From 450 €
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Benefits Table */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8">Tier Benefits</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Benefits</TableHead>
                      <TableHead className="text-center">Tier I</TableHead>
                      <TableHead className="text-center">Tier II</TableHead>
                      <TableHead className="text-center">Tier III</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Logo display on conference's website
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Logo display on event agenda on Facebook, Instagram, and
                        website
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Logo display on conference banners
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        One reserved pass for the Networking dinner
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Logo featured at the conclusion of the event promotional
                        video
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Display of sponsor multimedia material (max. 5 minutes)
                        during coffee-break
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Conference's end acknowledgment (Mentioning of
                        organization's name and role)
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Conference's promotion material
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Sponsor pitch or mini panel - 15 min. (Spotlight -
                        Exhibition)
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Pre-event social media promotion of sponsors products or
                        services (Signal Sponsor Package)
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-center">
                        <Check className="h-5 w-5 text-emerald-600 mx-auto" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
                    {currentConference.sponsors.map((sponsor) => (
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
                    {currentConference.partners.map((partner) => (
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
