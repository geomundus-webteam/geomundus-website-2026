"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/posthog-client";
import {
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";

interface SocialLinksProps {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

export function SocialLinks(socialLinks: SocialLinksProps) {
  return (
    <div className="flex justify-center space-x-4">
      {socialLinks?.twitter && (
        <Link
          href={socialLinks.twitter}
          onClick={() =>
            trackEvent("social_link_clicked", {
              platform: "twitter",
              page_path: window.location.pathname,
            })
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-emerald-700"
        >
          <AiOutlineTwitter className="h-6 w-6" />
          <span className="sr-only">Twitter</span>
        </Link>
      )}

      {socialLinks?.facebook && (
        <Link
          href={socialLinks.facebook}
          onClick={() =>
            trackEvent("social_link_clicked", {
              platform: "facebook",
              page_path: window.location.pathname,
            })
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-emerald-700"
        >
          <AiOutlineFacebook className="h-6 w-6" />
          <span className="sr-only">Facebook</span>
        </Link>
      )}

      {socialLinks?.instagram && (
        <Link
          href={socialLinks.instagram}
          onClick={() =>
            trackEvent("social_link_clicked", {
              platform: "instagram",
              page_path: window.location.pathname,
            })
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-emerald-700"
        >
          <AiOutlineInstagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </Link>
      )}

      {socialLinks?.linkedin && (
        <Link
          href={socialLinks.linkedin}
          onClick={() =>
            trackEvent("social_link_clicked", {
              platform: "linkedin",
              page_path: window.location.pathname,
            })
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-emerald-700"
        >
          <AiOutlineLinkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      )}

      {socialLinks?.github && (
        <Link
          href={socialLinks.github}
          onClick={() =>
            trackEvent("social_link_clicked", {
              platform: "github",
              page_path: window.location.pathname,
            })
          }
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-emerald-700"
        >
          <AiOutlineGithub className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </Link>
      )}
    </div>
  );
}