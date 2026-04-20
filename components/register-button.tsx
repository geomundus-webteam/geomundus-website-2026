"use client";
import Link from "next/link";

interface RegisterButtonProps {
  registrationOpen?: boolean | null;
}

export function RegisterButton({ registrationOpen }: RegisterButtonProps) {
  return (
    <Link
      href={registrationOpen ? "/registration" : "/#contact"}
      className="inline-block bg-[#2d6a27] text-white text-[14px] font-medium px-6 py-2.5 rounded-full hover:bg-[#245520] transition-colors duration-200"
    >
      {registrationOpen ? "Register now" : "Register interest"}
    </Link>
  );
}
