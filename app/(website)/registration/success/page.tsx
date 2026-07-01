import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function RegistrationSuccess() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-teal-600">
            Registration Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg">
            Thank you for registering for GeoMundus 2026!
          </p>
          <p className="text-muted-foreground">
            You will receive a confirmation email shortly with further details  Make sure to check your spam folder.
            
          </p>
          <p className="text-muted-foreground">
            Join our WhatsApp community for real-time updates:{" "}
            <a
              href="https://chat.whatsapp.com/Fvapnehebv575yqUPzwAhG"
              className="text-teal-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join WhatsApp Group
            </a>
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
            >
              Back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
