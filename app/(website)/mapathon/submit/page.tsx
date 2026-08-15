import { Metadata } from "next";
import Link from "next/link";
import MapathonSubmissionForm from "@/components/mapathon-submission-form";

export const metadata: Metadata = {
  title: "Submit Your Entry - Map+ Challenge 2026 | GeoMundus",
  description:
    "Submit your entry to the GeoMundus Map+ Challenge 2026.",
};

export default function MapathonSubmitPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-emerald-800 text-white pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/mapathon"
            className="text-emerald-100 hover:text-white text-sm mb-4 inline-block"
          >
            ← Back to Map+ Challenge
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Submit Your Entry
          </h1>
          <p className="text-lg text-emerald-50">
            Map+ Challenge 2026 — Deadline: 30 September 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-gray-700">
          <p className="mb-2">
            <strong>Before submitting:</strong> Please read the{" "}
            <Link href="/mapathon" className="text-emerald-700 underline">
              full participation guidelines
            </Link>
            .
          </p>
          <p>
            AI-generated content is not permitted. All submissions must be your
            own original work.
          </p>
        </div>

        <MapathonSubmissionForm />
      </div>
    </main>
  );
}
