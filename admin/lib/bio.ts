import { list, put } from "@vercel/blob";

const BIO_PATH = "content/bio.json";

export type Bio = {
  imagem: string;
  markdown: string;
  botaoLabel: string;
  botaoUrl: string;
};

export const DEFAULT_BIO: Bio = {
  imagem: "img/foto-perfil.png",
  botaoLabel: "Instagram",
  botaoUrl: "https://instagram.com/mateusalvesdzn",
  markdown: `

# Social Media, Editor de vídeo e Dev Front-End

Meu nome é **Mateus Alves**, tenho 27 anos e atuo de forma integrada nas áreas de **Social Media, Produção Audiovisual e Programação**.

## Minhas Principais Habilidades

* **Audiovisual:**
Edição de vídeos horizontais (YouTube e documentários) e verticais (Reels/Shorts/TikTok), criação de thumbnails, roteirização, narração, filmagem, Edição de imagens e criação de carrosséis. Além disso, também sou responsável pelo calendário editorial, agendamentos e publicações.
* **Tecnologia:**
Para uso particular, desenvolvolvo  aplicações simples para automação e suporte aos projetos como: postagens automáticas,
criação de imagens em massa, remover fundo de vídeos e criação de imagens e videos via código. .

---

## Experiência

Atualmente, sou o responsável por toda a presença digital e linha de produção de dois grandes projetos:

### [Fuzileiro Real](https://www.youtube.com/@fuzileiroreal) (Entretenimento militar)

 Responsável por todo o ecossistema de conteúdo, desde a captação de ideias e produção dos vídeos até a postagem final.

### [SóPapiro Podcast](https://www.youtube.com/@sopapirocast) (Entretenimento para concurseiros)

Gerenciamento completo de redes sociais, criação de materiais educativos visuais e edição do conteúdo audiovisual do canal.

---
> **Como eu trabalho?:**  Sou o profissional que faz o canal rodar nos bastidores. Crio o roteiros, faço filmagens, narrações, edito o vídeo, drio tumbnails, planejo o calendário de postagens e publico o material final por meio de automação.

---

## Ferramentas Criadas

Unindo minha experiência em programação e produção de conteúdo, desenvolvi as seguintes ferramentas:

* **SóPapiroQuestões (em desenvolvimento):**
Uma plataforma robusta focada em simulados e questões, criada com o objetivo de ser uma alternativa direta e rival de grandes portais do mercado, como o QConcursos.
* **renderWebKit (uso particular):**
Uma aplicação inovadora voltada para a automação visual, desenvolvida para gerar produções de imagens e vídeos totalmente a partir de linhas de código.
* **Img To Zoom (uso particular)**
Usada para converter imagem em vídeos com efeito de zoom. Ideal para acelerar a produção de vídeos estilo documentário onde há
um número elevado de imagens.
* **WebKitMaps(uso particular)**
Usado para criar animações de mapas nos documentários que produzo.
* **SplitSceneXML(uso particular)**
Utilizado para cortar cenas automaticamente e organiza-las por camadas. Utilizo com Adobe premiere para criar cortes de podcasts.
* **Teleprompter(uso particular)**
 Utilizado para leitura de roteiros.

`,
};

export async function getBio(): Promise<Partial<Bio>> {
  const { blobs } = await list({ prefix: BIO_PATH });
  const found = blobs.find((b) => b.pathname === BIO_PATH);
  if (!found) return {};

  const res = await fetch(found.url, { cache: "no-store" });
  if (!res.ok) return {};

  return res.json();
}

export async function saveBio(bio: Bio): Promise<void> {
  await put(BIO_PATH, JSON.stringify(bio, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
