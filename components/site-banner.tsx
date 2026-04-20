"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface BannerProps {
  text: string;
  color: string;
  linkText?: string;
  linkUrl?: string;
}

const getBannerColors = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "green":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "red":
      return "bg-red-100 text-red-800 border-red-200";
    case "yellow":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "purple":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const getLinkColors = (color: string) => {
  switch (color) {
    case "blue":
      return "text-blue-900 hover:text-blue-700";
    case "green":
      return "text-emerald-900 hover:text-emerald-700";
    case "red":
      return "text-red-900 hover:text-red-700";
    case "yellow":
      return "text-amber-900 hover:text-amber-700";
    case "purple":
      return "text-purple-900 hover:text-purple-700";
    default:
      return "text-blue-900 hover:text-blue-700";
  }
};

export default function SiteBanner({
  text,
  color,
  linkText,
  linkUrl,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check localStorage for banner dismissed state
    const bannerDismissed = localStorage.getItem("bannerDismissed") === "true";
    if (bannerDismissed) {
      setIsVisible(false);
    }

    if (isVisible) {
      // Set the banner height when the component mounts
      document.documentElement.style.setProperty("--banner-height", "46px");
      document.documentElement.style.setProperty("--banner-height-sm", "42px");

      // Add a class to the body to indicate banner is visible
      document.body.classList.add("has-banner");
    } else {
      // Clean up when banner is dismissed
      document.documentElement.style.setProperty("--banner-height", "0px");
      document.documentElement.style.setProperty("--banner-height-sm", "0px");
      document.body.classList.remove("has-banner");
    }

    return () => {
      // Clean up when component unmounts
      document.documentElement.style.setProperty("--banner-height", "0px");
      document.documentElement.style.setProperty("--banner-height-sm", "0px");
      document.body.classList.remove("has-banner");
    };
  }, [isVisible]);

  const dismissBanner = () => {
    setIsVisible(false);
    // Save to localStorage
    localStorage.setItem("bannerDismissed", "true");
  };

  if (!isVisible) {
    return null;
  }

  const bannerColors = getBannerColors(color);
  const linkColors = getLinkColors(color);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 border-b ${bannerColors} py-3 px-4`}
    >
      <div className="container mx-auto relative">
        <div className="flex items-center justify-center text-center pr-8">
          <p className="font-medium">
            {text}
            {linkText && linkUrl && (
              <>
                {" "}
                <Link
                  href={linkUrl}
                  className={`font-semibold underline decoration-2 underline-offset-2 ${linkColors} transition-colors`}
                >
                  {linkText}
                </Link>
              </>
            )}
          </p>
        </div>

        <button
          onClick={dismissBanner}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
