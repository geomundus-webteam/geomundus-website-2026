import { CheckCircle2, Instagram, Globe, Mail } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegistrationConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Thank you for your submission!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              We look forward to welcoming you to GeoMundus 2026 in Castellón de la Plana,
              Portugal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Please check your email for further updates and important
                information regarding the conference.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Stay updated by following us:
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://instagram.com/geomundus_conference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span>geomundus_conference</span>
                </a>

                <a
                  href="https://www.geomundus.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  <span>www.geomundus.org</span>
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                Have questions? Contact us at{" "}
                <a
                  href="mailto:program@geomundus.org"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  program@geomundus.org
                </a>
              </p>
            </div>

            <div className="pt-6">
              <Button asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
