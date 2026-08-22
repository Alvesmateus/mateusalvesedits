import { NextResponse } from "next/server";
import { getPortfolioCards, savePortfolioCards, type PortfolioCard } from "@/lib/portfolio";

export async function GET() {
  const cards = await getPortfolioCards();
  return NextResponse.json({ cards });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.cards)) {
    return NextResponse.json({ error: "cards deve ser uma lista" }, { status: 400 });
  }

  const cards = body.cards as PortfolioCard[];
  await savePortfolioCards(cards);
  return NextResponse.json({ ok: true, cards });
}
