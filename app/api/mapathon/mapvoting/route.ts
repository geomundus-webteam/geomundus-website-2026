import { NextRequest, NextResponse } from "next/server";
import { appendVote, getVotingData, hasVoted, MOCK, mockVotes, sheetIdFromUrl } from "@/lib/mapathon-vote";

const COOKIE = "mapathon_vote_token";

// Test mode only: GET /api/mapathon/vote shows the in-memory tally.
export async function GET() {
  if (!MOCK) return NextResponse.json({ error: "not_found" }, { status: 404 });
  const counts: Record<string, number> = {};
  mockVotes.forEach((v) => (counts[v.title] = (counts[v.title] || 0) + 1));
  return NextResponse.json({ total: mockVotes.length, counts });
}

export async function POST(request: NextRequest) {
  try {
    const { choice } = await request.json();
    const { config, finalists } = await getVotingData();

    if (!config?.votingOpen) return NextResponse.json({ error: "closed" }, { status: 403 });

    const sheetId = sheetIdFromUrl(config.sheetUrl);
    if (!sheetId) return NextResponse.json({ error: "not_configured" }, { status: 500 });

    const finalist = finalists.find((f) => f._id === choice);
    if (!finalist) return NextResponse.json({ error: "invalid_choice" }, { status: 400 });

    const existing = request.cookies.get(COOKIE)?.value;
    if (existing && (await hasVoted(sheetId, existing))) {
      return NextResponse.json({ error: "already_voted" }, { status: 409 });
    }

    const token = existing || crypto.randomUUID();
    await appendVote(sheetId, token, finalist);

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, token, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
    return res;
  } catch (err) {
    console.error("Vote error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}