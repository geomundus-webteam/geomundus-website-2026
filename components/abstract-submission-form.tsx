"use client";

import {useState} from "react";

const themes = [
  {label: "Hazard Modelling & Risk Assessment", value: "hazard-modelling-&-risk-assessment"},
  {label: "Early Warning & Monitoring Systems", value: "early-warning-&-monitoring-systems"},
  {label: "Geospatial Decision Support Systems", value: "geospatial-decision-support-systems"},
  {label: "Emergency Response & Logistics", value: "emergency-response-&-logistics"},
  {label: "Rapid Damage Assessment & Recovery", value: "rapid-damage-assessment-&-recovery"},
];

export function AbstractSubmissionForm() {
  const [submissionType, setSubmissionType] = useState<"paper" | "poster">("paper");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setMessage("Your abstract was submitted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-6 md:p-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f]">
          Abstract Submission
        </h1>
        <p className="mt-3 text-gray-600">
          Submit your abstract directly through the GeoMundus website.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Accepted file types: PDF, DOC, DOCX. Maximum size: 10 MB.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-xl font-medium text-[#1d1d1f] mb-4">Applicant Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" required className="w-full rounded-2xl border border-gray-300 px-4 py-3" />
            <input name="lastName" placeholder="Last Name" required className="w-full rounded-2xl border border-gray-300 px-4 py-3" />
            <input name="institution" placeholder="Organization or Institution’s Name" required className="w-full rounded-2xl border border-gray-300 px-4 py-3 md:col-span-2" />
            <input name="email" type="email" placeholder="Corresponding Author Email" required className="w-full rounded-2xl border border-gray-300 px-4 py-3 md:col-span-2" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#1d1d1f] mb-4">Submission Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <select name="sessionTheme" required className="w-full rounded-2xl border border-gray-300 px-4 py-3">
              <option value="">Select your session theme</option>
              {themes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>

            <select
              name="submissionType"
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3"
              value={submissionType}
              onChange={(e) => setSubmissionType(e.target.value as "paper" | "poster")}
            >
              <option value="paper">Paper presentation</option>
              <option value="poster">Poster presentation</option>
            </select>

            <input
              name="title"
              placeholder={submissionType === "paper" ? "Paper Title" : "Poster Title"}
              required
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 md:col-span-2"
            />

            <textarea
              name="authors"
              placeholder="Full name(s) of author(s). Separate multiple authors with commas."
              required
              rows={4}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 md:col-span-2"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-medium text-[#1d1d1f] mb-4">Upload</h2>
          <label className="block text-sm text-gray-600 mb-2">
            {submissionType === "paper" ? "Submit your paper" : "Submit your abstract"}
          </label>
          <input
            name="file"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="block w-full rounded-2xl border border-gray-300 px-4 py-3"
          />
        </section>

        <div className="space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#058a78] text-white px-6 py-3.5 hover:bg-[#036154] transition-colors disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Abstract"}
          </button>

          {message && <p className="text-green-700 text-center">{message}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}