import { NextResponse } from "next/server";
import { getContent, saveContent, DEFAULT_CONTENT, type SiteContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json({ ...DEFAULT_CONTENT, ...content });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "corpo inválido" }, { status: 400 });
  }

  const merged: SiteContent = { ...DEFAULT_CONTENT };
  for (const key of Object.keys(DEFAULT_CONTENT) as (keyof SiteContent)[]) {
    if (typeof body[key] === "string" && body[key].trim()) {
      merged[key] = body[key];
    }
  }

  await saveContent(merged);
  return NextResponse.json({ ok: true, content: merged });
}
