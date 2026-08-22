import { isGalleryCategory } from "./categories";

export function slugify(s: string): string {
  const slug = s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  return slug || "galeria";
}

export function sanitizeFilename(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = dot > -1 ? name.slice(dot).toLowerCase() : "";
  const rawBase = dot > -1 ? name.slice(0, dot) : name;
  const base = rawBase
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .slice(0, 60);
  return `${base || "arquivo"}${ext}`;
}

export function resolveTargetDir(category: string, galleryName: string): string {
  return isGalleryCategory(category) ? `${category}${slugify(galleryName)}/` : category;
}
