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

// Reordena os itens de uma pasta (drag/mover não é usado; recebe a lista completa na nova ordem)
export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  const dir = typeof body?.dir === "string" ? body.dir : "";
  const order = Array.isArray(body?.order) ? (body.order as unknown[]) : null;

  if (!dir || !order || !order.every((u) => typeof u === "string")) {
    return NextResponse.json({ error: "dir e order são obrigatórios" }, { status: 400 });
  }

  const manifest = await getManifest();
  const current = manifest.files[dir];
  if (!current) {
    return NextResponse.json({ error: "não encontrado" }, { status: 404 });
  }

  const newOrder = order as string[];
  const sameSet =
    current.length === newOrder.length && current.every((u) => newOrder.includes(u));
  if (!sameSet) {
    return NextResponse.json({ error: "lista de reordenação inválida" }, { status: 400 });
  }

  manifest.files[dir] = newOrder;
  await saveManifest(manifest);
  return NextResponse.json({ ok: true, manifest });
}
