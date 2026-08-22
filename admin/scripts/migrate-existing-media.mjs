// Script único: sobe as mídias já existentes em /public para o Vercel Blob,
// registrando-as no admin-manifest.json para que fiquem gerenciáveis
// (apagar/reordenar/adicionar) pelo painel admin.
//
// Rodar de dentro de admin/:
//   node --env-file=.env.local scripts/migrate-existing-media.mjs

import { list, put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "..", "public");
const MANIFEST_PATH = "manifest/admin-manifest.json";

const FILE_DIRS = ["youtube-videos/", "youtube-shorts/", "instagram-feed/", "instagram-post/"];
const SUBDIR_DIRS = ["carrossel-square/", "carrossel-vertical/", "carrossel-horizontal/", "youtube-tumbnail/"];
const EXT = /\.(png|jpe?g|svg|webp|gif|avif|mp4|webm|ogg|mov)$/i;

function listFiles(rel) {
  const abs = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs).filter((f) => EXT.test(f)).sort().map((f) => rel + f);
}

function listSubdirs(rel) {
  const abs = path.join(PUBLIC_DIR, rel);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()
    .map((d) => rel + d + "/");
}

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
  });
}

async function uploadDir(dir, manifest) {
  const relFiles = listFiles(dir);
  if (!relFiles.length) return;

  const urls = [];
  for (const relFile of relFiles) {
    const abs = path.join(PUBLIC_DIR, relFile);
    const buf = fs.readFileSync(abs);
    const pathname = `${dir}${sanitizeFilename(path.basename(relFile))}`;
    const blob = await put(pathname, buf, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    urls.push(blob.url);
    console.log("  ok:", pathname);
  }
  manifest.files[dir] = urls;
}

async function main() {
  const manifest = await getManifest();

  console.log("Migrando categorias diretas...");
  for (const dir of FILE_DIRS) {
    console.log(dir);
    await uploadDir(dir, manifest);
  }

  console.log("Migrando galerias...");
  for (const parent of SUBDIR_DIRS) {
    const subs = listSubdirs(parent);
    if (subs.length) {
      const existing = new Set(manifest.subdirs[parent] || []);
      subs.forEach((s) => existing.add(s));
      manifest.subdirs[parent] = Array.from(existing);
    }
    for (const sub of subs) {
      console.log(sub);
      await uploadDir(sub, manifest);
    }
  }

  await saveManifest(manifest);
  console.log("Manifesto salvo no Blob com sucesso.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
