import { list, put } from "@vercel/blob";

const PORTFOLIO_PATH = "content/portfolio-cards.json";

export type PortfolioPill = { texto: string; img?: string };

export type PortfolioCard = {
  id: string;
  titulo: string;
  subtitulo: string;
  icone: string;
  from: string;
  to: string;
  tab: string;
  fullWidth: boolean;
  iconFolder: string;
  socialAnim: boolean;
  pillCorner: "" | "top-right";
  iconPills: PortfolioPill[];
  markdown: string;
};

export const DEFAULT_PORTFOLIO_CARDS: PortfolioCard[] = [
  {
    id: "apps-e-skils",
    titulo: "Habilidades e Formação",
    subtitulo: "Softwares que utilizo no meu dia-dia.",
    icone: "fa-solid fa-screwdriver-wrench",
    from: "#7c3aed",
    to: "#312e81",
    tab: "#a78bfa",
    fullWidth: true,
    iconFolder: "icons/softwares/",
    socialAnim: true,
    pillCorner: "top-right",
    iconPills: [
      { texto: "Photoshop", img: "icons/softwares/photshop.png" },
      { texto: "Illustrator", img: "icons/softwares/illustrator.png" },
      { texto: "InDesign", img: "icons/softwares/indesign.png" },
      { texto: "After Effects", img: "icons/softwares/aftereffects.png" },
      { texto: "Premiere", img: "icons/softwares/premire.png" },
      { texto: "Audition", img: "icons/softwares/audition.png" },
      { texto: "Canva", img: "icons/softwares/canva.png" },
      { texto: "CapCut", img: "icons/softwares/capcut.png" },
      { texto: "Inkscape", img: "icons/softwares/inkscape.png" },
      { texto: "Affinity", img: "icons/softwares/affinity.png" },
      { texto: "Moho Studio", img: "icons/softwares/Moho.png" },
    ],
    markdown: `

## Edição de Imagem - posts, capas e thumbnails

* **Photoshop** — Edição e composição de imagens
* **InDesign** — Diagramação e materiais impressos
* **Inkscape** — Vetores e ilustrações. Substitui Corel Draw e Illustrator.
* **Affinity** — Photoshop + Illustrator + InDesign. Tudo em um!

---

## Edição de Vídeo - Reels, Shorts e cortes de podcast

* **Premiere Pro** — Edição de vídeo profissional
* **After Effects** — Motion graphics e VFX
* **CapCut** — Edição ágil para redes sociais
* **Moho Studio** — Animação 2D avançada com rigging e física
* **Canva** — Criação rápida e colaborativa

---

## Posts Automáticos

* **Buffer**
* **Canva**
---

## Inteligência Artificial (IA) e Criação Rápida

* **Canva** — Criação rápida e colaborativa
* **Claude** — Programação
* **Gemini** — Edição de imagem e programação simples
* **Grok** — Geração de vídeos com áudio
* **Meta I.A** — Geração de vídeos
* **ChatGPT** — Edição de imagem e programação simples
* **Codex** — Programação
* **Antigravity** — Programação


*(Nota: Como o Canva é uma ferramenta híbrida que hoje integra automações e ferramentas fortes de IA para criação rápida, ele foi encaixado nesta última categoria para atender à sua divisão!).*

---

`,
  },
];

export async function getPortfolioCards(): Promise<PortfolioCard[]> {
  const { blobs } = await list({ prefix: PORTFOLIO_PATH });
  const found = blobs.find((b) => b.pathname === PORTFOLIO_PATH);
  if (!found) return DEFAULT_PORTFOLIO_CARDS;

  const res = await fetch(`${found.url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return DEFAULT_PORTFOLIO_CARDS;

  const data = await res.json();
  // Uma lista vazia salva de propósito (ex: remover todos os cards) deve
  // ser respeitada — só cai no padrão se o arquivo nunca foi salvo.
  return Array.isArray(data.cards) ? data.cards : DEFAULT_PORTFOLIO_CARDS;
}

export async function savePortfolioCards(cards: PortfolioCard[]): Promise<void> {
  await put(PORTFOLIO_PATH, JSON.stringify({ cards }, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}
