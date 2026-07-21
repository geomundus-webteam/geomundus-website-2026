import type { Metadata } from "next";
import { cachedClient } from "@/lib/sanity.client";
import { faqsQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import FaqSection from "@/components/faq-section";
import type { Faq } from "@/sanity.types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | GeoMundus Conference",
  description: "Frequently asked questions about the GeoMundus Conference 2026",
};

export default async function FaqPage() {
  const faqs = await cachedClient(faqsQuery.query);
  const siteSettings = await cachedClient(siteSettingsQuery.query);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section
        className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white"
        style={{ background: "linear-gradient(135deg, #036154, #058a78)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-85">
            Everything you need to know about GeoMundus 2026.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {faqs && faqs.length > 0 ? (
            <FaqSection faqs={faqs} />
          ) : (
            <div className="text-center py-12 bg-[#f5f9f4] rounded-2xl">
              <p className="text-[16px] text-[#6e6e73] mb-4">
                No FAQs available yet. Check back soon.
              </p>
              {siteSettings?.contactEmail && (
                <p className="text-[14px] text-[#6e6e73]">
                  Have a question?{" "}
                  <Link
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="text-[#058a78] hover:underline font-medium"
                  >
                    Contact us
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-[#f5f9f4] border-t border-[#e0eada]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[15px] text-[#6e6e73] mb-3">
            Can't find what you're looking for?
          </p>
          {siteSettings?.contactEmail && (
            <Link
              href={`mailto:${siteSettings.contactEmail}`}
              className="inline-block bg-[#058a78] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#036154] transition-colors"
            >
              Contact us
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}