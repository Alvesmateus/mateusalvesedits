import { NextResponse } from "next/server";
import { getManifest, saveManifest } from "@/lib/manifest";
import { ALL_CATEGORIES, isGalleryCategory } from "@/lib/categories";
import { resolveTargetDir } from "@/lib/uploadPath";

// Chamada pelo navegador depois que os arquivos já foram enviados direto pro
// Blob (via /api/upload). Só registra as URLs no manifesto.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const category = typeof body?.category === "string" ? body.category : "";
  const galleryName = typeof body?.galleryName === "string" ? body.galleryName : "";
  const urls = Array.isArray(body?.urls) ? (body.urls as unknown[]) : null;

  const categoryDef = ALL_CATEGORIES.find((c) => c.key === category);
  if (!categoryDef) {
    return NextResponse.json({ error: "Categoria inválida" }, { status: 400 });
  }
  if (!urls || !urls.every((u) => typeof u === "string") || urls.length === 0) {
    return NextResponse.json({ error: "urls é obrigatório" }, { status: 400 });
  }

  const isGallery = isGalleryCategory(category);
  if (isGallery && !galleryName.trim()) {
    return NextResponse.json({ error: "Nome da galeria é obrigatório" }, { status: 400 });
  }

  const targetDir = resolveTargetDir(category, galleryName);

  const manifest = await getManifest();
  manifest.files[targetDir] = (manifest.files[targetDir] || []).concat(urls as string[]);

  if (isGallery) {
    manifest.subdirs[category] = manifest.subdirs[category] || [];
    if (!manifest.subdirs[category].includes(targetDir)) {
      manifest.subdirs[category].push(targetDir);
    }
  }

  await saveManifest(manifest);
  return NextResponse.json({ ok: true, targetDir, manifest });
}
