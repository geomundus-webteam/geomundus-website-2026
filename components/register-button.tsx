"use client";
import Link from "next/link";

interface RegisterButtonProps {
  registrationOpen?: boolean | null;
}

export function RegisterButton({ registrationOpen }: RegisterButtonProps) {
  const href = registrationOpen ? "/registration" : "/#theme";
  const label = registrationOpen ? "Register" : "Registrations Opening Soon";

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center text-center bg-[#058a78] text-white text-[14px] font-medium px-6 py-2.5 rounded-full hover:bg-[#036154] transition-colors duration-200"
    >
      {label}
    </Link>
  );
}