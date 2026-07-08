"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function SponsorContactLinks() {
  return (
    <div className="flex justify-center gap-4 flex-wrap">
      <Link
        href="/sponsors"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-[#058a78] border border-[#058a78] text-[15px] px-8 py-3.5 rounded-full hover:bg-[#f0faf8] transition-colors"
        onClick={() =>
          posthog.capture("sponsor_contact_clicked", { action: "more_info" })
        }
      >
        More info
      </Link>

      <Link
        href="mailto:budget@geomundus.org?subject=Sponsorship%20Inquiry%20—%20GeoMundus%202026&body=Hello%20GeoMundus%20Team%2C%0A%0AI%20am%20interested%20in%20sponsoring%20GeoMundus%202026.%20Please%20send%20me%20more%20information%20about%20the%20sponsorship%20packages.%0A%0AOrganization%3A%0AContact%20person%3A%0A%0AThank%20you."
        className="inline-block bg-[#058a78] text-white text-[15px] px-8 py-3.5 rounded-full hover:bg-[#036154] transition-colors"
        onClick={() =>
          posthog.capture("sponsor_contact_clicked", {
            action: "become_sponsor",
          })
        }
      >
        Become a sponsor
      </Link>
    </div>
  );
}
