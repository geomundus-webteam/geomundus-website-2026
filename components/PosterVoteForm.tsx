"use client";

import { useEffect, useState } from "react";
import type { Poster } from "@/lib/poster-vote";
import { submitPosterVote } from "@/lib/poster-vote-action";

const STORAGE_KEY = "poster_voted";

function Thumb({ poster, index }: { poster: Poster; index: number }) {
  const sources = [poster.thumbUrl, poster.thumbFallbackUrl].filter(Boolean) as string[];
  const [stage, setStage] = useState(0); // tries each source, then falls back to the tile
  const src = sources[stage];

  return (
    <div className="relative aspect-[3/4] bg-emerald-700 flex items-center justify-center text-white">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={poster.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setStage((s) => s + 1)}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="text-center">
          <div className="text-5xl">{poster.kind === "Image" ? "🖼️" : "📄"}</div>
          <div className="text-xl font-bold mt-1">#{index + 1}</div>
        </div>
      )}
      <span className="absolute top-2 right-2 text-xs bg-black/60 rounded-full px-3 py-1">{poster.kind ?? "Poster"}</span>
    </div>
  );
}

export default function PosterVoteForm({ posters, votingOpen }: { posters: Poster[]; votingOpen: boolean }) {
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
      const result = await submitPosterVote(choice);
      if (result.ok || result.error === "already_voted") {
        setVoted(true);
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      } else if (result.error === "closed") {
        setClosed(true);
      } else if (result.error === "not_configured" || result.error === "server_error") {
        setError("Voting could not be saved. Check the terminal for the error.");
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
        {posters.map((p, i) => {
          const selected = choice === p.id;
          return (
            <div
              key={p.id}
              className={`rounded-2xl border-2 bg-white overflow-hidden flex flex-col ${
                selected ? "border-emerald-600 ring-2 ring-emerald-200" : "border-gray-200"
              }`}
            >
              <Thumb poster={p} index={i} />
              <div className="p-4 flex flex-col gap-3 flex-1">
                <h2 className="font-semibold text-emerald-800">{p.title}</h2>
                <a
                  href={p.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm font-medium border border-emerald-700 text-emerald-700 rounded-full py-1.5 hover:bg-emerald-50"
                >
                  View full poster ↗
                </a>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setChoice(selected ? null : p.id)}
                  className={`mt-auto rounded-full py-2 font-semibold transition-colors disabled:opacity-50 ${
                    selected ? "bg-emerald-700 text-white" : "bg-amber-100 text-amber-900 hover:bg-amber-200"
                  }`}
                >
                  {selected ? "✓ My choice" : "Vote for this poster"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-white border-t shadow-lg px-4 py-3 flex flex-wrap items-center justify-center gap-4">
        <span className="font-medium text-gray-800">
          {voted ? "Thanks, your vote is in!" : closed ? "Voting is closed" : choice ? "Ready to submit" : "Choose one poster"}
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
