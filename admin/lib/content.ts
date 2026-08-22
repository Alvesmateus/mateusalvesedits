import { list, put } from "@vercel/blob";

const CONTENT_PATH = "content/site-content.json";

export type SiteContent = {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  instagramHandle: string;
  linkedinName: string;
  email: string;
  facebookName: string;
  whatsappNumber: string;
  siteTitle: string;
  sectionHeading: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  showMoreLabel: string;
};

export const DEFAULT_CONTENT: SiteContent = {
  heroTitleLine1: "Mateus Alves,",
  heroTitleLine2: "27 anos.",
  heroSubtitle: "Editor de Vídeos, Social Média, Filmaker e Programador.",
  instagramHandle: "@mateusalvesdzn",
  linkedinName: "Mateus Alves",
  email: "mateusalves.flu@gmail.com",
  facebookName: "Mateus Alves",
  whatsappNumber: "21973042881",
  siteTitle: "Meu Portfólio",
  sectionHeading: "Conteúdos por Plataforma",
  searchPlaceholder: "o que você precisa saber?",
  searchButtonLabel: "Pesquisar",
  showMoreLabel: "Mostrar mais",
};

export async function getContent(): Promise<Partial<SiteContent>> {
  const { blobs } = await list({ prefix: CONTENT_PATH });
  const found = blobs.find((b) => b.pathname === CONTENT_PATH);
  if (!found) return {};

  const res = await fetch(found.url, { cache: "no-store" });
  if (!res.ok) return {};

  return res.json();
}

export async function saveContent(content: SiteContent): Promise<void> {
  await put(CONTENT_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
