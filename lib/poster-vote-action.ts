"use server";

import { cookies } from "next/headers";
import { appendVote, getPosterVoting, hasVoted, sheetIdFromUrl } from "@/lib/poster-vote";

const COOKIE = "poster_vote_token";

// Called directly from the form. A server action has no URL, so it cannot 404.
export async function submitPosterVote(choice: string): Promise<{ ok?: true; error?: string }> {
  try {
    const { config, posters } = await getPosterVoting();
    if (!config?.votingOpen) return { error: "closed" };

    const sheetId = sheetIdFromUrl(config.sheetUrl);
    if (!sheetId) return { error: "not_configured" };

    const poster = posters.find((p) => p.id === choice);
    if (!poster) return { error: "invalid_choice" };

    const jar = await cookies();
    const existing = jar.get(COOKIE)?.value;
    if (existing && (await hasVoted(sheetId, existing))) return { error: "already_voted" };

    const token = existing || crypto.randomUUID();
    await appendVote(sheetId, token, poster);

    jar.set(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return { ok: true };
  } catch (err) {
    console.error("Poster vote error:", err);
    return { error: "server_error" };
  }
}
