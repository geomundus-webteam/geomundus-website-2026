"use client";

import { useEffect, useState } from "react";
import type { Finalist } from "@/lib/mapathon-vote";

const STORAGE_KEY = "mapathon_voted";

function Cover({ f, index, kind }: { f: Finalist; index: number; kind: string }) {
  const [failed, setFailed] = useState(false);

  // 1) thumbnail uploaded in Sanity, 2) the image file itself,
  // 3) automatic screenshot for interactive map links (best effort), 4) icon tile
  let src: string | undefined;
  if (f.thumbnailUrl) {
    src = f.thumbnailUrl.startsWith("https://cdn.sanity.io")
      ? `${f.thumbnailUrl}?w=800&auto=format`
      : f.thumbnailUrl;
  } else if (f.fileMime?.startsWith("image/") && f.fileUrl) {
    src = f.fileUrl;
  } else if (f.mapLink && !f.fileUrl) {
    src = `https://api.microlink.io/?url=${encodeURIComponent(f.mapLink)}&screenshot=true&meta=false&embed=screenshot.url`;
  }

  const icon = kind === "PDF" ? "📄" : kind === "Image" ? "🖼️" : "🌐";

  return (
    <div className="relative aspect-[4/3] bg-emerald-700 flex items-center justify-center text-white">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={f.mapTitle}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="text-center">
          <div className="text-5xl">{icon}</div>
          <div className="text-xl font-bold mt-1">#{index + 1}</div>
        </div>
      )}
      <span className="absolute top-2 right-2 text-xs bg-black/60 rounded-full px-3 py-1">{kind}</span>
    </div>
  );
}

export default function VoteForm({ finalists, votingOpen }: { finalists: Finalist[]; votingOpen: boolean }) {
  const [choice, setChoice] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const [closed, setClosed] = useState(!votingOpen);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setVoted(true);
    } catch {}
  }, []);

  async function submit() {
    if (!choice) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/mapathon/mapvoting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice }),
      });
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // Server answered, but not with JSON (e.g. a 404 or a crash page)
        setError(`Server error (HTTP ${res.status}). Check the terminal for details.`);
        return;
      }
      if (res.ok || data.error === "already_voted") {
        setVoted(true);
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      } else if (data.error === "closed") {
        setClosed(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("No connection. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const disabled = voted || closed;

  return (
    <div className="mt-8 pb-28">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {finalists.map((f, i) => {
          const href = f.fileUrl || f.mapLink;
          const isImage = f.fileMime?.startsWith("image/");
          const kind = isImage ? "Image" : f.fileMime === "application/pdf" ? "PDF" : "Interactive map";
          const selected = choice === f._id;
          return (
            <div
              key={f._id}
              className={`rounded-2xl border-2 bg-white overflow-hidden flex flex-col ${
                selected ? "border-emerald-600 ring-2 ring-emerald-200" : "border-gray-200"
              }`}
            >
              <Cover f={f} index={i} kind={kind} />
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <h2 className="font-semibold text-emerald-800">{f.mapTitle}</h2>
                  <p className="text-sm text-gray-600">{f.authors}</p>
                </div>
                {href && (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                     className="text-center text-sm font-medium border border-emerald-700 text-emerald-700 rounded-full py-1.5 hover:bg-emerald-50">
                    View full map ↗
                  </a>
                )}
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setChoice(selected ? null : f._id)}
                  className={`mt-auto rounded-full py-2 font-semibold transition-colors disabled:opacity-50 ${
                    selected ? "bg-emerald-700 text-white" : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                  }`}
                >
                  {selected ? "✓ My choice" : "Vote for this map"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg px-4 py-3 flex flex-wrap items-center justify-center gap-4">
        <span className="font-medium text-gray-800">
          {voted ? "Thanks, your vote is in!" : closed ? "Voting is closed" : choice ? "Ready to submit" : "Choose one map"}
        </span>
        {error && <span className="text-sm text-red-600">{error}</span>}
        {!disabled && (
          <button
            onClick={submit}
            disabled={!choice || loading}
            className="bg-emerald-700 text-white font-semibold px-8 py-2.5 rounded-full hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit vote"}
          </button>
        )}
      </div>
    </div>
  );
}
