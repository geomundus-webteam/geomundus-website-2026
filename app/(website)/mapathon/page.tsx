import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Map+ Challenge 2026 | GeoMundus",
  description:
    "Show how maps can help us prepare, respond, and recover from disasters. Submit your entry to the GeoMundus Map+ Challenge 2026.",
};

export default function MapathonPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-emerald-800 text-white pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Map+ Challenge 2026
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-50">
            Show how maps can help us prepare, respond, and recover from
            disasters.
          </p>
          <div className="inline-block bg-white text-emerald-800 rounded-lg px-6 py-3 font-semibold">
            Submission deadline: 30 September 2026
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-16 px-4 space-y-12">
        {/* About */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            About the Challenge
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The GeoMundus Map+ Challenge 2026 invites participants to
            demonstrate how cartography and geospatial analysis can contribute
            to disaster management and resilience. Participants are encouraged
            to create maps that communicate information effectively, support
            decision-making, and raise awareness about hazards and their
            impacts.
          </p>
          <p className="font-semibold text-gray-900 mb-3">
            Theme: Disaster Management
          </p>
          <p className="text-gray-700 mb-2">Submissions may address:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Natural hazards (floods, earthquakes, landslides, wildfires, droughts, storms)</li>
            <li>Risk assessment and preparedness</li>
            <li>Emergency response and recovery</li>
            <li>Climate-related disasters and adaptation</li>
            <li>Vulnerability, exposure, and resilience analysis</li>
            <li>Humanitarian mapping and crisis management</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3 italic">
            For further context on the conference theme and detailed disaster categories, refer to the{" "}
            <Link href="/#theme" className="text-emerald-700 underline hover:text-emerald-900">
              main GeoMundus 2026 website
            </Link>.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Eligibility</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Open to all registered attendees of the GeoMundus Conference</li>
            <li>Individual and team submissions accepted</li>
            <li>Each participant or team may submit one entry</li>
            <li>Submitted work must be original and created specifically for the Map+ Challenge 2026</li>
          </ul>
        </section>

        {/* Submission Requirements */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Submission Requirements
          </h2>
          <p className="text-gray-700 mb-2">Each submission must include:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              A high-resolution digital map in one of the following formats:
              PDF, PNG, or interactive web map (publicly accessible link)
            </li>
            <li>
              A brief description (max 200 words) outlining the map's concept,
              purpose, design choices, data sources, intended audience, and
              expected impact
            </li>
          </ul>
        </section>

        {/* Recognition */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Recognition</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>All selected participants will receive an official certificate</li>
            <li>Winning entries will be showcased during the GeoMundus Conference</li>
            <li>
              Outstanding maps may be featured on GeoMundus communication
              channels with appropriate credit
            </li>
          </ul>
        </section>

        {/* Guidelines PDF */}
        <section className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2 text-emerald-900">
            Full Participation Guidelines
          </h3>
          <p className="text-gray-700 mb-4">
            For full details on submission requirements, technical guidelines,
            ethical principles, evaluation criteria, intellectual property,
            code of conduct, and the declaration of originality, please
            download the complete guidelines document.
          </p>
          <a
            href="/mapathon/map-challenge-2026-guidelines.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-700 text-white font-semibold px-6 py-3 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Download Guidelines (PDF)
          </a>
        </section>

        {/* Submit CTA */}
        <section className="text-center py-8">
          <Link
            href="/mapathon/submit"
            className="inline-block bg-emerald-700 text-white font-bold text-lg px-10 py-4 rounded-md hover:bg-emerald-800 transition-colors"
          >
            Submit Your Entry
          </Link>
        </section>

        {/* Questions */}
        <section className="border-t pt-8">
          <h3 className="text-xl font-bold mb-2 text-gray-900">Questions?</h3>
          <p className="text-gray-700">
            Contact us at{" "}
            <a
              href="mailto:program@geomundus.org"
              className="text-emerald-700 underline"
            >
              program@geomundus.org
            </a>
          </p>
          <p className="text-gray-500 italic mt-4">
            Let your maps tell the story of resilience.
          </p>
        </section>
      </div>
    </main>
  );
}
