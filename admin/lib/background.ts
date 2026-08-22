import { list, put } from "@vercel/blob";

const BACKGROUND_PATH = "content/background.json";

export type BackgroundConfig = { url: string; type: "image" | "video" };

export const DEFAULT_BACKGROUND: BackgroundConfig = { url: "img/foto-perfil.png", type: "image" };

export async function getBackground(): Promise<BackgroundConfig> {
  const { blobs } = await list({ prefix: BACKGROUND_PATH });
  const found = blobs.find((b) => b.pathname === BACKGROUND_PATH);
  if (!found) return DEFAULT_BACKGROUND;

  const res = await fetch(`${found.url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return DEFAULT_BACKGROUND;

  const data = await res.json();
  return data && typeof data.url === "string" ? data : DEFAULT_BACKGROUND;
}

export async function saveBackground(config: BackgroundConfig): Promise<void> {
  await put(BACKGROUND_PATH, JSON.stringify(config, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}
