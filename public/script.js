// SOCIAL MENU TOGGLE
const floatContainer  = document.getElementById("floatContainer");
const socialOverlay   = document.getElementById("socialOverlay");
const contactTags     = document.querySelectorAll(".contact-tag");
const allFiBtns       = document.querySelectorAll(".fi-btn");
let menuOpen = false;

function openMenu(){
  menuOpen = true;
  floatContainer.classList.add("menu-open");
  socialOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  const tags = [...contactTags].reverse();
  tags.forEach((tag, i) => {
    tag.style.transitionDelay = (0.3 + i * 0.07) + "s";
  });
}

function closeMenu(){
  menuOpen = false;
  contactTags.forEach(tag => tag.style.transitionDelay = "0s");
  floatContainer.classList.remove("menu-open");
  socialOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

allFiBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menuOpen ? closeMenu() : openMenu();
  });
});

socialOverlay.addEventListener("click", closeMenu);

const itensPortfolio = [
  {
    titulo:"Apps e Skils",
    subtitulo:"Softwares que utilizo no meu dia-dia.",
    icone:"fa-solid fa-screwdriver-wrench",
    from:"#7c3aed",
    to:"#312e81",
    tab:"#a78bfa",
    fullWidth:true,
    iconFolder:"icons/softwares/",
    iconPills:[
      { img:"icons/softwares/photshop.png",      texto:"Photoshop"      },
      { img:"icons/softwares/illustrator.png",   texto:"Illustrator"    },
      { img:"icons/softwares/indesign.png",      texto:"InDesign"       },
      { img:"icons/softwares/aftereffects.png",  texto:"After Effects"  },
      { img:"icons/softwares/premire.png",       texto:"Premiere"       },
      { img:"icons/softwares/audition.png",      texto:"Audition"       },
      { img:"icons/softwares/canva.png",         texto:"Canva"          },
      { img:"icons/softwares/capcut.png",        texto:"CapCut"         },
      { img:"icons/softwares/inkscape.png",      texto:"Inkscape"       },
      { img:"icons/softwares/affinity.png",      texto:"Affinity"       },
      { img:"icons/softwares/Moho.png",          texto:"Moho Studio"    },
    ],
    socialAnim:true,
    pillCorner:"top-right",
    conteudo:{
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

## Edição de Áudio - Aumentar músicas

* **Audition** — Edição e tratamento de áudio para vídeos e podcasts

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

## **Programação** — \`Python\` e \`JavaScript\` para criar ferramentas próprias

* **SóPapiro Questões (em desenvolvimento)** — Alternativa ao Qconcursos.
* **RenderWebKit Uso Particular)** — Criação rápida de imagens, carrosseis e vídeos em lote com html, css e javascript.
* **Img To Zoom Uso Particular)** — Criação de vídeos com efeito de zoom automaticamente a partir de uma imagem.
* **RenderMaps (Uso Particular)** — Criação de mapas animados para ser usado em vídeos.
* **Remoção de fundo de Vídeos (Uso Particular)** — Utilizo essa ferramenta para remover fundo de videos. Muito usado para criar rodapé de vídeos e nomes e títulos animados.
* **Teleprompter(uso particular)** 
 Utilizado para leitura de roteiros.



---

`,
 
    }
  },
];

const portfolioGrid = document.getElementById("portfolioGrid");

itensPortfolio.forEach((item) => {
  const wrapper = document.createElement("div");
  wrapper.className = "folder-wrapper";
  if (item.fullWidth) wrapper.classList.add("full-width");
  wrapper.style.setProperty("--from", item.from);
  wrapper.style.setProperty("--to", item.to);
  wrapper.style.setProperty("--tab", item.tab);

  const card = document.createElement("div");
  card.className = "folder-card";
  const titleTop = item.socialAnim && !item.pillCorner;
  if (titleTop) card.classList.add("title-top");
  card.innerHTML = `
    <div class="relative z-10 flex h-full flex-col ${titleTop ? "justify-start" : "justify-center"}">
      <h3 class="folder-title text-white drop-shadow">${item.titulo}</h3>
      <span class="folder-subtitle mt-1 block text-white/85">${item.subtitulo}</span>
    </div>
  `;

  if (item.iconFolder) {
    const iconsBack = document.createElement("div");
    iconsBack.className = "folder-icons-back";
    wrapper.appendChild(iconsBack);
    carregarSoftwareIcons(iconsBack, item.iconFolder, false);
  }

  if (item.iconPills && item.socialAnim) {
    // mesmo estilo do card IA: uma pill por vez com fade, centralizada, sem flutuar
    const pillsFront = document.createElement("div");
    pillsFront.className = "folder-icons-front fade-cycle pills";
    if (item.pillCorner === "top-right") pillsFront.classList.add("corner-tr");
    const pills = item.iconPills.map((entry) => {
      const pill = document.createElement("span");
      pill.className = "folder-pill";
      if (typeof entry === "object") {
        if (entry.img) {
          const ico = document.createElement("img");
          ico.src = entry.img;
          ico.loading = "lazy";
          ico.className = "folder-pill-ico";
          pill.appendChild(ico);
        }
        pill.appendChild(document.createTextNode(entry.texto || ""));
      } else {
        pill.textContent = entry;
      }
      pillsFront.appendChild(pill);
      return pill;
    });
    wrapper.appendChild(pillsFront);
    if (pills.length) {
      let atual = 0;
      pills[0].classList.add("is-active");
      setInterval(() => {
        pills[atual].classList.remove("is-active");
        atual = (atual + 1) % pills.length;
        pills[atual].classList.add("is-active");
      }, 1600);
    }
  } else if (item.iconPills) {
    const pillsBack = document.createElement("div");
    pillsBack.className = "folder-pills-back";
    const durations = [2.3, 3.1, 2.7, 3.6, 2.9];
    const delays    = [0, -1.1, -0.5, -1.8, -0.9];
    // posições espalhadas/sobrepostas, centralizadas na faixa superior
    const posicoes = [
      { left: 50, top: -2 },
      { left: 24, top: -10 },
      { left: 72, top: 6  },
      { left: 14, top: 12 },
      { left: 60, top: 14 },
      { left: 38, top: 18 },
    ];
    item.iconPills.forEach((texto, i) => {
      const pill = document.createElement("span");
      pill.className = "folder-pill";
      if (texto.includes("\n")) {
        pill.classList.add("multi");
        pill.innerHTML = texto.split("\n").map(l =>
          l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
        ).join("<br>");
      } else {
        pill.textContent = texto;
      }
      const pos = posicoes[i % posicoes.length];
      pill.style.left = pos.left + "%";
      pill.style.top  = pos.top + "px";
      pill.style.setProperty("--amp", (26 + (i % 3) * 10) + "px");
      pill.style.animationDuration = durations[i % durations.length] + "s";
      pill.style.animationDelay    = delays[i % delays.length] + "s";
      pillsBack.appendChild(pill);
    });
    wrapper.appendChild(pillsBack);
  }

  wrapper.appendChild(card);

  portfolioGrid.appendChild(wrapper);

  wrapper.addEventListener("click", () => abrirPasta(item, wrapper));
});

const folderPanel = document.getElementById("folderPanel");

function fecharPasta(){
  folderPanel.classList.remove("panel-open");
  document.body.style.overflow = "";
  setTimeout(() => { folderPanel.innerHTML = ""; }, 400);
}

// fecha ao clicar no fundo escuro (fora da mini-page)
folderPanel.addEventListener("click", (e) => {
  if (e.target === folderPanel) fecharPasta();
});

// Abre imagem em tela cheia
function abrirLightbox(src){
  let lb = document.getElementById("panelLightbox");
  if(!lb){
    lb = document.createElement("div");
    lb.id = "panelLightbox";
    lb.innerHTML = `<img alt=""><button class="lightbox-close">✕</button>`;
    lb.addEventListener("click", () => lb.classList.remove("open"));
    document.body.appendChild(lb);
  }
  lb.querySelector("img").src = src;
  lb.classList.add("open");
}

// Extrai ID do YouTube de qualquer formato de URL ou aceita ID puro
function youtubeId(v){
  if(!v) return "";
  const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : (/^[\w-]{11}$/.test(v) ? v : "");
}

// ── Markdown → HTML (parser leve, sem dependência) ──
function parseMarkdown(md){
  const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const inline = t => esc(t)
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img class="panel-media-img md-img" src="$2" alt="$1" loading="lazy">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|[^_])_([^_]+)_/g, '$1<em>$2</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>');

  const linhas = String(md).replace(/\r\n/g, "\n").split("\n");
  let html = "", i = 0;

  const fecharListas = (estado) => {
    while (estado.length) html += estado.pop() === "ul" ? "</ul>" : "</ol>";
  };
  const listas = [];

  while (i < linhas.length){
    const linha = linhas[i];

    // bloco de código ```
    const cerca = linha.match(/^```(\w*)/);
    if (cerca){
      fecharListas(listas);
      const buff = [];
      i++;
      while (i < linhas.length && !/^```/.test(linhas[i])) buff.push(linhas[i++]);
      i++;
      html += `<pre class="md-pre"><code>${esc(buff.join("\n"))}</code></pre>`;
      continue;
    }

    // linha em branco
    if (/^\s*$/.test(linha)){ fecharListas(listas); i++; continue; }

    // título
    const h = linha.match(/^(#{1,6})\s+(.*)$/);
    if (h){ fecharListas(listas); html += `<h${h[1].length} class="md-h">${inline(h[2])}</h${h[1].length}>`; i++; continue; }

    // separador
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(linha)){ fecharListas(listas); html += `<hr class="md-hr">`; i++; continue; }

    // citação
    if (/^>\s?/.test(linha)){
      fecharListas(listas);
      const buff = [];
      while (i < linhas.length && /^>\s?/.test(linhas[i])) buff.push(linhas[i++].replace(/^>\s?/, ""));
      html += `<blockquote class="md-quote">${inline(buff.join(" "))}</blockquote>`;
      continue;
    }

    // listas
    const ol = linha.match(/^\s*\d+\.\s+(.*)$/);
    const ul = linha.match(/^\s*[-*+]\s+(.*)$/);
    if (ol || ul){
      const tipo = ol ? "ol" : "ul";
      if (listas[listas.length - 1] !== tipo){ fecharListas(listas); listas.push(tipo); html += tipo === "ol" ? '<ol class="panel-list">' : '<ul class="panel-list">'; }
      html += `<li>${inline((ol || ul)[1])}</li>`;
      i++; continue;
    }

    // parágrafo (junta linhas seguidas)
    fecharListas(listas);
    const buff = [linha];
    i++;
    while (i < linhas.length && !/^\s*$/.test(linhas[i]) &&
           !/^(#{1,6}\s|>\s?|```|\s*[-*+]\s|\s*\d+\.\s|-{3,}\s*$)/.test(linhas[i]))
      buff.push(linhas[i++]);
    html += `<p class="panel-text">${inline(buff.join("\n")).replace(/\n/g, "<br>")}</p>`;
  }
  fecharListas(listas);
  return html;
}

// ── Renderizadores de cada tipo de bloco ──
const BLOCOS = {
  texto: v => `<p class="panel-text">${v}</p>`,

  markdown: v => `<div class="panel-markdown">${parseMarkdown(Array.isArray(v) ? v.join("\n") : v)}</div>`,

  lista: v => `<ul class="panel-list">${v.map(l => `<li>${l}</li>`).join("")}</ul>`,

  imagens: v => {
    const arr = Array.isArray(v) ? v : [v];
    return `<div class="panel-media-grid">${
      arr.map(src => `<img class="panel-media-img" src="${src}" loading="lazy" alt="">`).join("")
    }</div>`;
  },

  videos: v => {
    const arr = Array.isArray(v) ? v : [v];
    return arr.map(item => {
      const o = typeof item === "string" ? { src:item } : item;
      const yt = youtubeId(o.youtube || o.yt || (/youtu/.test(o.src||"") ? o.src : ""));

      const midia = yt
        ? `<div class="panel-video-wrap"><iframe class="panel-video"
            src="https://www.youtube.com/embed/${yt}" loading="lazy"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
            allowfullscreen></iframe></div>`
        : `<video class="panel-video-file" src="${o.src}" controls preload="metadata"
            ${o.poster ? `poster="${o.poster}"` : ""}></video>`;

      return `<div class="panel-video-item">${midia}</div>`;
    }).join("");
  },

  audios: v => {
    const arr = Array.isArray(v) ? v : [v];
    return arr.map(a => {
      const o = typeof a === "string" ? { src:a } : a;
      return `<div class="panel-audio audio-player">
        ${o.titulo ? `<div class="panel-audio-title"><i class="fa-solid fa-music"></i> ${o.titulo}</div>` : ""}
        <audio src="${o.src}" preload="metadata"></audio>
        <div class="ap-controls">
          <button class="ap-play" type="button" aria-label="Tocar">
            <i class="fa-solid fa-play"></i>
          </button>
          <div class="ap-main">
            <div class="ap-bar"><div class="ap-buffered"></div><div class="ap-fill"></div><div class="ap-knob"></div></div>
            <div class="ap-time"><span class="ap-cur">0:00</span><span class="ap-dur">0:00</span></div>
          </div>
        </div>
      </div>`;
    }).join("");
  },

  botoes: v => `<div class="panel-buttons">${
    v.map(b => `<a class="panel-btn" href="${b.url || b.href || "#"}"
      target="_blank" rel="noopener noreferrer"${b.cor ? ` style="background:${b.cor}"` : ""}>
      ${b.icone ? `<i class="${b.icone}"></i>` : ""}<span>${b.label || b.texto || "Abrir"}</span>
    </a>`).join("")
  }</div>`
};

// Aceita nomes alternativos (singular) apontando pro mesmo renderizador
const BLOCO_ALIAS = { imagem:"imagens", video:"videos", audio:"audios", links:"botoes", md:"markdown" };

// Monta o corpo seguindo a ORDEM em que as chaves aparecem no objeto conteudo
function renderConteudo(c){
  let html = "";
  for (const chave of Object.keys(c)){
    const tipo = BLOCO_ALIAS[chave] || chave;
    const render = BLOCOS[tipo];
    const valor = c[chave];
    if (render && valor != null && (!Array.isArray(valor) || valor.length))
      html += render(valor);
  }
  return html;
}

function abrirPasta(item, clickedWrapper){
  const c = item.conteudo;
  if(!c) return;

  const corFundo = `linear-gradient(135deg,${item.from},${item.to})`;

  const tagsHtml = (c.tags || [])
    .map(t => `<span class="panel-tag">${t}</span>`)
    .join("");

  const corpoHtml = renderConteudo(c);

  folderPanel.innerHTML = `
    <div class="panel-inner">
      <div class="panel-header" style="background:${corFundo}">
        <div class="panel-header-left">
          <div>
            <div class="panel-title">${item.titulo}</div>
            <div class="panel-subtitle">${item.subtitulo}</div>
          </div>
        </div>
        <button class="panel-close" id="panelCloseBtn">✕</button>
      </div>
      <div class="panel-body">
        <div class="panel-tags">${tagsHtml}</div>
        ${corpoHtml}
      </div>
    </div>
  `;

  document.getElementById("panelCloseBtn").addEventListener("click", fecharPasta);

  // Lightbox ao clicar nas imagens do painel
  folderPanel.querySelectorAll(".panel-media-img").forEach(img => {
    img.addEventListener("click", () => abrirLightbox(img.src));
  });

  folderPanel.querySelectorAll(".audio-player").forEach(montarAudioPlayer);

  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => folderPanel.classList.add("panel-open"));
}

// Player de áudio customizado
const fmtTempo = s => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const seg = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${seg}`;
};

function montarAudioPlayer(el){
  const audio = el.querySelector("audio");
  const btn   = el.querySelector(".ap-play");
  const icon  = btn.querySelector("i");
  const bar   = el.querySelector(".ap-bar");
  const fill  = el.querySelector(".ap-fill");
  const knob  = el.querySelector(".ap-knob");
  const buff  = el.querySelector(".ap-buffered");
  const cur   = el.querySelector(".ap-cur");
  const dur   = el.querySelector(".ap-dur");

  const setIcon = tocando => {
    icon.className = tocando ? "fa-solid fa-pause" : "fa-solid fa-play";
    btn.setAttribute("aria-label", tocando ? "Pausar" : "Tocar");
    el.classList.toggle("is-playing", tocando);
  };

  btn.addEventListener("click", () => {
    if (audio.paused){
      // pausa outros players abertos
      document.querySelectorAll(".audio-player audio").forEach(a => { if (a !== audio) a.pause(); });
      audio.play();
    } else audio.pause();
  });

  audio.addEventListener("play",  () => setIcon(true));
  audio.addEventListener("pause", () => setIcon(false));
  audio.addEventListener("ended", () => { setIcon(false); fill.style.width = knob.style.left = "0%"; });
  audio.addEventListener("loadedmetadata", () => { dur.textContent = fmtTempo(audio.duration); });

  audio.addEventListener("timeupdate", () => {
    const p = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    fill.style.width = p + "%";
    knob.style.left  = p + "%";
    cur.textContent  = fmtTempo(audio.currentTime);
  });

  audio.addEventListener("progress", () => {
    if (audio.buffered.length && audio.duration){
      buff.style.width = (audio.buffered.end(audio.buffered.length - 1) / audio.duration) * 100 + "%";
    }
  });

  const seek = clientX => {
    const r = bar.getBoundingClientRect();
    const frac = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    if (audio.duration) audio.currentTime = frac * audio.duration;
  };
  let arrastando = false;
  bar.addEventListener("pointerdown", e => { arrastando = true; bar.setPointerCapture(e.pointerId); seek(e.clientX); });
  bar.addEventListener("pointermove", e => { if (arrastando) seek(e.clientX); });
  bar.addEventListener("pointerup",   () => { arrastando = false; });
}

// Lista de fallback quando aberto via file:// ou sem listagem de diretório
const ICONS_FALLBACK = {
  "icons/softwares/":[
    "icons/softwares/photshop.png",
    "icons/softwares/canva.png",
    "icons/softwares/capcut.png",
    "icons/softwares/aftereffects.png",
    "icons/softwares/premire.png"
  ],
  "icons/ia/":[
    "icons/ia/chatgpt.png",
    "icons/ia/claude.png",
    "icons/ia/gemini.png"
  ]
};

// Descobre automaticamente os ícones dentro de uma pasta
// (lê a listagem de diretório servida pelo http.server)
async function descobrirIcons(dir){
  const exts = /\.(png|jpe?g|svg|webp|gif|avif)$/i;
  try{
    const res = await fetch(dir, { cache:"no-store" });
    if(!res.ok) throw 0;
    const html = await res.text();
    const doc  = new DOMParser().parseFromString(html, "text/html");
    const files = [...doc.querySelectorAll("a")]
      .map(a => a.getAttribute("href"))
      .filter(h => h && exts.test(h))
      .map(h => dir + h.split("/").pop());
    const unicos = [...new Set(files)];
    if(unicos.length) return unicos;
    throw 0;
  }catch(e){
    return ICONS_FALLBACK[dir] || [];
  }
}

async function carregarSoftwareIcons(container, dir, socialAnim = false){
  const front = container.classList.contains("folder-icons-front");
  const icones = await descobrirIcons(dir);
  container.style.setProperty("--qtd", icones.length);
  container.innerHTML = "";

  // IA: ícones empilhados no mesmo ponto, aparecem um por vez com fade (sem flutuar)
  if (socialAnim && front) {
    container.classList.add("fade-cycle");
    const imgs = icones.map((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.loading = "lazy";
      img.className = "folder-icon-img";
      container.appendChild(img);
      return img;
    });
    if (!imgs.length) return;
    let atual = 0;
    imgs[0].classList.add("is-active");
    setInterval(() => {
      imgs[atual].classList.remove("is-active");
      atual = (atual + 1) % imgs.length;
      imgs[atual].classList.add("is-active");
    }, 1600);
    return;
  }

  icones.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.className = "folder-icon-img";
    img.style.setProperty("--amp", (14 + (i % 3) * 10) + "px");
    img.style.animationDuration = (2.6 + (i % 4) * 0.45) + "s";
    img.style.animationDelay     = (-(i * 0.55)) + "s";
    container.appendChild(img);
  });
}

const imagensGrid = [

];

const photoGrid = document.getElementById("photoGrid");

// Mapeamento tipo → spans do grid
const typeConfig = {
  'Horizontal': { col: 'col-span-2', row: 'row-span-1' },
  'Thumbnail':  { col: 'col-span-2', row: 'row-span-1' },
  'Shorts':     { col: 'col-span-1', row: 'row-span-2' },
  'Stories':    { col: 'col-span-1', row: 'row-span-2' },
  'Reels':      { col: 'col-span-1', row: 'row-span-2' },
  'Post':       { col: 'col-span-1', row: 'row-span-1' },
  'Feed':       { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel':  { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel Square':   { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel Vertical': { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel Horizontal': { col: 'col-span-2', row: 'row-span-1' },
};

function filterKey(rede, tipo) {
  const r = rede.toLowerCase();
  if (r === "youtube")   return "youtube";
  if (r === "instagram") return "instagram";
  if (r === "tiktok")    return "tiktok";
  if (r === "facebook")  return "facebook";
  return r;
}

function criarCard(item) {
  const spans = typeConfig[item.tipo] || { col: 'col-span-1', row: 'row-span-1' };
  const card = document.createElement("div");

  const slug = item.tipo.toLowerCase().replace(/\s+/g, "-");
  card.dataset.filter = filterKey(item.rede, item.tipo);
  card.className = `
    ${spans.col} ${spans.row} type-${slug}
    group relative overflow-hidden rounded-xl border border-white/10
    bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-1
    sm:rounded-2xl
  `;

  const ehCarrossel = Array.isArray(item.imagens) && item.imagens.length > 0;
  let mediaTag;
  if (ehCarrossel) {
    const slides = item.imagens
      .map(src => `<img src="${src}" alt="${item.titulo}">`)
      .join("");
    // clona o primeiro slide ao final p/ loop infinito sem salto
    const clone = item.imagens.length > 1
      ? `<img src="${item.imagens[0]}" alt="" aria-hidden="true">`
      : "";
    mediaTag = `<div class="ig-carousel"><div class="ig-carousel-track">${slides}${clone}</div></div>`;
  } else {
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.imagem);
    mediaTag = isVideo
      ? `<video class="h-full w-full object-cover transition duration-500 group-hover:scale-110" src="${item.imagem}" muted loop playsinline preload="metadata"></video>`
      : `<img class="h-full w-full object-cover transition duration-500 group-hover:scale-110" src="${item.imagem}" alt="${item.titulo}" loading="lazy">`;
  }

  card.innerHTML = `
    ${mediaTag}
    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
    <div class="absolute inset-x-1.5 bottom-1.5 flex items-end justify-end gap-2 sm:inset-x-3 sm:bottom-3">
      <a href="#" aria-label="${item.rede}" class="grid-social" style="color:${item.cor}">
        <i class="fa-brands ${item.icone}"></i>
      </a>
    </div>
  `;

  if (ehCarrossel && item.imagens.length > 1) {
    iniciarCarrossel(card.querySelector(".ig-carousel-track"), item.imagens.length);
  }

  // vídeo que não carregar → manda pro final do grid
  const vid = card.querySelector("video");
  if (vid) {
    vid.addEventListener("error", () => enviarParaOFinal(card), { once: true });
    vid.addEventListener("stalled", () => enviarParaOFinal(card), { once: true });
  }

  // estado de carregamento (skeleton) — a mídia carrega por baixo normalmente
  card.classList.add("is-loading");
  card.insertAdjacentHTML("beforeend", '<div class="media-skeleton"></div>');
  return card;
}

// Carrossel slide: avança automático, transição slide de 2s, loop infinito
function iniciarCarrossel(track, total) {
  if (!track) return;
  const SLIDE = 2000; // duração da transição slide
  const HOLD  = 2000; // tempo parado em cada imagem
  let i = 0;
  setInterval(() => {
    i++;
    track.style.transition = `transform ${SLIDE}ms ease`;
    track.style.transform  = `translateX(-${i * 100}%)`;
    if (i >= total) {
      // chegou no clone do primeiro → após a transição, snap p/ slide 0 sem animar
      setTimeout(() => {
        track.style.transition = "none";
        i = 0;
        track.style.transform = "translateX(0)";
        void track.offsetWidth; // força reflow
      }, SLIDE);
    }
  }, SLIDE + HOLD);
}

function embaralharGrid() {
  const filhos = [...photoGrid.children];
  filhos.sort(() => Math.random() - 0.5);
  filhos.forEach(f => photoGrid.appendChild(f));
  limiteVisivel = LIMITE_PAGINA;
  aplicarVisibilidade();
}

// ── PAGINAÇÃO (mostrar 8, carregar +8 ao clicar) ──
const LIMITE_PAGINA = 8;
let limiteVisivel = LIMITE_PAGINA;
const btnMostrarMais = document.getElementById("mostrarMais");

function cardCombina(card) {
  return filtroAtivo === "todos" || card.dataset.filter === filtroAtivo;
}

// vídeo só toca quando visível (evita travar o decode do navegador)
function controlarVideo(card, visivel) {
  const v = card.querySelector("video");
  if (!v) return;
  if (visivel) { v.play?.().catch(() => {}); }
  else { v.pause?.(); }
}

// remove o skeleton após um tempo fake (dá tempo do vídeo bufferizar)
function revelarCard(card) {
  if (card.dataset.revelado) return;
  card.dataset.revelado = "1";
  setTimeout(() => card.classList.remove("is-loading"), 1100 + Math.random() * 900);
}

// vídeo que falhar ao carregar vai pro final (libera slot p/ um que carrega)
function enviarParaOFinal(card) {
  if (card.dataset.falhou) return;
  card.dataset.falhou = "1";
  photoGrid.appendChild(card);
  aplicarVisibilidade();
}

function aplicarVisibilidade() {
  let mostrados = 0;
  [...photoGrid.children].forEach(card => {
    const visivel = cardCombina(card) && mostrados < limiteVisivel;
    card.style.display = visivel ? "" : "none";
    controlarVideo(card, visivel);
    if (visivel) {
      mostrados++;
      revelarCard(card);
    }
  });
  const totalCombinam = [...photoGrid.children].filter(cardCombina).length;
  if (btnMostrarMais) {
    btnMostrarMais.style.display = totalCombinam > limiteVisivel ? "" : "none";
  }
}

if (btnMostrarMais) {
  btnMostrarMais.addEventListener("click", () => {
    limiteVisivel += LIMITE_PAGINA;
    aplicarVisibilidade();
  });
}

// DRAG-TO-SCROLL filter bar
const filterBar = document.querySelector(".filter-bar");
let drag = { active: false, startX: 0, scrollLeft: 0 };

filterBar.addEventListener("mousedown", e => {
  drag.active = true;
  drag.startX = e.pageX - filterBar.offsetLeft;
  drag.scrollLeft = filterBar.scrollLeft;
  filterBar.classList.add("is-dragging");
});
filterBar.addEventListener("mouseleave", () => { drag.active = false; filterBar.classList.remove("is-dragging"); });
filterBar.addEventListener("mouseup",    () => { drag.active = false; filterBar.classList.remove("is-dragging"); });
filterBar.addEventListener("mousemove",  e => {
  if (!drag.active) return;
  e.preventDefault();
  filterBar.scrollLeft = drag.scrollLeft - (e.pageX - filterBar.offsetLeft - drag.startX);
});

// FILTROS
let filtroAtivo = "todos";

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    filtroAtivo = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    limiteVisivel = LIMITE_PAGINA;

    const cards = [...photoGrid.children];

    // anima saída dos visíveis que não combinam
    cards.forEach(card => {
      if (card.style.display !== "none" && !cardCombina(card)) {
        card.classList.add("card-exit");
      }
    });

    setTimeout(() => {
      cards.forEach(card => card.classList.remove("card-exit"));
      aplicarVisibilidade();
      // anima entrada dos que ficaram visíveis
      [...photoGrid.children].forEach(card => {
        if (card.style.display !== "none") {
          card.classList.add("card-enter");
          card.addEventListener("animationend", () => card.classList.remove("card-enter"), { once: true });
        }
      });
    }, 220);
  });
});

const MEDIA = (window.MEDIA_MANIFEST && window.MEDIA_MANIFEST.files)   || {};
const SUBS  = (window.MEDIA_MANIFEST && window.MEDIA_MANIFEST.subdirs) || {};

async function descobrirMedia(dir) {
  if (MEDIA[dir] && MEDIA[dir].length) return MEDIA[dir];
  const exts = /\.(png|jpe?g|svg|webp|gif|avif|mp4|webm|ogg|mov)$/i;
  try {
    const res = await fetch(dir, { cache: "no-store" });
    if (!res.ok) throw 0;
    const html = await res.text();
    const doc  = new DOMParser().parseFromString(html, "text/html");
    const files = [...doc.querySelectorAll("a")]
      .map(a => a.getAttribute("href"))
      .filter(h => h && exts.test(h))
      .map(h => dir + h.split("/").pop());
    const unicos = [...new Set(files)];
    if (unicos.length) return unicos;
    throw 0;
  } catch {
    return [];
  }
}

// Lista subpastas servidas pelo http.server (cada subpasta = um carrossel)
async function descobrirSubpastas(dir) {
  if (SUBS[dir] && SUBS[dir].length) return SUBS[dir];
  try {
    const res = await fetch(dir, { cache: "no-store" });
    if (!res.ok) throw 0;
    const html = await res.text();
    const doc  = new DOMParser().parseFromString(html, "text/html");
    const dirs = [...doc.querySelectorAll("a")]
      .map(a => a.getAttribute("href"))
      .filter(h => h && h.endsWith("/") && !h.startsWith("/") && !h.startsWith("?") && !h.startsWith(".."))
      .map(h => dir + h.split("/").filter(Boolean).pop() + "/");
    return [...new Set(dirs)];
  } catch {
    return [];
  }
}

// Cada subpasta vira um card-carrossel com suas imagens
async function carregarCarrosseisNoGrid(parentDir, config) {
  const pastas = await descobrirSubpastas(parentDir);
  for (const pasta of pastas) {
    const imagens = await descobrirMedia(pasta);
    if (!imagens.length) continue;
    const nome = pasta.split("/").filter(Boolean).pop();
    const card = criarCard({
      titulo:  config.titulo || nome,
      imagens,
      rede:    config.rede,
      tipo:    config.tipo,
      icone:   config.icone,
      cor:     config.cor,
    });
    photoGrid.appendChild(card);
  }
}

async function carregarPastaNoGrid(dir, config) {
  const arquivos = await descobrirMedia(dir);
  arquivos.forEach((src, i) => {
    const nome = src.split("/").pop().replace(/\.[^.]+$/, "");
    const card = criarCard({
      titulo: config.titulo || nome,
      imagem: src,
      rede:   config.rede,
      tipo:   config.tipo,
      icone:  config.icone,
      cor:    config.cor,
    });
    photoGrid.appendChild(card);
  });
}

// Renderiza itens estáticos
imagensGrid.forEach(item => photoGrid.appendChild(criarCard(item)));

// Carrega pastas e embaralha tudo ao final
Promise.all([
  carregarPastaNoGrid("youtube-tumbnail/", {
    titulo: "YouTube - Thumbnail",
    rede:   "YouTube",
    tipo:   "Thumbnail",
    icone:  "fa-youtube",
    cor:    "#FF0000",
  }),
  carregarPastaNoGrid("youtube-videos/", {
    titulo: "YouTube - Horizontal",
    rede:   "YouTube",
    tipo:   "Horizontal",
    icone:  "fa-youtube",
    cor:    "#FF0000",
  }),
  carregarPastaNoGrid("youtube-shorts/", {
    titulo: "YouTube - Shorts",
    rede:   "YouTube",
    tipo:   "Shorts",
    icone:  "fa-youtube",
    cor:    "#FF0000",
  }),
  carregarPastaNoGrid("instagram-feed/", {
    titulo: "Instagram - Feed",
    rede:   "Instagram",
    tipo:   "Feed",
    icone:  "fa-instagram",
    cor:    "#E1306C",
  }),
  carregarPastaNoGrid("instagram-post/", {
    titulo: "Instagram - Post",
    rede:   "Instagram",
    tipo:   "Post",
    icone:  "fa-instagram",
    cor:    "#E1306C",
  }),
  carregarCarrosseisNoGrid("carrossel-square/", {
    titulo: "Instagram - Carrossel",
    rede:   "Instagram",
    tipo:   "Carrossel Square",
    icone:  "fa-instagram",
    cor:    "#E1306C",
  }),
  carregarCarrosseisNoGrid("carrossel-vertical/", {
    titulo: "Instagram - Carrossel",
    rede:   "Instagram",
    tipo:   "Carrossel Vertical",
    icone:  "fa-instagram",
    cor:    "#E1306C",
  }),
  carregarCarrosseisNoGrid("carrossel-horizontal/", {
    titulo: "YouTube - Horizontal",
    rede:   "YouTube",
    tipo:   "Horizontal",
    icone:  "fa-youtube",
    cor:    "#FF0000",
  }),
]).then(embaralharGrid);

// ── BUSCA (search/search.json) ──
const searchWrap    = document.querySelector(".search-wrap");
const searchInput   = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const searchBtn     = document.getElementById("searchBtn");
// Fonte dos dados: search/search-data.js (window.SEARCH_DATA)
let searchData = Array.isArray(window.SEARCH_DATA) ? window.SEARCH_DATA : [];

function textoDoItem(item){
  const c = item.conteudo || {};
  return [item.titulo, item.subtitulo, ...(c.tags || []), c.texto, ...(c.lista || [])]
    .filter(Boolean).join(" ").toLowerCase();
}

// 6 itens aleatórios (sugestões ao clicar)
function seisAleatorias(){
  const arr = searchData.slice();
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 4);
}

// ── SEARCH MODAL ──────────────────────────────────────────────
let searchModal = null;

function criarModal(){
  if (searchModal) return;
  searchModal = document.createElement("div");
  searchModal.className = "search-modal";
  searchModal.innerHTML = `
    <div class="search-modal-box">
      <div class="search-modal-header">
        <span class="search-modal-titulo">Resultados</span>
        <button class="search-modal-close"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="search-modal-list" id="searchModalList"></div>
    </div>`;
  document.body.appendChild(searchModal);
  searchModal.querySelector(".search-modal-close").addEventListener("click", fecharModal);
  searchModal.addEventListener("click", e => { if (e.target === searchModal) fecharModal(); });
}

function fecharModal(){
  searchModal && searchModal.classList.remove("is-open");
}

function abrirModal(lista){
  criarModal();
  const list = document.getElementById("searchModalList");
  if (!lista.length){
    list.innerHTML = '<div class="search-empty">Nada encontrado</div>';
  } else {
    list.innerHTML = lista.map(it => {
      const c = it.conteudo || {};
      const sub = it.subtitulo || (c.texto || "").slice(0, 60) || (c.tags || []).join(", ");
      return `<button class="search-item" data-idx="${searchData.indexOf(it)}">
        <span class="search-item-text">
          <span class="search-item-title">${it.titulo || ""}</span>
          <span class="search-item-sub">${sub}</span>
        </span>
      </button>`;
    }).join("");
    list.querySelectorAll(".search-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = searchData[+btn.dataset.idx];
        fecharModal();
        if (item && item.conteudo) abrirPasta(item);
      });
    });
  }
  searchModal.classList.add("is-open");
}

function executarBusca(){
  const termo = searchInput.value.trim().toLowerCase();
  const lista = termo
    ? searchData.filter(it => textoDoItem(it).includes(termo))
    : searchData;

  searchBtn.classList.add("is-searching");
  setTimeout(() => {
    searchBtn.classList.remove("is-searching");
    abrirModal(lista);
  }, 700);
}

if (searchInput){
  searchInput.addEventListener("keydown", e => { if (e.key === "Enter") executarBusca(); });
  if (searchBtn) searchBtn.addEventListener("click", executarBusca);

  const sugWrap = document.getElementById("searchSuggestions");
  if (sugWrap && Array.isArray(window.SEARCH_SUGGESTIONS)){
    const VISIVEIS = 5;
    const todas = window.SEARCH_SUGGESTIONS;

    const criarChip = ({ label, titulo }) => {
      const btn = document.createElement("button");
      btn.className = "search-sug";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        const item = searchData.find(it => it.titulo === titulo);
        if (item && item.conteudo) abrirPasta(item);
      });
      return btn;
    };

    const visiveis = todas.slice(0, VISIVEIS);
    const ocultas  = todas.slice(VISIVEIS);

    visiveis.forEach(sug => sugWrap.appendChild(criarChip(sug)));

    if (ocultas.length){
      // popup com as pesquisas restantes
      const modal = document.createElement("div");
      modal.className = "search-modal sug-modal";
      modal.innerHTML = `
        <div class="search-modal-box">
          <div class="search-modal-header">
            <span class="search-modal-titulo"></span>
            <button class="search-modal-close" type="button" aria-label="Fechar">✕</button>
          </div>
          <div class="search-modal-list sug-modal-chips"></div>
        </div>`;
      document.body.appendChild(modal);

      const chipsWrap = modal.querySelector(".sug-modal-chips");
      const fechar = () => modal.classList.remove("is-open");
      ocultas.forEach(sug => chipsWrap.appendChild(criarChip(sug)));
      modal.querySelector(".search-modal-close").addEventListener("click", fechar);
      modal.addEventListener("click", e => { if (e.target === modal) fechar(); });

      const mais = document.createElement("button");
      mais.className = "search-sug search-sug-more";
      mais.textContent = "Mostrar mais";
      mais.addEventListener("click", () => modal.classList.add("is-open"));
      sugWrap.appendChild(mais);
    }
  }
}
