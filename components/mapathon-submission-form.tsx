"use client";

import { useState } from "react";

export default function MapathonSubmissionForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [mapTitle, setMapTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [description, setDescription] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [consentGuidelines, setConsentGuidelines] = useState(false);
  const [consentAI, setConsentAI] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
  const wordCountValid = wordCount > 0 && wordCount <= 200;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setSubmissionId("");

    try {
      if (!file && !mapLink.trim()) {
        throw new Error("Please upload a map file or provide a link.");
      }

      if (!wordCountValid) {
        throw new Error(`Description must be 200 words or fewer (currently ${wordCount}).`);
      }

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("affiliation", affiliation);
      formData.append("mapTitle", mapTitle);
      formData.append("authors", authors);
      formData.append("description", description);
      formData.append("mapLink", mapLink);
      formData.append("consentGuidelines", String(consentGuidelines));
      formData.append("consentAI", String(consentAI));
      if (file) formData.append("mapFile", file);

      const res = await fetch("/api/mapathon", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      setSubmissionId(data.submissionId);
      setMessage("Your submission has been received. Check your email for confirmation.");

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setAffiliation("");
      setMapTitle("");
      setAuthors("");
      setDescription("");
      setMapLink("");
      setFile(null);
      setConsentGuidelines(false);
      setConsentAI(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">First Name *</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name *</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Affiliation (University / Organization)</label>
        <input
          type="text"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Map Title *</label>
        <input
          type="text"
          required
          value={mapTitle}
          onChange={(e) => setMapTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Authors *</label>
        <input
          type="text"
          required
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          placeholder="Full name(s) of author(s), comma-separated"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description * ({wordCount}/200 words max)
        </label>
        <textarea
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain your map's concept, purpose, design choices, data sources, intended audience, and expected impact."
          className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
            description.length > 0 && !wordCountValid ? "border-red-400" : "border-gray-300"
          }`}
        />
      </div>

      <div className="border-t pt-6 space-y-4">
        <p className="text-sm text-gray-700">
          Submit your map as a file (PDF or PNG) <strong>or</strong> as a link (Google Drive, Dropbox, interactive web map URL).
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">Map File (PDF or PNG)</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">OR Map Link</label>
          <input
            type="url"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
            placeholder="https://..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consentGuidelines}
            onChange={(e) => setConsentGuidelines(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the <a href="/mapathon" className="text-emerald-700 underline">Map+ Challenge Participation Guidelines</a>. *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consentAI}
            onChange={(e) => setConsentAI(e.target.checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-700">
            I declare that no generative AI tools were used to create the map, graphics, analyses, or written descriptions in this submission. *
          </span>
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-700 text-sm">
          <p>{message}</p>
          {submissionId && <p className="mt-2 text-xs">Submission ID: {submissionId}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-700 text-white font-semibold py-3 rounded-md hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Submitting..." : "Submit Entry"}
      </button>
    </form>
  );
}
