// MENU LATERAL DE CURRÍCULO (empurra a tela) com
// "Currículo Virtual" (popup), "Baixar Currículo" (PDF) e afins
const cvSidebar     = document.getElementById("cvSidebar");
const mainContent   = document.getElementById("mainContent");
const cvOverlay     = document.getElementById("cvOverlay");
const closeCvBtn    = document.getElementById("closeCvMenu");
const cvVirtualBtn  = document.getElementById("cvVirtualBtn");
let cvMenuOpen = false;

function openCvMenu(){
  closeMenu(); // fecha o menu social se estiver aberto, evita os dois juntos
  cvMenuOpen = true;
  cvSidebar.classList.add("open");
  mainContent.classList.add("cv-pushed");
  cvOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCvMenu(){
  cvMenuOpen = false;
  cvSidebar.classList.remove("open");
  mainContent.classList.remove("cv-pushed");
  cvOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (closeCvBtn) {
  closeCvBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeCvMenu();
  });
}
if (cvVirtualBtn) {
  cvVirtualBtn.addEventListener("click", () => {
    closeCvMenu();
    const item = (window.SEARCH_DATA || []).find(it => it.titulo === "Currículo");
    if (item && item.conteudo) abrirPasta(item);
  });
}
const cvTrabalhosBtn = document.getElementById("cvTrabalhosBtn");
if (cvTrabalhosBtn) {
  cvTrabalhosBtn.addEventListener("click", () => {
    closeCvMenu();
    document.getElementById("fullViewBtn")?.click();
  });
}
if (cvOverlay) cvOverlay.addEventListener("click", closeCvMenu);

// MENU LATERAL DE REDES SOCIAIS (empurra a tela)
const socialSidebar  = document.getElementById("socialSidebar");
const socialOverlay  = document.getElementById("socialOverlay");
const closeSocialBtn = document.getElementById("closeSocialMenu");
let menuOpen = false;

function openMenu(){
  if (cvMenuOpen) closeCvMenu(); // evita os dois menus laterais abertos juntos
  menuOpen = true;
  socialSidebar.classList.add("open");
  mainContent.classList.add("social-pushed");
  socialOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu(){
  menuOpen = false;
  socialSidebar.classList.remove("open");
  mainContent.classList.remove("social-pushed");
  socialOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (closeSocialBtn) {
  closeSocialBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
}
if (socialOverlay) socialOverlay.addEventListener("click", closeMenu);

// botões "Contato" e "Currículo" ao lado de "Quem sou eu?" abrem os
// mesmos menus laterais dos botões flutuantes
const headerContatoBtn   = document.getElementById("headerContatoBtn");
const headerCurriculoBtn = document.getElementById("headerCurriculoBtn");
if (headerContatoBtn) {
  headerContatoBtn.addEventListener("click", () => {
    if (!menuOpen) openMenu();
  });
}
if (headerCurriculoBtn) {
  headerCurriculoBtn.addEventListener("click", () => {
    const item = (window.SEARCH_DATA || []).find(it => it.titulo === "Currículo");
    if (item && item.conteudo) abrirPasta(item);
  });
}
const headerExperienciaBtn = document.getElementById("headerExperienciaBtn");
if (headerExperienciaBtn) {
  headerExperienciaBtn.addEventListener("click", () => {
    if (!cvMenuOpen) openCvMenu();
  });
}

// bio ("Mostrar mais") + badges de atuação (Designer Gráfico/Editor de Vídeos/Social Media/...):
// todos revelam texto em linha, no mesmo estilo, e só um fica aberto por vez
const bioClampWrap   = document.getElementById("bioClampWrap");
const bioMostrarMais = document.getElementById("bioMostrarMaisBtn");
const heroSubtitleEl = document.getElementById("heroSubtitle");
const roleFlagButtons = document.querySelectorAll(".role-flag");
const roleFlagTextEl  = document.getElementById("roleFlagText");

const ROLE_FLAG_TEXTS = {
  grafico: "Crio artes, thumbnails, banners e materiais gráficos no Photoshop e Canva — de posts a produtos como camisas e canecas.",
  video: "Edito vídeos horizontais e verticais no Capcut, Premiere e After Effects — roteiro, cortes, thumbnails e efeitos especiais.",
  social: "Cuido da gestão de Instagram e YouTube: calendário editorial, criação de posts, carrosséis, reels e agendamento das publicações.",
  quemsou: "Mateus Alves, 27 anos, atuo de forma integrada em Social Media, Produção Audiovisual e Programação, unindo criatividade e automação no dia a dia dos projetos.",
  contato: "Fale comigo pelo WhatsApp (21) 97304-2881, Instagram @mateusalvesdzn ou e-mail mateusalves.flu@gmail.com — respondo rápido.",
  curriculo: "Formação e experiência em Social Media, Design Gráfico e Edição de Vídeos. Baixe o currículo em PDF ou confira o perfil no LinkedIn nos links de contato.",
  experiencia: "Já atuei com produção de conteúdo, gestão de redes sociais e edição de vídeo para criadores e marcas — os projetos e clientes estão no portfólio abaixo.",
};

let revelacaoAberta = null; // "bio" | data-role do badge | null

function fecharBio(){
  if (!bioClampWrap || !heroSubtitleEl || !bioMostrarMais) return;
  bioClampWrap.classList.remove("is-expanded");
  heroSubtitleEl.style.maxHeight = "";
  bioMostrarMais.textContent = "Mostrar mais";
}
function abrirBio(){
  if (!bioClampWrap || !heroSubtitleEl || !bioMostrarMais) return;
  bioClampWrap.classList.add("is-expanded");
  heroSubtitleEl.style.maxHeight = heroSubtitleEl.scrollHeight + "px";
  bioMostrarMais.textContent = "Mostrar menos";
}
function fecharRoleFlagText(){
  if (!roleFlagTextEl) return;
  roleFlagTextEl.style.maxHeight = "";
  roleFlagTextEl.classList.remove("is-open");
  roleFlagButtons.forEach(b => {
    b.classList.remove("is-active");
    if (b.dataset.label) b.textContent = b.dataset.label;
  });
}
function fecharTudo(){
  fecharBio();
  fecharRoleFlagText();
  revelacaoAberta = null;
}

if (bioClampWrap && bioMostrarMais && heroSubtitleEl) {
  bioMostrarMais.addEventListener("click", () => {
    if (revelacaoAberta === "bio") { fecharTudo(); return; }
    fecharTudo();
    abrirBio();
    revelacaoAberta = "bio";
  });
}

const roleFlagHintEl = document.getElementById("roleFlagHint");
if (roleFlagHintEl) {
  function esconderRoleFlagHint(e) {
    if (e.target.closest("#precisaModal")) return;
    roleFlagHintEl.classList.add("is-hidden");
    document.removeEventListener("click", esconderRoleFlagHint);
  }
  document.addEventListener("click", esconderRoleFlagHint);
}

if (roleFlagButtons.length && roleFlagTextEl) {
  roleFlagButtons.forEach(btn => {
    btn.dataset.label = btn.textContent;
    btn.addEventListener("click", () => {
      const role = btn.dataset.role;
      if (revelacaoAberta === role) { fecharTudo(); return; }
      fecharTudo();
      btn.classList.add("is-active");
      btn.textContent = "Mostrar menos";
      roleFlagTextEl.textContent = ROLE_FLAG_TEXTS[role] || "";
      roleFlagTextEl.classList.add("is-open");
      roleFlagTextEl.style.maxHeight = roleFlagTextEl.scrollHeight + "px";
      revelacaoAberta = role;
    });
  });
}

// ícone do botão "Contato" trocando de ícone e cor entre as redes sociais
const CONTATO_PLATAFORMAS = [
  { icone: "fa-brands fa-whatsapp",   cor: "#25D366" },
  { icone: "fa-brands fa-facebook-f", cor: "#1877F2" },
  { icone: "fa-brands fa-instagram",  cor: "linear-gradient(135deg,#7c3aed,#ec4899,#f97316)" },
  { icone: "fa-solid fa-envelope",    cor: "#EA4335" },
  { icone: "fa-brands fa-linkedin-in",cor: "#0A66C2" },
];
const contatoCycleIcon = document.getElementById("contatoCycleIcon");
if (contatoCycleIcon) {
  const iconeEl = contatoCycleIcon.querySelector("i");
  let contatoIdx = 0;
  setInterval(() => {
    contatoCycleIcon.style.opacity = "0";
    setTimeout(() => {
      contatoIdx = (contatoIdx + 1) % CONTATO_PLATAFORMAS.length;
      const p = CONTATO_PLATAFORMAS[contatoIdx];
      iconeEl.className = p.icone;
      contatoCycleIcon.style.background = p.cor;
      contatoCycleIcon.style.opacity = "1";
    }, 300);
  }, 1800);
}


// botões dentro de popups (painel/bio/currículo) que abrem OUTRO popup
// (data-popup-titulo), em vez de link externo — delegado pois são inseridos
// dinamicamente toda vez que um painel abre.
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".panel-btn[data-popup-titulo], .ver-mais-link[data-popup-titulo], .cv-popup-btn[data-popup-titulo]");
  if (!btn) return;
  e.preventDefault();
  if (btn.classList.contains("cv-popup-btn")) closeCvMenu();
  const item = (window.SEARCH_DATA || []).find(it => it.titulo === btn.dataset.popupTitulo);
  if (item && item.conteudo) abrirPasta(item);
});

const itensPortfolioDefault = [
];

function normalizarCardPortfolio(c) {
  return Object.assign({}, c, {
    conteudo: { markdown: c.markdown || (c.conteudo && c.conteudo.markdown) || "" }
  });
}

const itensPortfolio = Array.isArray(window.ADMIN_PORTFOLIO_CARDS)
  ? window.ADMIN_PORTFOLIO_CARDS.map(normalizarCardPortfolio)
  : itensPortfolioDefault.map(normalizarCardPortfolio);

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

// Abre imagem/vídeo em tela cheia
function abrirLightbox(src, tipo){
  let lb = document.getElementById("panelLightbox");
  if(!lb){
    lb = document.createElement("div");
    lb.id = "panelLightbox";
    lb.innerHTML = `<img alt=""><video controls playsinline></video><button class="lightbox-close">✕</button>`;
    const fechar = () => {
      lb.classList.remove("open");
      lb.querySelector("video").pause();
    };
    lb.addEventListener("click", (e) => { if (e.target === lb) fechar(); });
    lb.querySelector("img").addEventListener("click", fechar);
    lb.querySelector(".lightbox-close").addEventListener("click", fechar);
    document.body.appendChild(lb);
  }
  const img = lb.querySelector("img");
  const video = lb.querySelector("video");
  const ehVideo = tipo === "video" || /\.(mp4|webm|ogg|mov)$/i.test(src);
  // reinicia a animação de entrada (pequeno atraso) toda vez que troca de mídia
  const tocarEntrada = (el) => {
    el.classList.remove("lightbox-media-in");
    void el.offsetWidth;
    el.classList.add("lightbox-media-in");
  };
  if (ehVideo) {
    img.style.display = "none";
    video.style.display = "";
    video.src = src;
    video.play().catch(() => {});
    tocarEntrada(video);
  } else {
    video.pause();
    video.removeAttribute("src");
    video.style.display = "none";
    img.style.display = "";
    img.src = src;
    tocarEntrada(img);
  }
  lb.classList.add("open");
}

// Abre um carrossel (várias imagens) em tela cheia com navegação tipo Instagram:
// arrastar (swipe), setas nas laterais, bolinhas indicadoras e setas do teclado.
let carouselLbImagens = [];
let carouselLbIndice = 0;

function atualizarCarouselLb(lb, animar) {
  const track = lb.querySelector(".carousel-lb-track");
  if (!animar) {
    track.style.transition = "none";
    track.style.transform = `translateX(-${carouselLbIndice * 100}%)`;
    void track.offsetWidth; // força reflow antes de reativar a transição
    track.style.transition = "";
  } else {
    track.style.transform = `translateX(-${carouselLbIndice * 100}%)`;
  }
  lb.querySelectorAll(".carousel-lb-dot").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === carouselLbIndice);
  });
  lb.querySelector(".carousel-lb-prev").style.visibility = carouselLbIndice === 0 ? "hidden" : "";
  lb.querySelector(".carousel-lb-next").style.visibility = carouselLbIndice === carouselLbImagens.length - 1 ? "hidden" : "";
  // só o vídeo do slide atual toca; os demais pausam
  [...track.children].forEach((el, i) => {
    if (el.tagName !== "VIDEO") return;
    if (i === carouselLbIndice) el.play().catch(() => {});
    else el.pause();
  });
}

function irParaSlideCarouselLb(lb, indice) {
  carouselLbIndice = Math.max(0, Math.min(carouselLbImagens.length - 1, indice));
  atualizarCarouselLb(lb, true);
}

// proporção real de cada tipo de carrossel (imagens exportadas do Instagram)
const CAROUSEL_LB_ASPECT = {
  "Carrossel Square":     "1/1",
  "Carrossel Vertical":   "4/5",
  "Carrossel Horizontal": "4/3",
};

function abrirLightboxCarrossel(imagens, indiceInicial, tipo) {
  carouselLbImagens = imagens;
  carouselLbIndice = indiceInicial || 0;

  let lb = document.getElementById("carouselLightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "carouselLightbox";
    lb.innerHTML = `
      <button type="button" class="lightbox-close carousel-lb-close" aria-label="Fechar">✕</button>
      <div class="carousel-lb-stage">
        <button type="button" class="carousel-lb-arrow carousel-lb-prev" aria-label="Anterior"><i class="fa-solid fa-chevron-left"></i></button>
        <div class="carousel-lb-track"></div>
        <button type="button" class="carousel-lb-arrow carousel-lb-next" aria-label="Próxima"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="carousel-lb-dots"></div>
    `;
    const fechar = () => {
      lb.classList.remove("open");
      lb.querySelectorAll("video").forEach(v => v.pause());
    };
    lb.addEventListener("click", (e) => { if (e.target === lb) fechar(); });
    lb.querySelector(".carousel-lb-close").addEventListener("click", fechar);
    lb.querySelector(".carousel-lb-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      irParaSlideCarouselLb(lb, carouselLbIndice - 1);
    });
    lb.querySelector(".carousel-lb-next").addEventListener("click", (e) => {
      e.stopPropagation();
      irParaSlideCarouselLb(lb, carouselLbIndice + 1);
    });

    // arrasta (swipe) — igual ao gesto do Instagram pra trocar de slide
    const stage = lb.querySelector(".carousel-lb-stage");
    let touchStartX = null;
    stage.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(delta) < 40) return;
      irParaSlideCarouselLb(lb, carouselLbIndice + (delta < 0 ? 1 : -1));
    });

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "ArrowLeft") irParaSlideCarouselLb(lb, carouselLbIndice - 1);
      if (e.key === "ArrowRight") irParaSlideCarouselLb(lb, carouselLbIndice + 1);
      if (e.key === "Escape") fechar();
    });

    document.body.appendChild(lb);
  }

  const track = lb.querySelector(".carousel-lb-track");
  track.innerHTML = carouselLbImagens.map(src => /\.(mp4|webm|ogg|mov)$/i.test(src)
    ? `<video src="${src}" controls playsinline loop></video>`
    : `<img src="${src}" alt="">`
  ).join("");

  const dots = lb.querySelector(".carousel-lb-dots");
  dots.innerHTML = carouselLbImagens.length > 1
    ? carouselLbImagens.map((_, i) => `<span class="carousel-lb-dot" data-i="${i}"></span>`).join("")
    : "";
  dots.querySelectorAll(".carousel-lb-dot").forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      irParaSlideCarouselLb(lb, Number(dot.dataset.i));
    });
  });

  lb.querySelector(".carousel-lb-stage").style.aspectRatio = CAROUSEL_LB_ASPECT[tipo] || "1/1";

  atualizarCarouselLb(lb, false);
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

  apps: v => `<div class="panel-app-list">${
    v.map(a => `<div class="panel-app-item">
      <span class="panel-app-icon"><img src="${a.icone || a.img}" alt="" loading="lazy"></span>
      <span class="panel-app-text">
        <span class="panel-app-title">${a.titulo || a.nome || ""}</span>
        ${a.desc ? `<span class="panel-app-desc">${a.desc}</span>` : ""}
      </span>
    </div>`).join("")
  }</div>`,

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
        ? `<div class="panel-video-wrap is-loading">
            <div class="media-skeleton"></div>
            <iframe class="panel-video"
              src="https://www.youtube.com/embed/${yt}" loading="lazy"
              allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
              allowfullscreen></iframe>
          </div>`
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

  botoes: v => {
    const temLista = v.some(b => b.desc || b.badge);
    return `<div class="panel-buttons${temLista ? " panel-buttons-list" : ""}">${
      v.map(b => {
        const attrs = b.popupTitulo
          ? `href="#" data-popup-titulo="${b.popupTitulo}"`
          : `href="${b.url || b.href || "#"}" target="_blank" rel="noopener noreferrer"`;
        if (b.desc || b.badge) {
          return `<a class="panel-btn panel-link-row" ${attrs}>
            <span class="panel-link-row-text">
              <span class="panel-link-row-title">
                ${b.label || b.texto || "Abrir"}${b.badge ? `<span class="panel-link-row-dot">•</span><span class="panel-link-row-badge">${b.badge}</span>` : ""}
              </span>
              ${b.desc ? `<span class="panel-link-row-desc">${b.desc}</span>` : ""}
            </span>
          </a>`;
        }
        return `<a class="panel-btn${b.classe ? ` ${b.classe}` : ""}" ${attrs}${b.cor ? ` style="background:${b.cor}"` : ""}>
          ${b.icone ? `<i class="${b.icone}"></i>` : ""}<span>${b.label || b.texto || "Abrir"}</span>
        </a>`;
      }).join("")
    }</div>`;
  }
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
      <div class="panel-loading-overlay"><div class="splash-spinner"></div></div>
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

  // remove o skeleton de "carregando" de cada vídeo do YouTube quando ele terminar de carregar
  folderPanel.querySelectorAll(".panel-video-wrap.is-loading iframe.panel-video").forEach(iframe => {
    iframe.addEventListener("load", () => {
      iframe.closest(".panel-video-wrap").classList.remove("is-loading");
    }, { once: true });
  });

  folderPanel.querySelectorAll(".audio-player").forEach(montarAudioPlayer);

  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => folderPanel.classList.add("panel-open"));

  // tela de carregamento breve, dá tempo do conteúdo (imagens/vídeos) aparecer
  const loadingOverlay = folderPanel.querySelector(".panel-loading-overlay");
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.add("hide");
      setTimeout(() => loadingOverlay.remove(), 300);
    }, 450);
  }
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

// Itens fixos (commitados direto no repo, fora do Blob) — usados enquanto o
// Blob store estiver suspenso e o upload pelo painel admin não funcionar.
const imagensGrid = [
  {
    titulo: "Filmagem",
    imagem: "novos/filmagem-fuzileiro-real-01.mp4",
    rede: "Filmagem",
    tipo: "Horizontal",
    icone: "fa-solid fa-video",
    cor: "#f97316",
    categoria: "filmagens-1",
  },
  {
    titulo: "Camisa",
    imagem: "novos/camisa-fuzileiro-real-running.jpeg",
    rede: "Camisas",
    tipo: "Camisa",
    icone: "fa-solid fa-shirt",
    cor: "#f8fafc",
    categoria: "camisas",
  },
  {
    titulo: "Arte",
    imagem: "novos/arte-periodos-literarios.jpeg",
    rede: "Instagram",
    tipo: "Post",
    icone: "fa-brands fa-instagram",
    cor: "#E1306C",
    categoria: "arts",
  },
];

const photoGrid = document.getElementById("photoGrid");

// Mapeamento tipo → spans do grid
// todos os tipos ocupam 1 coluna x 1 linha, pra manter o card 4:5 uniforme
const typeConfig = {
  'Horizontal': { col: 'col-span-1', row: 'row-span-1' },
  'Thumbnail':  { col: 'col-span-1', row: 'row-span-1' },
  'Shorts':     { col: 'col-span-1', row: 'row-span-1' },
  'Stories':    { col: 'col-span-1', row: 'row-span-1' },
  'Reels':      { col: 'col-span-1', row: 'row-span-1' },
  'Post':       { col: 'col-span-1', row: 'row-span-1' },
  'Feed':       { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel':  { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel Square':   { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel Vertical': { col: 'col-span-1', row: 'row-span-1' },
  'Carrossel Horizontal': { col: 'col-span-1', row: 'row-span-1' },
  'Camisa':     { col: 'col-span-1', row: 'row-span-1' },
};

// caminho completo (pasta + arquivo) pra identificar o post sem ambiguidade —
// vários arquivos usam o mesmo nome (img1.jpg, img2.jpg...) em pastas diferentes
function nomeDoArquivo(caminho) {
  if (!caminho) return "";
  const semQuery = caminho.split("?")[0];
  try { return decodeURIComponent(semQuery); }
  catch (e) { return semQuery; }
}

// badge fixo pra identificar filmagens (vídeo gravado, não editado a partir
// de material de terceiros) — usado tanto em arquivos locais quanto nos
// links externos do YouTube puxados do popup "Filmagens"
const BADGE_FILMAGENS = { icone: "fa-solid fa-video", cor: "#f97316", label: "Filmagens" };

// badges fixos pra artes vetoriais e peças pensadas pra impressão 3D
const BADGE_VETOR = { icone: "fa-solid fa-bezier-curve", cor: "#06b6d4", label: "Vetor" };
const BADGE_IMPRESSAO_3D = { icone: "fa-solid fa-cube", cor: "#22c55e", label: "Impressão 3D" };

// Badges extras (ícone + texto) para itens específicos do grid, por arquivo.
// Adicione aqui um item por vez: chave = final do caminho do arquivo (o nome
// que aparece na etiqueta preta do card), valor = lista de badges a mostrar
// no canto inferior direito no lugar do ícone único padrão.
// icone = classe do Font Awesome (ex: "fa-brands fa-youtube")
// img   = caminho de uma imagem/logo (ex: "icons/softwares/photshop.png")
const BADGES_EXTRAS_POR_ARQUIVO = {
  "novos/filmagem-fuzileiro-real-01.mp4": [
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "novos/arte-periodos-literarios.jpeg": [
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img39.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Banner Youtube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img40.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Banner Youtube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img45.png": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Banner Youtube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img46.png": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Banner Youtube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img41.png": [BADGE_VETOR, BADGE_IMPRESSAO_3D],
  "artes/img42.png": [BADGE_VETOR],
  "artes/img43.png": [BADGE_VETOR],
  "artes/img44.png": [BADGE_VETOR, BADGE_IMPRESSAO_3D],
  "artes/img15.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img16.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img17.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img18.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img19.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img20.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img21.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img22.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img23.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img24.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img25.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img26.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img27.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img28.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img29.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img30.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img31.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img32.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img33.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img34.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img35.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img36.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img37.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img38.png": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "carrossel-square/adsumus/1.mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
    { img: "icons/softwares/gemini.png", label: "Gemini" },
  ],
  "carrossel-square/carrossel2/1.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "carrossel-square/carrossel3/1.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "carrossel-square/carrossel5/1.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "carrossel-square/carrossel6/01.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "carrossel-horizontal/pasta/img1.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-post/img4.webp": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-feed/🚨 HOJE TEM EPISÓDIO PESADO NO SOPAPIROCAST 🚨Recebemos ninguém menos que Maicon Menegucci, do c.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-feed/670727495_18077362148537098_4111886504108477283_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "artes/img14.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-post/Adsumus é uma palavra em latim que significa “aqui estamos” ou “estamos presentes”. É uma expres.mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel", url: "https://www.instagram.com/p/DUq6rLhkf0k/?img_index=1" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
    { img: "icons/softwares/gemini.png", label: "Gemini" },
  ],
  "instagram-feed/Obrigado, Deus! Sem você nada disso seria possível.  Obrigado por confiar em mim @gabrielsrk_ Qu.mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "instagram-feed/WhatsApp Video 2026-08-23 at 13.26.44.mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
    BADGE_FILMAGENS,
  ],
  "instagram-feed/WhatsApp Video 2026-08-23 at 13.26.43 (1).mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "instagram-feed/WhatsApp Video 2026-08-23 at 13.27.34 (1).mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
    BADGE_FILMAGENS,
  ],
  "instagram-feed/WhatsApp Video 2026-08-23 at 13.26.58.mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
    BADGE_FILMAGENS,
  ],
  "instagram-feed/WhatsApp Video 2026-08-23 at 13.27.34.mp4": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
    BADGE_FILMAGENS,
  ],
  "instagram-feed/WhatsApp Video 2026-08-23 at 13.29.35.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "instagram-feed/De entregar panfletos na rua… a vestir a farda de Bombeiro Militar. 🚒A história do convidado de.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "artes/img10.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-feed/O caminho pode ser árduo, mas a glória de servir à pátria é imensa! 🇧🇷 Não deixe o desânimo ve.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-feed/670790978_18077368583537098_2765453715956229124_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],

  // YouTube + Shorts + Capcut
  "youtube-shorts/RESGATE DO SOLDADO AMERICANO NO IRÃ-00.00.00.000-00.01.00.742.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "youtube-shorts/OPERAÇÃO GUNNERSIDE - O FIM DA BOMBA NUCLEAR DA ALEMANHA-00.00.00.000-00.01.20.717.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "youtube-shorts/O QUE ACONTECEU COM O WAGNER GROUP no Exército Russo_-00.00.00.000-00.01.14.392.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "youtube-shorts/cães robôs na ucrânia.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "youtube-videos/video1.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
  ],
  "youtube-videos/video2.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
  ],
  "youtube-videos/video3.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    BADGE_FILMAGENS,
  ],
  "youtube-videos/video4.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    BADGE_FILMAGENS,
  ],
  "youtube-videos/video5.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    BADGE_FILMAGENS,
  ],
  "youtube-videos/video6.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
  ],
  "youtube-videos/video7.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    BADGE_FILMAGENS,
  ],
  "youtube-videos/video8.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    BADGE_FILMAGENS,
  ],
  "youtube-videos/video9.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    BADGE_FILMAGENS,
  ],
  "youtube-videos/video10.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
  ],
  "youtube-videos/video11.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
    { img: "icons/softwares/gemini.png", label: "Gemini" },
  ],
  "youtube-videos/video12.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
  ],
  "youtube-videos/video13.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
  ],
  "youtube-videos/video14.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
  ],
  "youtube-videos/video15.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
  ],
  "youtube-videos/video16.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
  ],
  "youtube-videos/video17.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
    { img: "icons/softwares/premire.png", label: "Premiere" },
    { img: "icons/softwares/aftereffects.png", label: "After Effects" },
  ],
  "youtube-shorts/O BLINDADO QUE FICOU PRESO NO COMPLEXO DO ALEMÃO.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],

  // Instagram + Feed + Canva
  "instagram-feed/670304144_18077290079537098_2433732863026071099_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-feed/671168997_18076837385537098_2121384986594193615_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-feed/670074538_18077355908537098_9217676397164307827_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-post/Hoje às 20-15 estaremos ao vivo 💪🏻Público feminino já aquece. A sargento está na área @caarolb.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-post/img7.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "carrossel-square/image1/img2 copy 2.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-post/img2.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-post/img3.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-post/img1.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],

  // YouTube + Thumbnail + Photoshop
  "artes/img1.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img4.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img7.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img9.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img6.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-feed/670653872_18077352326537098_3607175384672271427_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Reels" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-feed/Fundada em 1957 e inspirada no SBS britânico, essa unidade é famosa mundialmente por seu treinam.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],

  // Thumbnail YouTube + Photoshop
  "artes/img13.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img2.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],

  "carrossel-vertical/image1/670074538_18077355908537098_9217676397164307827_n.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],

  "instagram-post/img8.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-post/img5.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "instagram-feed/img6.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],

  // YouTube Shorts + Capcut
  "youtube-shorts/O BLINDADO QUE FICOU PRESO NO COMPLEXO DO ALEMÃO-00.00.00.000-00.01.08.194.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
  "instagram-post/Enquanto muitos escolhem o fácil, você segue na missão. A rotina pesa, mas é aí que os aprovados.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Feed" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "instagram-post/Adsumus é uma palavra em latim que significa “aqui estamos” ou “estamos presentes”. É uma expres.jpg": [
    { icone: "fa-brands fa-instagram", cor: "#E1306C", label: "Carrossel" },
    { img: "icons/softwares/canva.png", label: "Canva" },
  ],
  "artes/img8.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img3.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img11.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "artes/img5.jpg": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Thumbnail YouTube" },
    { img: "icons/softwares/photshop.png", label: "Photoshop" },
  ],
  "youtube-shorts/PQDT ALEMÃES na OPERAÇÃO CARVALHO - O RESGATE CINEMATOGRÁFICO-00.00.00.000-00.01.07.311.mp4": [
    { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
    { img: "icons/softwares/capcut.png", label: "Capcut" },
  ],
};

// badges fixos pra todo item da categoria Narração (áudios locais e os
// vídeos do YouTube puxados do popup "Narrações")
const BADGES_NARRACAO = [
  { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "Shorts" },
  { img: "icons/softwares/capcut.png", label: "Capcut" },
  { icone: "fa-solid fa-microphone", cor: "#a855f7", label: "Narração" },
];

// badges fixos pros links externos de vídeo horizontal do YouTube
// (Top Vídeos / Filmagens, puxados do popup e abertos em nova aba)
const BADGES_VIDEO_HORIZONTAL_EXTERNO = [
  { img: "icons/softwares/premire.png", label: "Premiere" },
  { icone: "fa-brands fa-youtube", cor: "#FF0000", label: "YouTube" },
];

// mesmos badges acima + Filmagens, só pros vídeos do popup "Filmagens"
// (categoria "filmagens-1"), sem mexer nos de "Top Vídeos"
const BADGES_VIDEO_HORIZONTAL_FILMAGENS = [...BADGES_VIDEO_HORIZONTAL_EXTERNO, BADGE_FILMAGENS];

// badge fixo pra todo item da categoria Camisas
const BADGES_CAMISAS = [
  { icone: "fa-solid fa-shirt", cor: "#f8fafc", label: "Camisas" },
  { img: "icons/softwares/photshop.png", label: "Photoshop" },
];

// olha só o arquivo que aparece na etiqueta preta (1ª imagem no carrossel),
// pra não misturar badges de arquivos diferentes dentro do mesmo card
function badgesExtrasDoItem(item) {
  if (item.icone === "fa-solid fa-microphone") return BADGES_NARRACAO;
  if (item.categoria === "camisas") return BADGES_CAMISAS;
  if (item.youtubeUrl && item.tipo === "Horizontal") {
    return item.categoria === "filmagens-1"
      ? BADGES_VIDEO_HORIZONTAL_FILMAGENS
      : BADGES_VIDEO_HORIZONTAL_EXTERNO;
  }
  const arq = item.imagens ? item.imagens[0] : item.imagem;
  if (!arq) return null;
  for (const chave in BADGES_EXTRAS_POR_ARQUIVO) {
    if (arq.endsWith(chave)) return BADGES_EXTRAS_POR_ARQUIVO[chave];
  }
  return null;
}

function criarCard(item) {
  const spans = typeConfig[item.tipo] || { col: 'col-span-1', row: 'row-span-1' };
  const card = document.createElement("div");

  const slug = item.tipo.toLowerCase().replace(/\s+/g, "-");
  card.dataset.filter = item.categoria || "filmagens";
  card.className = `
    ${spans.col} ${spans.row} type-${slug}
    group relative overflow-hidden rounded-xl border border-white/10
    bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-1
    sm:rounded-2xl
  `;

  const ehCarrossel = Array.isArray(item.imagens) && item.imagens.length > 0;
  const ehAudio = !ehCarrossel && /\.(mp3|wav|m4a)$/i.test(item.imagem || "");
  const ehYoutube = !ehCarrossel && !ehAudio && !!item.ytId;
  let mediaTag;
  if (ehCarrossel) {
    // slides podem ser imagem ou vídeo (ex: carrossel com um .mp4 no início)
    const slideTag = (src, alt, extra) => /\.(mp4|webm|ogg|mov)$/i.test(src)
      ? `<video src="${src}" muted loop playsinline preload="metadata"${extra || ""}></video>`
      : `<img src="${src}" alt="${alt}"${extra || ""}>`;
    const slides = item.imagens
      .map(src => slideTag(src, item.titulo))
      .join("");
    // clona o primeiro slide ao final p/ loop infinito sem salto
    const clone = item.imagens.length > 1
      ? slideTag(item.imagens[0], "", ' aria-hidden="true"')
      : "";
    mediaTag = `<div class="ig-carousel"><div class="ig-carousel-track">${slides}${clone}</div></div>`;
  } else if (ehAudio) {
    mediaTag = `
      <div class="grid-audio-card">
        <i class="fa-solid fa-waveform-lines grid-audio-icon"></i>
        <button type="button" class="grid-audio-play" aria-label="Reproduzir">
          <i class="fa-solid fa-play"></i>
        </button>
        <audio src="${item.imagem}" preload="metadata"></audio>
      </div>`;
  } else if (ehYoutube) {
    mediaTag = `
      <a href="${item.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="grid-youtube-link">
        <img class="h-full w-full object-cover transition duration-500 group-hover:scale-110" src="https://img.youtube.com/vi/${item.ytId}/hqdefault.jpg" alt="${item.titulo}" loading="lazy">
        <span class="grid-youtube-play"><i class="fa-solid fa-play"></i></span>
      </a>`;
  } else {
    const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(item.imagem);
    mediaTag = isVideo
      ? `<video class="h-full w-full object-cover transition duration-500 group-hover:scale-110 grid-lightbox-video" src="${item.imagem}" muted loop playsinline preload="metadata"></video>`
      : `<img class="h-full w-full object-cover transition duration-500 group-hover:scale-110 grid-lightbox-img" src="${item.imagem}" alt="${item.titulo}" loading="lazy">`;
  }

  const nomeArquivo = ehYoutube
    ? (item.youtubeUrl || "")
    : nomeDoArquivo(ehCarrossel ? item.imagens[0] : item.imagem);
  const rotuloCopiar = ehYoutube ? "Copiar link" : "Copiar nome";
  const badgeHtml = nomeArquivo
    ? `<button type="button" class="grid-file-badge opacity-0 group-hover:opacity-100" title="${nomeArquivo}">${rotuloCopiar}</button>`
    : "";

  const badgesExtras = badgesExtrasDoItem(item);
  if (badgesExtras) card.dataset.badges = badgesExtras.map(b => b.label).join("|");
  const cantoHtml = badgesExtras
    ? badgesExtras.map(b => `
        <${b.url ? `a href="${b.url}" target="_blank" rel="noopener noreferrer"` : "span"} class="grid-tag">
          ${b.img ? `<img src="${b.img}" alt="">` : `<i class="${b.icone}"${b.cor ? ` style="color:${b.cor}"` : ""}></i>`}
          <span class="grid-tag-label">${b.label}</span>
        </${b.url ? "a" : "span"}>
      `).join("")
    : `<a href="#" aria-label="${item.rede}" class="grid-social" style="color:${item.cor}">
        <i class="${item.icone}"></i>
      </a>`;

  // ícone discreto no topo indicando que o card abre um link externo
  const externalBadgeHtml = ehYoutube
    ? `<span class="grid-external-badge" title="Link externo"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>`
    : "";

  card.innerHTML = `
    ${mediaTag}
    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"></div>
    ${badgeHtml}
    ${externalBadgeHtml}
    <div class="absolute inset-x-1.5 bottom-1.5 flex flex-wrap-reverse items-end justify-end gap-2 sm:inset-x-3 sm:bottom-3">
      ${cantoHtml}
    </div>
  `;

  if (ehCarrossel && item.imagens.length > 1) {
    iniciarCarrossel(card.querySelector(".ig-carousel-track"), item.imagens.length);
  }

  // clica na badge do nome do arquivo → copia pra área de transferência
  const fileBadge = card.querySelector(".grid-file-badge");
  if (fileBadge) {
    fileBadge.addEventListener("click", (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(nomeArquivo).then(() => {
        const original = fileBadge.textContent;
        fileBadge.textContent = "Copiado";
        fileBadge.classList.add("is-copied");
        setTimeout(() => {
          fileBadge.textContent = original;
          fileBadge.classList.remove("is-copied");
        }, 1200);
      });
    });
  }

  if (ehAudio) {
    const audio  = card.querySelector("audio");
    const btn    = card.querySelector(".grid-audio-play");
    const icon   = btn.querySelector("i");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (audio.paused) {
        document.querySelectorAll(".grid-audio-card audio, .audio-player audio").forEach(a => {
          if (a !== audio) a.pause();
        });
        audio.play();
      } else {
        audio.pause();
      }
    });
    audio.addEventListener("play",  () => { icon.className = "fa-solid fa-pause"; card.classList.add("is-playing"); });
    audio.addEventListener("pause", () => { icon.className = "fa-solid fa-play";  card.classList.remove("is-playing"); });
    audio.addEventListener("ended", () => { icon.className = "fa-solid fa-play";  card.classList.remove("is-playing"); });
  }

  // clica no carrossel → abre popup com navegação (arrastar/setas/bolinhas, como no Instagram)
  if (ehCarrossel) {
    const carouselEl = card.querySelector(".ig-carousel");
    if (carouselEl) {
      carouselEl.addEventListener("click", () => {
        const track = card.querySelector(".ig-carousel-track");
        const indiceAtual = track ? Number(track.dataset.current || 0) : 0;
        abrirLightboxCarrossel(item.imagens, indiceAtual, item.tipo);
      });
    }
  }

  // clica na imagem → abre em tela cheia (mesma lightbox usada nos popups)
  const lightboxImg = card.querySelector(".grid-lightbox-img");
  if (lightboxImg) {
    lightboxImg.addEventListener("click", () => abrirLightbox(lightboxImg.src));
  }

  // clica no vídeo → abre em tela cheia, com controles e som
  const lightboxVideo = card.querySelector(".grid-lightbox-video");
  if (lightboxVideo) {
    lightboxVideo.addEventListener("click", () => abrirLightbox(lightboxVideo.currentSrc || lightboxVideo.src, "video"));
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
  track.dataset.current = "0";
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
        track.dataset.current = "0";
      }, SLIDE);
    } else {
      track.dataset.current = String(i);
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
let limiteVisivel = Infinity; // padrão inicial: aba "Grid 2x2" (mostra tudo)
const btnMostrarMais = document.getElementById("mostrarMais");

function cardCombina(card) {
  if (filtrosSelecionados.size > 0) {
    const badges = (card.dataset.badges || "").split("|");
    return badges.some(b => filtrosSelecionados.has(b));
  }
  return filtroAtivo === "todas" || card.dataset.filter === filtroAtivo;
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

// FILTROS
let filtroAtivo = "todas";
let filtrosSelecionados = new Set();

// anima saída/entrada dos cards ao trocar o filtro (reaproveitada pelo
// filtro de abas antigo e pelo popup "Filtrar posts")
function atualizarGradeComAnimacao() {
  const cards = [...photoGrid.children];
  cards.forEach(card => {
    if (card.style.display !== "none" && !cardCombina(card)) {
      card.classList.add("card-exit");
    }
  });
  setTimeout(() => {
    cards.forEach(card => card.classList.remove("card-exit"));
    aplicarVisibilidade();
    [...photoGrid.children].forEach(card => {
      if (card.style.display !== "none") {
        card.classList.add("card-enter");
        card.addEventListener("animationend", () => card.classList.remove("card-enter"), { once: true });
      }
    });
  }, 220);
}

document.querySelectorAll(".filter-btn").forEach(btn => {
  // "Visualização Completa" abre o modal próprio, não entra na lógica de aba
  if (btn.id === "fullViewBtn") return;

  // botões com data-popup-titulo abrem um popup (igual às sugestões de
  // busca) em vez de filtrar a grade — não entram na lógica de "aba".
  if (btn.dataset.popupTitulo) {
    btn.addEventListener("click", () => {
      const item = (window.SEARCH_DATA || []).find(it => it.titulo === btn.dataset.popupTitulo);
      if (item && item.conteudo) abrirPasta(item);
    });
    return;
  }

  btn.addEventListener("click", () => {
    filtroAtivo = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const ehInstaface = btn.id === "instafaceBtn";
    const ehGrid2x2 = btn.id === "grid2x2Btn";
    limiteVisivel = (ehInstaface || ehGrid2x2) ? Infinity : LIMITE_PAGINA;
    photoGrid.classList.toggle("grid-instaface", ehInstaface);
    photoGrid.classList.toggle("grid-2x2", ehGrid2x2);

    atualizarGradeComAnimacao();
  });
});

// ── FILTRAR POSTS (popup de múltipla escolha por badge/ferramenta) ──
// valor = label exato do badge (o que fica em card.dataset.badges)
const FILTRO_CATEGORIAS = [
  { valor: "Photoshop",           nome: "Photoshop",     img: "icons/softwares/photshop.png" },
  { valor: "Canva",               nome: "Canva",         img: "icons/softwares/canva.png" },
  { valor: "YouTube",             nome: "YouTube",       icone: "fa-brands fa-youtube",   cor: "#FF0000" },
  { valor: "Shorts",              nome: "YouTube Shorts",icone: "fa-brands fa-youtube",   cor: "#FF0000" },
  { valor: "Feed",                nome: "Feed",          icone: "fa-brands fa-instagram", cor: "#E1306C" },
  { valor: "Reels",               nome: "Reels",         icone: "fa-brands fa-instagram", cor: "#E1306C" },
  { valor: "Carrossel",           nome: "Carrossel",     icone: "fa-brands fa-instagram", cor: "#E1306C" },
  { valor: "Gemini",              nome: "Gemini",        img: "icons/softwares/gemini.png" },
  { valor: "After Effects",       nome: "After Effects", img: "icons/softwares/aftereffects.png" },
  { valor: "Premiere",            nome: "Premiere",      img: "icons/softwares/premire.png" },
  { valor: "Capcut",              nome: "Capcut",        img: "icons/softwares/capcut.png" },
  { valor: "Banner Youtube",      nome: "Banner Youtube",icone: "fa-brands fa-youtube",   cor: "#FF0000" },
  { valor: "Filmagens",           nome: "Filmagens",     icone: "fa-solid fa-video",      cor: "#f97316" },
];

function iconeFiltroHtml(c) {
  return c.img
    ? `<img src="${c.img}" alt="">`
    : `<i class="${c.icone}" style="color:${c.cor}"></i>`;
}

const filtrarPostsBtn  = document.getElementById("filtrarPostsBtn");
const filtroModal      = document.getElementById("filtroModal");
const filtroModalClose = document.getElementById("filtroModalClose");
const filtroModalBody  = document.getElementById("filtroModalBody");
const filtroChips      = document.getElementById("filtroChips");

function renderFiltroChips() {
  if (!filtroChips) return;
  filtroChips.innerHTML = [...filtrosSelecionados].map(valor => {
    const cat = FILTRO_CATEGORIAS.find(c => c.valor === valor);
    return `<button type="button" class="filtro-chip" data-valor="${valor}">
      <span class="filtro-chip-x">✕</span>
      ${cat ? iconeFiltroHtml(cat) : ""}
      ${cat ? cat.nome : valor}
    </button>`;
  }).join("");
  filtroChips.querySelectorAll(".filtro-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      filtrosSelecionados.delete(chip.dataset.valor);
      renderFiltroChips();
      renderFiltroModalBody();
      sincronizarAtalhosFiltro();
      atualizarGradeComAnimacao();
    });
  });
}

function renderFiltroModalBody() {
  if (!filtroModalBody) return;
  filtroModalBody.innerHTML = FILTRO_CATEGORIAS.map(c => `
    <label class="filtro-modal-option">
      <input type="checkbox" value="${c.valor}" ${filtrosSelecionados.has(c.valor) ? "checked" : ""}>
      <span class="filtro-modal-option-icon">${iconeFiltroHtml(c)}</span>
      <span>${c.nome}</span>
    </label>
  `).join("");
  filtroModalBody.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked) filtrosSelecionados.add(cb.value);
      else filtrosSelecionados.delete(cb.value);
      renderFiltroChips();
      sincronizarAtalhosFiltro();
      atualizarGradeComAnimacao();
    });
  });
}

function fecharFiltroModal() {
  filtroModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

if (filtrarPostsBtn && filtroModal) {
  filtrarPostsBtn.addEventListener("click", () => {
    renderFiltroModalBody();
    filtroModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });
  if (filtroModalClose) filtroModalClose.addEventListener("click", fecharFiltroModal);
  filtroModal.addEventListener("click", (e) => {
    if (e.target === filtroModal) fecharFiltroModal();
  });
}

// ── ATALHOS "SOMENTE X" (Photoshop/Canva/Capcut/After) ao lado de "Filtrar posts" ──
// cada atalho alterna (liga/desliga) seu valor no mesmo conjunto usado pelo
// popup "Filtrar posts" — dá pra combinar vários atalhos, ou atalho + popup.
const filtroAtalhosEl = document.getElementById("filtroAtalhos");

function sincronizarAtalhosFiltro() {
  if (!filtroAtalhosEl) return;
  filtroAtalhosEl.querySelectorAll(".filtro-atalho-btn").forEach(btn => {
    btn.classList.toggle("is-active", filtrosSelecionados.has(btn.dataset.valor));
  });
}

if (filtroAtalhosEl) {
  filtroAtalhosEl.querySelectorAll(".filtro-atalho-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const valor = btn.dataset.valor;
      if (filtrosSelecionados.has(valor)) filtrosSelecionados.delete(valor);
      else filtrosSelecionados.add(valor);
      renderFiltroChips();
      sincronizarAtalhosFiltro();
      atualizarGradeComAnimacao();
    });
  });
}

// ── BOTÃO FLUTUANTE DE CHAT (fake chatbot → abre WhatsApp com a mensagem) ──
const chatFloatBtn    = document.getElementById("chatFloatBtn");
const chatWidget      = document.getElementById("chatWidget");
const chatWidgetClose = document.getElementById("chatWidgetClose");
const chatWidgetForm  = document.getElementById("chatWidgetForm");
const chatWidgetInput = document.getElementById("chatWidgetInput");
const chatMessages    = document.getElementById("chatMessages");
const chatSuggestions = document.getElementById("chatSuggestions");

const CHAT_SUGESTOES = [
  "Sim, adorei! 🔥",
  "Quero saber mais",
  "Vamos conversar",
];

function saudacaoPorHorario() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

// bipe curto sintetizado (sem arquivo de áudio) pra cada mensagem do bot
function tocarSomChat() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
    osc.onended = () => ctx.close();
  } catch (e) {}
}

function adicionarBolhaBot(texto) {
  const bolha = document.createElement("div");
  bolha.className = "chat-bubble chat-bubble-bot";
  bolha.textContent = texto;
  chatMessages.appendChild(bolha);
  tocarSomChat();
}

function renderChatSugestoes() {
  chatSuggestions.innerHTML = CHAT_SUGESTOES
    .map(s => `<button type="button" class="chat-suggestion">${s}</button>`)
    .join("");
  chatSuggestions.querySelectorAll(".chat-suggestion").forEach(btn => {
    btn.addEventListener("click", () => enviarMensagemWhatsapp(btn.textContent));
  });
}

function iniciarConversaChat() {
  if (chatMessages.dataset.iniciado) return;
  chatMessages.dataset.iniciado = "1";
  adicionarBolhaBot(`${saudacaoPorHorario()}!`);
  setTimeout(() => {
    adicionarBolhaBot("Queria saber se você gostou do meu portfólio?");
    renderChatSugestoes();
  }, 900);
}

function enviarMensagemWhatsapp(msg) {
  msg = (msg || "").trim();
  if (!msg) return;
  window.open(`https://wa.me/5521973042881?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

function fecharChatWidget() {
  chatWidget.classList.remove("is-open");
  chatFloatBtn.classList.remove("is-open");
}

if (chatFloatBtn && chatWidget) {
  chatFloatBtn.addEventListener("click", () => {
    const abrindo = !chatWidget.classList.contains("is-open");
    if (abrindo) {
      iniciarConversaChat();
      chatWidget.classList.add("is-open");
      chatFloatBtn.classList.add("is-open");
    } else {
      fecharChatWidget();
    }
  });
}
if (chatWidgetClose) chatWidgetClose.addEventListener("click", fecharChatWidget);

if (chatWidgetForm) {
  chatWidgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarMensagemWhatsapp(chatWidgetInput.value);
    chatWidgetInput.value = "";
  });
}

// MODAL "VISUALIZAÇÃO COMPLETA" — painel centralizado com fundo desfocado
// reunindo os botões popup (Filmagens/Top Edições/Artes/Narrações). Não
// mostra a grade de mídia, cada botão abre seu próprio popup de texto.
const fullViewBtn    = document.getElementById("fullViewBtn");
const fullViewModal  = document.getElementById("fullViewModal");
const fullViewClose  = document.getElementById("fullViewClose");

if (fullViewBtn && fullViewModal && fullViewClose) {
  fullViewBtn.addEventListener("click", () => {
    fullViewModal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  function fecharVisualizacaoCompleta() {
    fullViewModal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  fullViewClose.addEventListener("click", fecharVisualizacaoCompleta);
  fullViewModal.addEventListener("click", (e) => {
    if (e.target === fullViewModal) fecharVisualizacaoCompleta();
  });
}

const MEDIA = (window.MEDIA_MANIFEST && window.MEDIA_MANIFEST.files)   || {};
const SUBS  = (window.MEDIA_MANIFEST && window.MEDIA_MANIFEST.subdirs) || {};

async function descobrirMedia(dir) {
  if (MEDIA[dir] && MEDIA[dir].length) return MEDIA[dir];
  const exts = /\.(png|jpe?g|svg|webp|gif|avif|mp4|webm|ogg|mov|mp3|wav|m4a)$/i;
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
      titulo:    config.titulo || nome,
      imagens,
      rede:      config.rede,
      tipo:      config.tipo,
      icone:     config.icone,
      cor:       config.cor,
      categoria: config.categoria,
    });
    photoGrid.appendChild(card);
  }
}

async function carregarPastaNoGrid(dir, config) {
  const arquivos = await descobrirMedia(dir);
  arquivos.forEach((src, i) => {
    const nome = src.split("/").pop().replace(/\.[^.]+$/, "");
    const card = criarCard({
      titulo:    config.titulo || nome,
      imagem:    src,
      rede:      config.rede,
      tipo:      config.tipo,
      icone:     config.icone,
      cor:       config.cor,
      categoria: config.categoria,
    });
    photoGrid.appendChild(card);
  });
}

// "Top Edições" usa os links reais do YouTube (mesma lista do card
// "Top Vídeos" da busca), em vez de arquivos de vídeo locais.
function obterVideosYoutubeDoPopup(titulo) {
  const item = (window.SEARCH_DATA || []).find(it => it.titulo === titulo);
  const videos = (item && item.conteudo && item.conteudo.videos) || [];
  return videos
    .map(v => (typeof v === "string" ? v : v.youtube || v.src))
    .filter(Boolean);
}

function carregarYoutubeTopNoGrid(config) {
  const urls = obterVideosYoutubeDoPopup(config.popupTitulo || "Top Vídeos");
  urls.forEach(url => {
    const id = youtubeId(url);
    if (!id) return;
    const card = criarCard({
      titulo:     config.titulo || "Vídeo",
      youtubeUrl: url,
      ytId:       id,
      rede:       config.rede,
      tipo:       config.tipo,
      icone:      config.icone,
      cor:        config.cor,
      categoria:  config.categoria,
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
    icone:  "fa-brands fa-youtube",
    cor:    "#FF0000",
    categoria: "filmagens-1",
  }),
  carregarYoutubeTopNoGrid({
    titulo: "Vídeo",
    rede:   "YouTube",
    tipo:   "Horizontal",
    icone:  "fa-brands fa-youtube",
    cor:    "#FF0000",
    categoria: "top-edicoes",
  }),
  carregarPastaNoGrid("youtube-videos/", {
    titulo: "YouTube - Horizontal",
    rede:   "YouTube",
    tipo:   "Horizontal",
    icone:  "fa-brands fa-youtube",
    cor:    "#FF0000",
    categoria: "top-edicoes",
  }),
  carregarYoutubeTopNoGrid({
    titulo: "Filmagem",
    popupTitulo: "Filmagens",
    rede:   "YouTube",
    tipo:   "Horizontal",
    icone:  "fa-brands fa-youtube",
    cor:    "#FF0000",
    categoria: "filmagens-1",
  }),
  carregarPastaNoGrid("youtube-shorts/", {
    titulo: "YouTube - Shorts",
    rede:   "YouTube",
    tipo:   "Shorts",
    icone:  "fa-brands fa-youtube",
    cor:    "#FF0000",
    categoria: "top-edicoes",
  }),
  carregarPastaNoGrid("instagram-feed/", {
    titulo: "Instagram - Feed",
    rede:   "Instagram",
    tipo:   "Feed",
    icone:  "fa-brands fa-instagram",
    cor:    "#E1306C",
    categoria: "filmagens-1",
  }),
  carregarPastaNoGrid("instagram-post/", {
    titulo: "Instagram - Post",
    rede:   "Instagram",
    tipo:   "Post",
    icone:  "fa-brands fa-instagram",
    cor:    "#E1306C",
    categoria: "filmagens-1",
  }),
  carregarPastaNoGrid("artes/", {
    titulo: "Arte",
    rede:   "Instagram",
    tipo:   "Post",
    icone:  "fa-brands fa-instagram",
    cor:    "#E1306C",
    categoria: "arts",
  }),
  carregarPastaNoGrid("audio/", {
    titulo: "Narração",
    rede:   "Narração",
    tipo:   "Post",
    icone:  "fa-solid fa-microphone",
    cor:    "#a855f7",
    categoria: "narracoes",
  }),
  carregarPastaNoGrid("camisas/", {
    titulo: "Camisa",
    rede:   "Camisas",
    tipo:   "Camisa",
    icone:  "fa-solid fa-shirt",
    cor:    "#f8fafc",
    categoria: "camisas",
  }),
  carregarYoutubeTopNoGrid({
    titulo: "Narração",
    popupTitulo: "Narrações",
    rede:   "Narração",
    tipo:   "Shorts",
    icone:  "fa-solid fa-microphone",
    cor:    "#a855f7",
    categoria: "narracoes",
  }),
  carregarCarrosseisNoGrid("carrossel-square/", {
    titulo: "Instagram - Carrossel",
    rede:   "Instagram",
    tipo:   "Carrossel Square",
    icone:  "fa-brands fa-instagram",
    cor:    "#E1306C",
    categoria: "filmagens-2",
  }),
  carregarCarrosseisNoGrid("carrossel-vertical/", {
    titulo: "Instagram - Carrossel",
    rede:   "Instagram",
    tipo:   "Carrossel Vertical",
    icone:  "fa-brands fa-instagram",
    cor:    "#E1306C",
    categoria: "filmagens-2",
  }),
  carregarCarrosseisNoGrid("carrossel-horizontal/", {
    titulo: "YouTube - Horizontal",
    rede:   "YouTube",
    tipo:   "Horizontal",
    icone:  "fa-brands fa-youtube",
    cor:    "#FF0000",
    categoria: "filmagens-2",
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

  // sugestões fixas no topo da página (se houver alguma configurada)
  const sugWrap = document.getElementById("topFixedButtons");
  if (sugWrap && Array.isArray(window.SEARCH_SUGGESTIONS)){
    if (!window.SEARCH_SUGGESTIONS.length){
      sugWrap.style.display = "none";
    } else {
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

      window.SEARCH_SUGGESTIONS.forEach(sug => sugWrap.appendChild(criarChip(sug)));
    }
  }
}

// ── POPUP "O QUE VOCÊ PRECISA?" (abre toda vez que o site é aberto) ──
// cada opção aplica um combo de filtros de atalho (mesmo Set usado pelos
// botões de filtro e pelo popup "Filtrar posts"); Filmagens e Política
// ainda não têm combo definido, então só fecham o popup.
const PRECISA_COMBOS = {
  grafica: ["Impressão 3D", "Vetor", "Camisas"],
  photoshop: ["Photoshop"],
  canva: ["Canva"],
  video: ["Capcut", "Premiere", "After Effects"],
  "camisas-canecas": ["Camisas"],
  banners: ["Banner Youtube"],
  efeitos: ["After Effects"],
  carrossel: ["Carrossel"],
  "youtube-videos": ["YouTube"],
  "instagram-posts": ["Reels", "Carrossel", "Feed"],
};

const precisaModal      = document.getElementById("precisaModal");
const precisaModalClose = document.getElementById("precisaModalClose");

function fecharPrecisaModal() {
  if (!precisaModal) return;
  precisaModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

if (precisaModal) {
  precisaModal.querySelectorAll(".precisa-opcao-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const combo = PRECISA_COMBOS[btn.dataset.precisa];
      if (combo) {
        filtrosSelecionados.clear();
        combo.forEach(valor => filtrosSelecionados.add(valor));
        renderFiltroChips();
        sincronizarAtalhosFiltro();
        atualizarGradeComAnimacao();
        fecharPrecisaModal();
        document.getElementById("photoGrid")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        fecharPrecisaModal();
      }
    });
  });

  if (precisaModalClose) precisaModalClose.addEventListener("click", fecharPrecisaModal);
  precisaModal.addEventListener("click", (e) => {
    if (e.target === precisaModal) fecharPrecisaModal();
  });

  precisaModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
