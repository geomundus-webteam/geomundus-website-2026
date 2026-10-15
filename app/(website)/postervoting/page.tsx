import type { Metadata } from "next";
import { getPosterVoting } from "@/lib/poster-vote";
import PosterVoteForm from "@/components/PosterVoteForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Poster Award: Audience Vote",
  // Keeps the page out of Google while you test. Remove this line when you go public.
  robots: { index: false, follow: false },
};

export default async function PosterVotePage() {
  const { config, posters, error } = await getPosterVoting();

  return (
    <main className="max-w-5xl mx-auto px-4 py-24">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 text-center">
        {config?.heading || "Poster Award: Audience Vote"}
      </h1>
      {config?.intro && <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">{config.intro}</p>}

      {error ? (
        <p className="text-center text-red-600 mt-10">
          The posters could not be loaded. Please try again in a moment.
        </p>
      ) : posters.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">The posters will appear here soon.</p>
      ) : (
        <PosterVoteForm posters={posters} votingOpen={!!config?.votingOpen} />
      )}
    </main>
  );
}
