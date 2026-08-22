import { NextResponse } from "next/server";
import { getManifest, saveManifest, deleteBlobUrl } from "@/lib/manifest";

export async function GET() {
  const manifest = await getManifest();
  return NextResponse.json(manifest);
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const dir = typeof body?.dir === "string" ? body.dir : "";
  const url = typeof body?.url === "string" ? body.url : "";

  if (!dir || !url) {
    return NextResponse.json({ error: "dir e url são obrigatórios" }, { status: 400 });
  }

  const manifest = await getManifest();
  if (!manifest.files[dir]) {
    return NextResponse.json({ error: "não encontrado" }, { status: 404 });
  }

  manifest.files[dir] = manifest.files[dir].filter((u) => u !== url);

  try {
    await deleteBlobUrl(url);
  } catch {
    // segue mesmo se o blob já não existir
  }

  // se a pasta ficou vazia e é uma subpasta de galeria, remove dos registros
  const segments = dir.split("/").filter(Boolean);
  if (manifest.files[dir].length === 0 && segments.length > 1) {
    delete manifest.files[dir];
    const parent = segments.slice(0, -1).join("/") + "/";
    if (manifest.subdirs[parent]) {
      manifest.subdirs[parent] = manifest.subdirs[parent].filter((d) => d !== dir);
    }
  }

  await saveManifest(manifest);
  return NextResponse.json({ ok: true, manifest });
}
