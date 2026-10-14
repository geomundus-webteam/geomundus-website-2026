import type { Metadata } from "next";
import { getVotingData } from "@/lib/mapathon-vote";
import VoteForm from "@/components/map-challenge-voting";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Map+ Challenge: Audience Vote" };

export default async function VotePage() {
  const { config, finalists } = await getVotingData();

  return (
    <main className="max-w-5xl mx-auto px-4 py-16 pt-24">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 text-center">
        {config?.heading || "Map+ Challenge: Audience Vote"}
      </h1>
      {config?.intro && <p className="text-center text-gray-700 mt-3 max-w-2xl mx-auto">{config.intro}</p>}

      {finalists.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">The finalists will appear here soon.</p>
      ) : (
        <VoteForm finalists={finalists} votingOpen={!!config?.votingOpen} />
      )}
    </main>
  );
}
