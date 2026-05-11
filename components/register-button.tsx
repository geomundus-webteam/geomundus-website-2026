"use client";
import Link from "next/link";

interface RegisterButtonProps {
  registrationOpen?: boolean | null;
}

export function RegisterButton({ registrationOpen }: RegisterButtonProps) {
  return (
    <Link
      href="/registration"
      className="inline-block bg-[#058a78] text-white text-[14px] font-medium px-6 py-2.5 rounded-full hover:bg-[#036154] transition-colors duration-200"
    >
      {registrationOpen ? "Register now" : "Register interest"}
    </Link>
  );
}
