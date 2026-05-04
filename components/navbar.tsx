"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMenu, LuX } from "react-icons/lu";
import { RegisterButton } from "./register-button";
import { SiteSettings } from "@/sanity.types";

interface NavbarProps {
  siteSettings: SiteSettings | null;
}

export default function Navbar({ siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{ top: "var(--banner-height, 0px)" }}
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/geo_logo.png" alt="GeoMundus logo" width={36} height={43} className="flex-shrink-0" priority />
          <span className="text-[15px] font-medium text-[#1d1d1f] tracking-tight">GeoMundus</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/#info", label: "About" },
            { href: "/speakers", label: "Speakers" },
            { href: "/#schedule", label: "Schedule" },
            { href: "/submissions", label: "Submissions" },
            { href: "/sponsors", label: "Sponsors" },
            { href: "/#contact", label: "Contact" },
            { href: "/team", label: "Team" },
          ].map(({ href, label }) => (
            <Link key={label} href={href} className="text-[13px] text-[#6e6e73] hover:text-[#1d1d1f] transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <RegisterButton registrationOpen={siteSettings?.registrationOpen} />
        </div>

        <button className="md:hidden p-2 text-[#6e6e73]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {[
              { href: "/#info", label: "About" },
              { href: "/speakers", label: "Speakers" },
              { href: "/#schedule", label: "Schedule" },
              { href: "/submissions", label: "Submissions" },
              { href: "/sponsors", label: "Sponsors" },
              { href: "/#contact", label: "Contact" },
              { href: "/team", label: "Team" },
            ].map(({ href, label }) => (
              <Link key={label} href={href} onClick={() => setIsOpen(false)} className="text-[14px] text-[#6e6e73] hover:text-[#1d1d1f] py-2.5 border-b border-gray-50 transition-colors">
                {label}
              </Link>
            ))}
            <div className="pt-3">
              <RegisterButton registrationOpen={siteSettings?.registrationOpen} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
