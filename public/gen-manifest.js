const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const EXT = /\.(png|jpe?g|svg|webp|gif|avif|mp4|webm|ogg|mov)$/i;

// pastas que contêm arquivos diretamente
const FILE_DIRS = [
  "youtube-videos/",
  "youtube-shorts/",
  "instagram-feed/",
  "instagram-post/",
];

// pastas que contêm subpastas (cada subpasta = carrossel/galeria)
const SUBDIR_DIRS = [
  "carrossel-square/",
  "carrossel-vertical/",
  "carrossel-horizontal/",
  "youtube-tumbnail/",
];

function listFiles(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs)
    .filter(f => EXT.test(f))
    .sort()
    .map(f => rel + f);
}

function listSubdirs(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()
    .map(d => rel + d + "/");
}

const files = {};
const subdirs = {};

for (const d of FILE_DIRS) files[d] = listFiles(d);

for (const parent of SUBDIR_DIRS) {
  const subs = listSubdirs(parent);
  subdirs[parent] = subs;
  for (const s of subs) files[s] = listFiles(s);
}

const out = "window.MEDIA_MANIFEST = " + JSON.stringify({ files, subdirs }, null, 2) + ";\n";
fs.writeFileSync(path.join(ROOT, "media-manifest.js"), out);
console.log("manifest regenerado");
