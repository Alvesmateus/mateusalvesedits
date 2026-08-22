import { list, put, del } from "@vercel/blob";

const MANIFEST_PATH = "manifest/admin-manifest.json";

export type Manifest = {
  files: Record<string, string[]>;
  subdirs: Record<string, string[]>;
};

const EMPTY_MANIFEST: Manifest = { files: {}, subdirs: {} };

export async function getManifest(): Promise<Manifest> {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const found = blobs.find((b) => b.pathname === MANIFEST_PATH);
  if (!found) return { files: {}, subdirs: {} };

  // cache-busting: o CDN do Blob cacheia por URL exata, então uma leitura logo
  // após uma escrita pode retornar uma versão velha e causar corrida entre
  // operações (ex: apagar A, depois apagar B, e B "ressuscitar" A).
  const res = await fetch(`${found.url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return { files: {}, subdirs: {} };

  const data = await res.json();
  return {
    files: data.files || {},
    subdirs: data.subdirs || {},
  };
}

export async function saveManifest(manifest: Manifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    // mínimo permitido pela Blob; sem isso o padrão é 30 dias e edições
    // (apagar/reordenar/adicionar) demoram a aparecer.
    cacheControlMaxAge: 60,
  });
}

export async function deleteBlobUrl(url: string): Promise<void> {
  await del(url);
}

export { EMPTY_MANIFEST };
