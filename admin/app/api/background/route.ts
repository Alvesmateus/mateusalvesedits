import { NextResponse } from "next/server";
import { getBackground, saveBackground, type BackgroundConfig } from "@/lib/background";

export async function GET() {
  const bg = await getBackground();
  return NextResponse.json(bg);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === "string" ? body.url : "";
  const type: BackgroundConfig["type"] = body?.type === "video" ? "video" : "image";

  if (!url) {
    return NextResponse.json({ error: "url é obrigatório" }, { status: 400 });
  }

  const background: BackgroundConfig = { url, type };
  await saveBackground(background);
  return NextResponse.json({ ok: true, background });
}
