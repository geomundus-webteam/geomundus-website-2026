import Link from "next/link";
import { getVotingData } from "@/lib/mapathon-vote";

/**
 * Button that leads to the voting page.
 * Server component: it reads the "Voting open" switch from Sanity,
 * so the button appears automatically when you turn voting on.
 *
 * <VoteButton />                  -> shown only while voting is open
 * <VoteButton showWhenClosed />   -> always shown (disabled look when closed)
 */
export default async function VoteButton({ showWhenClosed = false }: { showWhenClosed?: boolean }) {
  const { config } = await getVotingData();
  const open = !!config?.votingOpen;

  if (!open && !showWhenClosed) return null;

  if (!open) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-gray-200 px-8 py-3 font-semibold text-gray-500 cursor-not-allowed">
        🗳️ Voting opens soon
      </span>
    );
  }

  return (
    <Link
      href="/mapathon/vote"
      className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white shadow-md transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
    >
      🗳️ Vote for your favorite map
    </Link>
  );
}
