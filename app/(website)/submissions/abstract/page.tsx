import type {Metadata} from "next";
import {AbstractSubmissionForm} from "@/components/abstract-submission-form";

export const metadata: Metadata = {
  title: "Abstract Submission",
  description: "Submit your abstract for GeoMundus 2026.",
};

export default function AbstractSubmissionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="container mx-auto">
        <AbstractSubmissionForm />
      </div>
    </div>
  );
}