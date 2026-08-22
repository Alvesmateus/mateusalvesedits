// Script único: sobe as imagens de public/artes/ pro Vercel Blob e as
// registra no admin-manifest.json, sem tocar nas demais pastas já migradas.
//
// Rodar de dentro de admin/:
//   node --env-file=.env.local scripts/migrate-artes.mjs

import { list, put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "..", "public");
const MANIFEST_PATH = "manifest/admin-manifest.json";
const DIR = "artes/";
const EXT = /\.(png|jpe?g|svg|webp|gif|avif|mp4|webm|ogg|mov)$/i;

function sanitizeFilename(name) {
  const dot = name.lastIndexOf(".");
  const ext = dot > -1 ? name.slice(dot).toLowerCase() : "";
  const base = (dot > -1 ? name.slice(0, dot) : name)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .slice(0, 60);
  return `${base || "arquivo"}${ext}`;
}

async function getManifest() {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const found = blobs.find((b) => b.pathname === MANIFEST_PATH);
  if (!found) return { files: {}, subdirs: {} };
  const res = await fetch(found.url, { cache: "no-store" });
  if (!res.ok) return { files: {}, subdirs: {} };
  const data = await res.json();
  return { files: data.files || {}, subdirs: data.subdirs || {} };
}

async function saveManifest(manifest) {
  await put(MANIFEST_PATH, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

async function main() {
  const abs = path.join(PUBLIC_DIR, DIR);
  const files = fs.readdirSync(abs).filter((f) => EXT.test(f)).sort();

  const manifest = await getManifest();
  const urls = [];
  for (const f of files) {
    const buf = fs.readFileSync(path.join(abs, f));
    const pathname = `${DIR}${sanitizeFilename(f)}`;
    const blob = await put(pathname, buf, { access: "public", addRandomSuffix: false, allowOverwrite: true });
    urls.push(blob.url);
    console.log("ok:", pathname);
  }
  manifest.files[DIR] = urls;

  await saveManifest(manifest);
  console.log("Manifesto salvo com sucesso.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
