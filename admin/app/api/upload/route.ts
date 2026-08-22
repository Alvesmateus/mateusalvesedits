import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getManifest, saveManifest } from "@/lib/manifest";
import { ALL_CATEGORIES, isGalleryCategory } from "@/lib/categories";

function slugify(s: string): string {
  const slug = s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return slug || "galeria";
}

function sanitizeFilename(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot > -1 ? name.slice(dot).toLowerCase() : "";
  const rawBase = dot > -1 ? name.slice(0, dot) : name;
  const base = rawBase
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .slice(0, 60);
  return `${Date.now()}-${base || "arquivo"}${ext}`;
}

export async function POST(request: Request) {
  const form = await request.formData();
  const category = String(form.get("category") || "");
  const galleryNameRaw = form.get("galleryName");
  const galleryName = typeof galleryNameRaw === "string" ? galleryNameRaw.trim() : "";
  const files = form.getAll("files").filter((f): f is File => f instanceof File);

  const categoryDef = ALL_CATEGORIES.find((c) => c.key === category);
  if (!categoryDef) {
    return NextResponse.json({ error: "Categoria inválida" }, { status: 400 });
  }

  const isGallery = isGalleryCategory(category);
  if (isGallery && !galleryName) {
    return NextResponse.json({ error: "Nome da galeria é obrigatório" }, { status: 400 });
  }
  if (!files.length) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  const targetDir = isGallery ? `${category}${slugify(galleryName)}/` : category;

  const manifest = await getManifest();
  manifest.files[targetDir] = manifest.files[targetDir] || [];

  for (const file of files) {
    const pathname = `${targetDir}${sanitizeFilename(file.name)}`;
    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type || undefined,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    manifest.files[targetDir].push(blob.url);
  }

  if (isGallery) {
    manifest.subdirs[category] = manifest.subdirs[category] || [];
    if (!manifest.subdirs[category].includes(targetDir)) {
      manifest.subdirs[category].push(targetDir);
    }
  }

  await saveManifest(manifest);

  return NextResponse.json({ ok: true, targetDir, manifest });
}
