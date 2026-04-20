import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cachedClient } from "@/lib/sanity.client";
import GuestDetails from "@/components/guest-details";

type Props = {
  params: { email: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedEmail = decodeURIComponent(params.email);

  return {
    title: `Guest Information - GeoMundus`,
    description: `Registration details for ${decodedEmail}`,
  };
}

// Query to get registration by email
const registrationByEmailQuery = `*[_type == "registration" && email == $email][0] {
  _id,
  firstName,
  lastName,
  email,
  affiliation,
  role,
  dietaryRequirements,
  attendingDinner,
  abstract,
  status,
  qrCode
}`;

export default async function GuestPage({ params }: Props) {
  const decodedEmail = decodeURIComponent(params.email);
  const registration = await cachedClient(registrationByEmailQuery, {
    email: decodedEmail,
  });

  if (!registration) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-16 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Guest Information
          </h1>
          <p className="text-lg md:text-xl mb-4">
            Registration details for GeoMundus Conference
          </p>
        </div>
      </section>

      {/* Guest Details Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <GuestDetails registration={registration} />
          </div>
        </div>
      </section>
    </main>
  );
}
