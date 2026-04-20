"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50">
      <p className="mb-4">
        This website uses cookies to improve your experience. By continuing to
        browse, you agree to our use of cookies.{" "}
        <Link
          href="https://commission.europa.eu/cookies-policy_en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:underline"
        >
          Learn more
        </Link>
      </p>
      <div className="flex gap-2">
        <Button
          onClick={acceptCookies}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Accept
        </Button>
        <Button
          onClick={rejectCookies}
          variant="outline"
          className="bg-transparent border-white hover:bg-gray-700"
        >
          Reject
        </Button>
      </div>
    </div>
  );
}
