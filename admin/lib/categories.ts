export type Category = {
  key: string;
  label: string;
  rede: string;
  accept: string;
};

// Categorias que recebem arquivos diretamente (uma pasta = uma lista de mídias)
export const FILE_CATEGORIES: Category[] = [
  { key: "youtube-videos/", label: "YouTube - Vídeo Horizontal", rede: "YouTube", accept: "video/*" },
  { key: "youtube-shorts/", label: "YouTube - Shorts", rede: "YouTube", accept: "video/*" },
  { key: "instagram-feed/", label: "Instagram - Feed", rede: "Instagram", accept: "image/*,video/*" },
  { key: "instagram-post/", label: "Instagram - Post", rede: "Instagram", accept: "image/*,video/*" },
];

// Categorias que agrupam mídias em galerias/carrosséis (subpastas)
export const GALLERY_CATEGORIES: Category[] = [
  { key: "carrossel-square/", label: "Instagram - Carrossel Quadrado", rede: "Instagram", accept: "image/*" },
  { key: "carrossel-vertical/", label: "Instagram - Carrossel Vertical", rede: "Instagram", accept: "image/*" },
  { key: "carrossel-horizontal/", label: "YouTube - Carrossel Horizontal", rede: "YouTube", accept: "image/*" },
  { key: "youtube-tumbnail/", label: "YouTube - Thumbnail", rede: "YouTube", accept: "image/*" },
];

export const ALL_CATEGORIES: Category[] = [...FILE_CATEGORIES, ...GALLERY_CATEGORIES];

export function isGalleryCategory(key: string): boolean {
  return GALLERY_CATEGORIES.some((c) => c.key === key);
}

export function findCategory(key: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.key === key);
}

// Dado um diretório de manifesto (ex: "carrossel-square/minha-galeria/"),
// descobre a categoria de upload e o nome de galeria (se houver) para
// permitir adicionar mais itens diretamente a essa pasta.
export function resolveDirTarget(dir: string): { category: string; galleryName: string | null } {
  const direct = FILE_CATEGORIES.find((c) => c.key === dir);
  if (direct) return { category: direct.key, galleryName: null };

  const gallery = GALLERY_CATEGORIES.find((c) => dir.startsWith(c.key) && dir !== c.key);
  if (gallery) {
    const galleryName = dir.slice(gallery.key.length).replace(/\/$/, "");
    return { category: gallery.key, galleryName };
  }

  return { category: dir, galleryName: null };
}
