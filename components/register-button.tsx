"use client";
import Link from "next/link";
import { trackEvent } from "@/lib/posthog-client";

interface RegisterButtonProps {
  registrationOpen?: boolean | null;
}

export function RegisterButton({ registrationOpen }: RegisterButtonProps) {
  const href = registrationOpen ? "/registration" : "/#theme";
  const label = registrationOpen ? "Register" : "Registrations Opening Soon";

  return (
    <Link
      href={href}
      onClick={() =>
        trackEvent("cta_clicked", {
          cta_name: "register",
          destination: href,
          button_label: label,
          section: "hero",
          page_path: window.location.pathname,
        })
      }
      className="inline-flex items-center justify-center text-center bg-[#058a78] text-white text-[14px] font-medium px-6 py-2.5 rounded-full hover:bg-[#036154] transition-colors duration-200"
    >
      {label}
    </Link>
  );
}