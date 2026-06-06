"use client";

import { useState } from "react";

const THEMES = [
  "Citizen Science and Volunteered Geographic Information for Disaster Response",
  "Remote Sensing and Earth Observation for Disasters",
  "Geospatial Intelligence in Emergency Management",
  "AI, Machine Learning, and Predictive Analytics for Disasters",
  "Early Warning and Real-Time Monitoring Systems",
  "Crisis Mapping and Situational Awareness",
  "Geospatial Decision Support Systems",
  "Spatial Planning and Disaster Resilience",
  "Emergency Response and Humanitarian Logistics",
  "UAVs, Mobile GIS, and Sensor-Based Applications",
  "Damage Assessment and Recovery Planning",
  "Geospatial Analytics for Disaster Risk Reduction",
  "Innovations and Emerging Trends in Geoinformatics for Disaster Management",
];

export default function AbstractSubmissionForm() {
  const [submissionId, setSubmissionId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function toggleTheme(theme: string) {
    setSelectedThemes((prev) =>
      prev.includes(theme)
        ? prev.filter((item) => item !== theme)
        : [...prev, theme],
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setSubmissionId("");

    try {
      if (!file) {
        throw new Error("Please upload your abstract file.");
      }

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("institution", institution);
      formData.append("email", email);
      formData.append("title", title);
      formData.append("authors", authors);
      formData.append("selectedThemes", JSON.stringify(selectedThemes));
      formData.append("file", file);

      const response = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || "Submission failed");
      }

      setMessage("Your abstract was submitted successfully.");
      setSubmissionId(result.submissionId || "");

      setFirstName("");
      setLastName("");
      setInstitution("");
      setEmail("");
      setTitle("");
      setAuthors("");
      setSelectedThemes([]);
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-[28px] font-medium text-[#1d1d1f]">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-[24px] border border-[#d8dde3] px-6 py-5 text-[16px] text-[#1d1d1f] placeholder:text-[#98a2b3] outline-none focus:border-[#058a78]"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-[24px] border border-[#d8dde3] px-6 py-5 text-[16px] text-[#1d1d1f] placeholder:text-[#98a2b3] outline-none focus:border-[#058a78]"
            required
          />
        </div>

        <input
          type="text"
          placeholder="Institution"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          className="w-full rounded-[24px] border border-[#d8dde3] px-6 py-5 text-[16px] text-[#1d1d1f] placeholder:text-[#98a2b3] outline-none focus:border-[#058a78]"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-[24px] border border-[#d8dde3] px-6 py-5 text-[16px] text-[#1d1d1f] placeholder:text-[#98a2b3] outline-none focus:border-[#058a78]"
          required
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-[28px] font-medium text-[#1d1d1f]">
          Submission Information
        </h2>

        <div className="space-y-4">
          <label className="block text-[15px] font-medium text-[#1d1d1f]">
            Select one or more themes
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {THEMES.map((theme) => {
              const active = selectedThemes.includes(theme);

              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => toggleTheme(theme)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                    active
                      ? "border-[#058a78] bg-[#eaf7f4] shadow-sm"
                      : "border-[#d8dde3] bg-white hover:border-[#058a78]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-5 w-5 rounded border flex items-center justify-center ${
                        active
                          ? "border-[#058a78] bg-[#058a78] text-white"
                          : "border-[#b8c0cc] bg-white"
                      }`}
                    >
                      {active ? "✓" : ""}
                    </div>
                    <span className="text-[14px] leading-[1.5] text-[#1d1d1f]">
                      {theme}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedThemes.length > 0 && (
            <p className="text-[13px] text-[#058a78]">
              {selectedThemes.length} theme
              {selectedThemes.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>

        <input
          type="text"
          placeholder="Paper Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-[24px] border border-[#d8dde3] px-6 py-5 text-[16px] text-[#1d1d1f] placeholder:text-[#98a2b3] outline-none focus:border-[#058a78]"
          required
        />

        <textarea
          placeholder="Full name(s) of author(s). Separate multiple authors with commas."
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          rows={5}
          className="w-full rounded-[24px] border border-[#d8dde3] px-6 py-5 text-[16px] text-[#1d1d1f] placeholder:text-[#98a2b3] outline-none focus:border-[#058a78] resize-none"
          required
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-[28px] font-medium text-[#1d1d1f]">Upload</h2>
        <p className="text-[15px] text-[#6e6e73]">Upload your abstract file</p>

        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full rounded-[24px] border border-[#d8dde3] px-4 py-4 text-[15px] text-[#1d1d1f]"
          required
        />
      </section>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#058a78] px-8 py-4 text-[18px] font-medium text-white hover:bg-[#036154] transition-colors disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Abstract"}
      </button>

      {message && (
        <div className="rounded-2xl border border-[#058a78] bg-[#eaf7f4] px-6 py-6 text-center shadow-sm">
          <p className="text-[20px] md:text-[22px] font-semibold text-[#047a6b] leading-relaxed">
            {message}
          </p>

          {submissionId && (
            <p className="mt-3 text-[18px] md:text-[20px] font-bold text-[#035f54] break-words">
              Submission ID: {submissionId}
            </p>
          )}
        </div>
      )}

      {error && (
        <p className="text-center text-[15px] text-red-600">{error}</p>
      )}
    </form>
  );
}