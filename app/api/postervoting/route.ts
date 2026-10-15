import { NextRequest, NextResponse } from "next/server";
import { appendVote, getPosterVoting, hasVoted, MOCK, mockVotes, sheetIdFromUrl } from "@/lib/poster-vote";

const COOKIE = "poster_vote_token";

// Test mode only: GET shows the in-memory tally.
export async function GET() {
  if (!MOCK) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const counts: Record<string, number> = {};
  mockVotes.forEach((v) => (counts[v.title] = (counts[v.title] || 0) + 1));
  return NextResponse.json({ total: mockVotes.length, counts });
}

export async function POST(request: NextRequest) {
  try {
    const { choice } = await request.json();
    const { config, posters } = await getPosterVoting();

    if (!config?.votingOpen) return NextResponse.json({ error: "closed" }, { status: 403 });

    const sheetId = sheetIdFromUrl(config.sheetUrl);
    if (!sheetId) return NextResponse.json({ error: "not_configured" }, { status: 500 });

    const poster = posters.find((p) => p.id === choice);
    if (!poster) return NextResponse.json({ error: "invalid_choice" }, { status: 400 });

    const existing = request.cookies.get(COOKIE)?.value;
    if (existing && (await hasVoted(sheetId, existing))) {
      return NextResponse.json({ error: "already_voted" }, { status: 409 });
    }

    const token = existing || crypto.randomUUID();
    await appendVote(sheetId, token, poster);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (err) {
    console.error("Poster vote error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
