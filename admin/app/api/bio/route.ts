import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getBio, saveBio, DEFAULT_BIO, type Bio } from "@/lib/bio";

export async function GET() {
  const bio = await getBio();
  return NextResponse.json({ ...DEFAULT_BIO, ...bio });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const markdown = String(form.get("markdown") ?? "");
  const botaoLabel = String(form.get("botaoLabel") ?? "");
  const botaoUrl = String(form.get("botaoUrl") ?? "");
  const imagemAtual = String(form.get("imagemAtual") ?? "");
  const photo = form.get("photo");

  let imagem = imagemAtual || DEFAULT_BIO.imagem;

  if (photo instanceof File && photo.size > 0) {
    const dot = photo.name.lastIndexOf(".");
    const ext = dot > -1 ? photo.name.slice(dot).toLowerCase() : "";
    const blob = await put(`content/bio-photo${ext}`, photo, {
      access: "public",
      contentType: photo.type || undefined,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    imagem = blob.url;
  }

  const bio: Bio = {
    imagem,
    markdown: markdown || DEFAULT_BIO.markdown,
    botaoLabel: botaoLabel || DEFAULT_BIO.botaoLabel,
    botaoUrl: botaoUrl || DEFAULT_BIO.botaoUrl,
  };

  await saveBio(bio);
  return NextResponse.json({ ok: true, bio });
}
