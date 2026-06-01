/* ════════════════════════════════════════════════════════════════
   DADOS DA BARRA DE PESQUISA
   Tudo que aparece na busca fica AQUI. Edite/adicione itens livremente.

   Modelo de um item:
   {
     titulo:    "Título do resultado",
     subtitulo: "linha pequena abaixo do título",
     icone:     "fa-solid fa-user",      // ícone Font Awesome
     from:      "#7c3aed",               // cor inicial do gradiente
     to:        "#312e81",               // cor final do gradiente
     conteudo: {
       tags: ["tag1", "tag2"],
       texto: "parágrafo único",         // use 'texto' OU 'lista'
       // lista: ["item 1", "item 2"],

       // ── MÍDIA (todos opcionais) ──
      imagens: ["img/foto.jpg", "img/2.jpg"],  // ou imagem: "..."
       videos: [
        "video/clip.mp4",                              // mp4 interno
         { youtube: "https://youtu.be/ID_DO_VIDEO" },   // YouTube
        { src: "video/x.mp4", poster: "cap.jpg" }
       ],
      audios: [ { src: "audio/faixa.mp3", titulo: "Nome da faixa" } ],
       botoes: [
         { label: "Ver no Instagram", url: "https://...", icone: "fa-brands fa-instagram", cor: "#e1306c" }
       ]
     }
   }
   ════════════════════════════════════════════════════════════════ */
window.SEARCH_DATA = [
  {
    titulo: "Quem é Mateus Alves?",
    subtitulo: "",
    icone: "fa-solid fa-user",
    from: "#7c3aed",
    to: "#312e81",
    conteudo: {
      imagens: ["img/foto-perfil.png"],
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

      botoes: [
        { label: "Instagram", url: "https://instagram.com/mateusalvesdzn", icone: "fa-brands fa-instagram", cor: "#e1306c" },
      ]
    }
  
  },
 

  {
    titulo: "Top Vídeos",
    subtitulo: "Empresa de entretenimento militar",
    icone: "fa-solid fa-medal",
    from: "#991b1b",
    to: "#450a0a",
    conteudo: {
      tags: ["Fuzileiro Real", "SóPapiro Cast"],
      texto: "",

      videos: [
      { youtube: "https://www.youtube.com/watch?v=BdJ2YuMLI6o" },
      { youtube: "https://www.youtube.com/watch?v=xDNohA1g95Q&t=3987s&pp=ygUMc29wYXBpcm9jYXN0" },
      { youtube: "https://www.youtube.com/watch?v=Ege0w0VGA-E" },
      { youtube: "https://www.youtube.com/watch?v=DOZ8sEmBicA" },
      { youtube: "https://www.youtube.com/watch?v=q0nJpIang84&t=38s" },
      { youtube: "https://www.youtube.com/watch?v=lU5BK3WV29o&t=45s" },
      { youtube: "https://www.youtube.com/watch?v=jUo3fcsv2Lw" },
      { youtube: "https://www.youtube.com/watch?v=Fc1G3STYcG8" },
      { youtube: "https://www.youtube.com/watch?v=yyJ0kNW-Ws8" },
      { youtube: "https://www.youtube.com/watch?v=T6XD2nhZuQs" },      
      { youtube: "https://www.youtube.com/watch?v=q62hJAwbkqw" },

      ],

      
      imagens: [
        
      ],
      
      botoes: [
        { label: "Instagram Fuzileiro Real", url: "https://instagram.com/", icone: "fa-brands fa-instagram", cor: "#e1306c" },
        { label: "Canal no YouTube", url: "https://youtube.com/", icone: "fa-brands fa-youtube", cor: "#ff0000" }
      ]
    }
  },

  {
    titulo: "Filmagens",
    subtitulo: "Apesar de não ser meu ponto forte, quando necessário também faço filmagens.",
    icone: "fa-solid fa-medal",
    from: "#991b1b",
    to: "#450a0a",
    conteudo: {
      tags: ["Fuzileiro Real", "SóPapiro Cast"],
      texto: "",

      videos: [
      { youtube: "https://www.youtube.com/watch?v=TAjIHNvySjU&pp=0gcJCSALAYcqIYzv" },        
      { youtube: "https://www.youtube.com/watch?v=arLDWv76ZO4&t=4s" },
      { youtube: "https://www.youtube.com/watch?v=ObU3V1tyk9c&t=464s" },
      { youtube: "https://www.youtube.com/watch?v=VX2JSaMliDY&t=2067s" },
      { youtube: "https://www.youtube.com/watch?v=nHLb_mBnWOg" },
      ],

      
      imagens: [

      ],
      
      botoes: [
        { label: "Instagram Fuzileiro Real", url: "https://instagram.com/", icone: "fa-brands fa-instagram", cor: "#e1306c" },
        { label: "Canal no YouTube", url: "https://youtube.com/", icone: "fa-brands fa-youtube", cor: "#ff0000" }
      ]
    }
  },

  {
    titulo: "Artes",
    subtitulo: "Empresa de entretenimento militar",
    icone: "fa-solid fa-medal",
    from: "#991b1b",
    to: "#450a0a",
    conteudo: {
      tags: ["Fuzileiro Real", "SóPapiroCast"],
      texto: "",

      youtube: "", 

      videos: [],
      imagens: [
        "artes/img1.jpg",
        "artes/img2.jpg",
        "artes/img3.jpg",
        "artes/img4.jpg",
        "artes/img5.jpg",
        "artes/img6.jpg",
        "artes/img7.jpg",
        "artes/img8.jpg",
        "artes/img9.jpg",
        "artes/img10.jpg",
        "artes/img11.jpg",
        "artes/img12.jpg",
      ],
      botoes: [
      ]
    }
  },
  
  {
    titulo: "O segredo para Gerenciar tudo",
    subtitulo: "",
    icone: "fa-solid fa-star",
    from: "#f97316",
    to: "#7c2d12",
    conteudo: {
      tags: [],
      lista: [
        "Consigo gerenciar tudo isso por meio da combinação entre experiência, organização e automação. Utilizo ferramentas de inteligência artificial, aplicativos desenvolvidos por mim e softwares especializados para acelerar processos, automatizar tarefas repetitivas e otimizar a produção de conteúdo. Dessa forma, consigo administrar redes sociais, editar vídeos e imagens, criar materiais em escala e manter um fluxo de trabalho eficiente."
      ]
    }
  },

   {
    titulo: "Narrações",
    subtitulo: "",
    icone: "fa-solid fa-star",
    from: "#f97316",
    to: "#7c2d12",
    conteudo: {
      tags: [],
      videos: [
        
          { youtube: "https://www.youtube.com/shorts/sj8RmTRlcIs" },   
          { youtube: "https://www.youtube.com/shorts/7OAps0oIC5k" },
          { youtube: "https://www.youtube.com/shorts/g0fA4VsUtqA" },
          { youtube: "https://www.youtube.com/shorts/bJ7H0Gna0V8" },
          { youtube: "https://www.youtube.com/shorts/8rSZieTIStw" },      
          { youtube: "https://www.youtube.com/shorts/tKo9FpaiwnY" },    
          { youtube: "https://www.youtube.com/shorts/UyeKL5YRUJ4" },   
          { youtube: "https://www.youtube.com/shorts/BTWd9II1EkM" },              
          { youtube: "https://www.youtube.com/shorts/ueHVOFAqOww" },              
          { youtube: "https://www.youtube.com/shorts/KKzofdtT6Bk" },    
          { youtube: "https://www.youtube.com/shorts/XArUWljltEk" },    
          { youtube: "https://www.youtube.com/shorts/NBLCWfwvb0c" },    
          { youtube: "https://www.youtube.com/shorts/8rSZieTIStw" },   

          { youtube: "https://www.youtube.com/shorts/uKT5LWsiMGg" },
          { youtube: "https://www.youtube.com/shorts/dXTqIi_j4uI" },
          { youtube: "https://www.youtube.com/shorts/NuxeotJNdkM" },
          { youtube: "https://www.youtube.com/shorts/28TLicWddSo" },
          ],
        }
  },

   {
    titulo: "Meus Apps",
    subtitulo: "",
    icone: "fa-solid fa-star",
    from: "#f97316",
    to: "#7c2d12",
    conteudo: {
      tags: [],
      markdown: `


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
    }
  },
 
    {
    titulo: "Pessoas Famosas",
    subtitulo: "",
    icone: "fa-solid fa-star",
    from: "#f97316",
    to: "#7c2d12",
    conteudo: {
      tags: [],
      markdown: `


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
    }
  }, 


  {
    titulo: "Currículo",
    subtitulo: "",
    icone: "fa-solid fa-address-card",
    from: "#7c3aed",
    to: "#1e1b4b",
    conteudo: {
      botoes: [
        { label: "Baixar currículo", url: "pdf/curriculo.pdf", icone: "fa-solid fa-file-arrow-down", cor: "#7c3aed" },
        { label: "LinkedIn", url: "https://linkedin.com/", icone: "fa-brands fa-linkedin", cor: "#0a66c2" }
      ],

            markdown: `



# Mateus Alves, 27 Anos


### Perfil Profissional
Tenho experiência em gestão de redes sociais, criação de vídeos, criação de imagens e automatização de processos por meio de inteligência artificial, JavaScript e Python.

---

### Experiências Profissionais

### Exército Brasileiro
* Função: Gerenciamento de instagram e filmagens de formaturas.

### [Fuzileiro Real](https://www.youtube.com/@fuzileiroreal)
* Função: Narração, Produção de Podcasts, Cortes e documetários.

### [SóPapiro Podcast](https://www.youtube.com/@sopapirocast)
* Funções: Produção de Podcasts, Cortes e documetários.

---

### Funções e Competências Práticas
* Planejamento de Postagens e Gerenciamento de Instagram e YouTube
* Roteirista e Narração de Vídeos
* Edição de Imagens e Edição de Vídeos Verticais e Horizontais
* Filmagem de documentários
* Criação de Landing Pages e Loja Virtual

---

### Habilidades Técnicas

### Design e Edição de Imagem
* Photoshop - Imagens Complexas
* Canva - Imagens simples e automação
* Indesign - Diagramação e criação de apostilas (Raramente usado)
* Affinity Designer - Costumo usar para Upscale de Imagens
* Illustrator (Raramente usado)
* Inkscape - Utilizado para vetorizar imagens

### Edição de Vídeo e Efeitos
* Premiere - Vídeos complexos
* Capcut - Vídeos simples e rápidos
* After Effects - Efeitos Especiais

### Programação
* Python
* Javascript

### Automação de Postagens
* Buffer
---

## Formação Acadêmica
* Ensino Médio Complexo
* Cursando Análise e Desenvolvimento de Sistemas

---
**Contato:**
* Telefone: (21) 97304-2881
* E-mail: mateusalves.flu@gmail.com
* Endereço: R. Silvia Cordoniz, Mesquita - CEP 26582-260

**Portfólio:**
* Simplificado: mateusalvesedits.vercel.app
* [Antigo](sites.google.com/view/mateusalves)

**Redes Sociais:**
* [Instagram](https://www.instagram.com/mateusalvesdzn)
* [Whatsapp - 21 97304-2881](https://api.whatsapp.com/send?phone=5521973042881&text=Ol%C3%A1%2C+Mateus%21)

---

`,

    }
  }
];
