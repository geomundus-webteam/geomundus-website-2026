import { Partner, Sponsor } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

interface SponsorSectionProps {
  sponsors?: Sponsor[];
  partners?: Partner[];
}

export default function SponsorSection({
  sponsors,
  partners,
}: SponsorSectionProps) {
  // Group sponsors by tier
  const sponsorsByTier =
    sponsors?.reduce(
      (acc, sponsor) => {
        const tier = sponsor.tier || "other";
        if (!acc[tier]) {
          acc[tier] = [];
        }
        acc[tier].push(sponsor);
        return acc;
      },
      {} as Record<string, Sponsor[]>,
    ) || {};

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">Sponsors</h3>

      {sponsors && sponsors.length > 0 ? (
        <div className="space-y-8">
          {/* Platinum Sponsors */}
          {sponsorsByTier.platinum && sponsorsByTier.platinum.length > 0 && (
            <div>
              {/* <h4 className="text-xl font-semibold text-center mb-4">
                Platinum
              </h4> */}
              <div className="flex flex-wrap justify-center gap-8">
                {sponsorsByTier.platinum.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor._id}
                    name={sponsor.name}
                    logoUrl={sponsor.logoUrl}
                    websiteUrl={sponsor.websiteUrl}
                    size="large"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Gold Sponsors */}
          {sponsorsByTier.gold && sponsorsByTier.gold.length > 0 && (
            <div>
              {/* <h4 className="text-xl font-semibold text-center mb-4">Gold</h4> */}
              <div className="flex flex-wrap justify-center gap-8">
                {sponsorsByTier.gold.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor._id}
                    name={sponsor.name}
                    logoUrl={sponsor.logoUrl} // fake alert, this field exists, but was not in the type
                    websiteUrl={sponsor.websiteUrl}
                    size="large"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Silver Sponsors */}
          {sponsorsByTier.silver && sponsorsByTier.silver.length > 0 && (
            <div>
              {/* <h4 className="text-xl font-semibold text-center mb-4">Silver</h4> */}
              <div className="flex flex-wrap justify-center gap-8">
                {sponsorsByTier.silver.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor._id}
                    name={sponsor.name}
                    logoUrl={sponsor.logoUrl} // fake alert, this field exists, but was not in the type
                    websiteUrl={sponsor.websiteUrl}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bronze Sponsors */}
          {sponsorsByTier.bronze && sponsorsByTier.bronze.length > 0 && (
            <div>
              {/* <h4 className="text-xl font-semibold text-center mb-4">Bronze</h4> */}
              <div className="flex flex-wrap justify-center gap-8">
                {sponsorsByTier.bronze.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor._id}
                    name={sponsor.name}
                    logoUrl={sponsor.logoUrl} // fake alert, this field exists, but was not in the type
                    websiteUrl={sponsor.websiteUrl}
                    size="small"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Sponsors */}
          {sponsorsByTier.other && sponsorsByTier.other.length > 0 && (
            <div>
              {/* <h4 className="text-xl font-semibold text-center mb-4">
                Sponsors
              </h4> */}
              <div className="flex flex-wrap justify-center gap-8">
                {sponsorsByTier.other.map((sponsor) => (
                  <SponsorLogo
                    key={sponsor._id}
                    name={sponsor.name}
                    logoUrl={sponsor.logoUrl} // fake alert, this field exists, but was not in the type
                    websiteUrl={sponsor.websiteUrl}
                    size="small"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Display a message when no sponsors are available
        <div className="flex justify-center items-center h-24">
          <p className="text-gray-500 italic">
            No sponsors available at the moment.
          </p>
        </div>
      )}

      <h3 className="text-2xl font-bold text-center mb-8 mt-16">Partners</h3>

      {partners && partners.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner) => (
            <SponsorLogo
              key={partner._id}
              name={partner.name}
              logoUrl={partner.logoUrl}
              websiteUrl={partner.websiteUrl}
              size="small"
            />
          ))}
        </div>
      ) : (
        // Display a message when no partners are available
        <div className="flex justify-center items-center h-24">
          <p className="text-gray-500 italic">
            No partners available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}

interface SponsorLogoProps {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
  size?: "small" | "medium" | "large";
}

function SponsorLogo({
  name,
  logoUrl,
  websiteUrl,
  size = "medium",
}: SponsorLogoProps) {
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 48, height: 48 },
  };

  const { width, height } = dimensions[size];

  // Use a placeholder or handle missing logoUrl more gracefully
  const resolvedLogoUrl = logoUrl || "/placeholder.svg"; // You should have a placeholder image
  return (
    <Link
      href={websiteUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
    >
      <div
        className={`relative w-${width} h-${height}`}
        style={{ width: `${width * 4}px`, height: `${height * 4}px` }}
      >
        <Image
          src={resolvedLogoUrl}
          alt={name}
          fill
          className="object-contain p-2"
        />
      </div>
    </Link>
  );
}
