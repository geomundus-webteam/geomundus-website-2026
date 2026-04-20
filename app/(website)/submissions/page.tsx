import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileTextIcon,
  ImageIcon,
  ExternalLinkIcon,
  CalendarIcon,
} from "lucide-react";
import { cachedClient } from "@/lib/sanity.client";
import { siteSettingsQuery, submissionInfoQuery } from "@/lib/sanity.queries";
import { format, isPast } from "date-fns";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { SubmissionButton } from "@/components/submission-button";
import { SocialLinks } from "@/components/socialLinks";

export async function generateMetadata(): Promise<Metadata> {
  const submissionInfo = await cachedClient(submissionInfoQuery.query);

  return {
    title: `GeoMundus - ${submissionInfo?.title || "Submissions"}`,
    description:
      submissionInfo?.description ||
      "Submit your papers and posters to the GeoMundus Conference",
  };
}

export default async function SubmissionsPage() {
  const siteSettings = await cachedClient(siteSettingsQuery.query);
  const submissionInfo = await cachedClient(submissionInfoQuery.query);

  const isSubmissionOpen = siteSettings?.submissionOpen || false;

  const formattedDeadline = submissionInfo?.submissionDeadline
    ? format(new Date(submissionInfo.submissionDeadline), "MMMM do, yyyy")
    : null;

  const isDeadlinePast = submissionInfo?.submissionDeadline
    ? isPast(new Date(submissionInfo.submissionDeadline))
    : false;

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {submissionInfo?.title || "Submissions"}
          </h1>
          <p className="text-lg md:text-xl mb-4">
            {submissionInfo?.description ||
              "Submit your papers and posters to the GeoMundus Conference"}
          </p>

          {isSubmissionOpen && formattedDeadline ? (
            <p className="flex items-center justify-center gap-2 text-lg mt-4">
              <CalendarIcon className="h-5 w-5" />
              Submission deadline: {formattedDeadline}
            </p>
          ) : isDeadlinePast ? (
            <p className="flex items-center justify-center gap-2 text-lg mt-4">
              <CalendarIcon className="h-5 w-5" />
              Submissions are now closed.
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2 text-lg mt-4">
              <CalendarIcon className="h-5 w-5" />
              Submissions will be opened soon!
            </p>
          )}
        </div>
      </section>

      {/* Call for Papers Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              {submissionInfo?.callForPapersTitle ||
                "Call for Short Paper and Poster"}
            </h2>

            {submissionInfo?.callForPapersContent ? (
              <div className="prose max-w-none text-gray-700">
                <PortableTextRenderer
                  content={submissionInfo.callForPapersContent}
                />
              </div>
            ) : (
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  The GeoMundus Conference is opening its forum to young
                  professionals looking to present their work in the field of
                  Geospatial Technologies, Geoinformatics & GI Applications.
                </p>
                <p>
                  Our unique approach as a student organized congress gives the
                  opportunity to young academics to receive feedback to their
                  work from experienced actors of the scientific community and
                  interact with other likeminded professionals working with
                  geographic applications.
                </p>
              </div>
            )}

            {submissionInfo?.footnote && (
              <p className="text-sm text-gray-500 italic mt-6">
                {submissionInfo.footnote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Submission</h2>

            <p className="text-center mb-10">
              You can download the templates for the short paper and poster
              below. Each template also includes the submission guidelines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Short Paper Template & Guidelines
                  </CardTitle>
                  <FileTextIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={submissionInfo?.shortPaperGuidelineUrl || "#"}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-emerald-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">
                    Poster Template & Guidelines
                  </CardTitle>
                  <ImageIcon className="h-5 w-5 text-emerald-700" />
                </CardHeader>
                <CardContent className="pt-6">
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={submissionInfo?.posterGuidelineUrl || "#"}
                      className="flex items-center justify-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {submissionInfo?.posterPrintingNote && (
              <p className="text-center mb-6 text-sm text-gray-600">
                {submissionInfo.posterPrintingNote}
              </p>
            )}

            <div className="space-y-4">
              <SubmissionButton
                submissionOpen={isSubmissionOpen}
                link={submissionInfo.submissionFormUrl}
              />
            </div>
            <div className="mt-10 text-center p-6 bg-gray-100 rounded-lg">
              <p>
                {
                  "If you have further queries about the short paper and poster submission, please contact the conference organizing committee at"
                }{" "}
                {submissionInfo?.contactEmail && (
                  <Link
                    href={`mailto:${submissionInfo.contactEmail}`}
                    className="text-emerald-700 font-medium hover:underline"
                  >
                    {submissionInfo.contactEmail}.
                  </Link>
                )}
              </p>
              <br />
              <p>{"Follow us on social networks to get the latest updates."}</p>
              <SocialLinks
                twitter={siteSettings?.socialLinks?.twitter}
                facebook={siteSettings?.socialLinks?.facebook}
                instagram={siteSettings?.socialLinks?.instagram}
                linkedin={siteSettings?.socialLinks?.linkedin}
                github={siteSettings?.socialLinks?.github}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
