"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ALL_CATEGORIES, FILE_CATEGORIES, GALLERY_CATEGORIES, isGalleryCategory, resolveDirTarget } from "@/lib/categories";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";
import { DEFAULT_BIO, type Bio } from "@/lib/bio";
import { DEFAULT_PORTFOLIO_CARDS, type PortfolioCard, type PortfolioPill } from "@/lib/portfolio";
import { uploadFilesToBlob } from "@/lib/clientUpload";
import type { Manifest } from "@/lib/manifest";

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-violet-600 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

type Tab = "upload" | "arquivos" | "conteudo" | "bio" | "cards";

export default function DashboardPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("upload");

  return (
    <div className="flex flex-1 flex-col bg-[#0b0b0f] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <h1 className="text-lg font-bold">Painel Admin — Mateus Alves</h1>
        <button
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
          }}
          className="rounded-lg border border-white/10 px-4 py-1.5 text-sm text-white/80 hover:bg-white/10"
        >
          Sair
        </button>
      </header>

      <nav className="flex gap-2 border-b border-white/10 px-6 py-3">
        {(
          [
            ["upload", "Upload de Mídia"],
            ["arquivos", "Arquivos"],
            ["conteudo", "Editar Textos"],
            ["bio", "Bio"],
            ["cards", "Cards do Portfólio"],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              tab === key ? "bg-violet-600 text-white" : "text-white/60 hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className="flex-1 px-6 py-8">
        {tab === "upload" && <UploadTab />}
        {tab === "arquivos" && <ArquivosTab />}
        {tab === "conteudo" && <ConteudoTab />}
        {tab === "bio" && <BioTab />}
        {tab === "cards" && <CardsTab />}
      </main>
    </div>
  );
}

function UploadTab() {
  const [category, setCategory] = useState(FILE_CATEGORIES[0].key);
  const [galleryName, setGalleryName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "ok" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });
  const [progress, setProgress] = useState(0);

  const isGallery = isGalleryCategory(category);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!files || files.length === 0) {
      setStatus({ type: "error", msg: "Selecione ao menos um arquivo." });
      return;
    }
    if (isGallery && !galleryName.trim()) {
      setStatus({ type: "error", msg: "Dê um nome para a galeria/carrossel." });
      return;
    }

    setStatus({ type: "loading", msg: "Enviando..." });
    setProgress(0);

    const fileCount = files.length;
    const res = await uploadFilesToBlob(Array.from(files), category, isGallery ? galleryName : "", setProgress);

    if (res.ok) {
      setStatus({ type: "ok", msg: `${fileCount} arquivo(s) enviado(s) com sucesso.` });
      setFiles(null);
      setGalleryName("");
      const input = document.getElementById("file-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } else {
      setStatus({ type: "error", msg: res.error || "Erro ao enviar." });
    }
    setProgress(0);
  }

  const categoryDef = ALL_CATEGORIES.find((c) => c.key === category);

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <div>
        <label className="mb-1 block text-sm text-white/70">Categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-violet-500"
        >
          <optgroup label="Itens diretos">
            {FILE_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="Galerias / Carrosséis">
            {GALLERY_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {isGallery && (
        <div>
          <label className="mb-1 block text-sm text-white/70">Nome da galeria</label>
          <input
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            placeholder="Ex: Campanha Setembro"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-violet-500"
          />
          <p className="mt-1 text-xs text-white/40">
            Cada nome cria um carrossel novo. Reenviar com o mesmo nome adiciona mais itens a ele.
          </p>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-white/70">Arquivos</label>
        <input
          id="file-input"
          type="file"
          multiple
          accept={categoryDef?.accept}
          onChange={(e) => setFiles(e.target.files)}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white file:mr-3 file:rounded-md file:border-0 file:bg-violet-600 file:px-3 file:py-1.5 file:text-white"
        />
      </div>

      {status.type === "loading" && (
        <div className="space-y-1">
          <ProgressBar percent={progress} />
          <p className="text-xs text-white/50">{progress}%</p>
        </div>
      )}

      {status.type !== "idle" && status.type !== "loading" && (
        <p className={status.type === "error" ? "text-sm text-red-400" : "text-sm text-green-400"}>{status.msg}</p>
      )}

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
      >
        {status.type === "loading" ? `Enviando... ${progress}%` : "Enviar"}
      </button>
    </form>
  );
}

function ArquivosTab() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [addProgress, setAddProgress] = useState<Record<string, number>>({});
  const fileInputs = useRefMap<HTMLInputElement>();

  async function load() {
    setLoading(true);
    const res = await fetch("/api/files", { cache: "no-store" });
    const data = await res.json();
    setManifest(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(dir: string, url: string) {
    if (!confirm("Excluir este arquivo?")) return;
    setBusy(url);
    const res = await fetch("/api/files", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dir, url }),
    });
    setBusy(null);
    if (res.ok) {
      const data = await res.json();
      setManifest(data.manifest);
    }
  }

  async function handleMove(dir: string, index: number, delta: number) {
    if (!manifest) return;
    const list = manifest.files[dir] || [];
    const target = index + delta;
    if (target < 0 || target >= list.length) return;

    const newOrder = list.slice();
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];

    setBusy(dir);
    const res = await fetch("/api/files", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dir, order: newOrder }),
    });
    setBusy(null);
    if (res.ok) {
      const data = await res.json();
      setManifest(data.manifest);
    }
  }

  async function handleAdd(dir: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    const { category, galleryName } = resolveDirTarget(dir);

    setBusy(dir);
    setAddProgress((prev) => ({ ...prev, [dir]: 0 }));
    const res = await uploadFilesToBlob(Array.from(files), category, galleryName || "", (percent) =>
      setAddProgress((prev) => ({ ...prev, [dir]: percent }))
    );
    setBusy(null);
    setAddProgress((prev) => {
      const next = { ...prev };
      delete next[dir];
      return next;
    });
    if (res.ok && res.manifest) {
      setManifest(res.manifest);
    } else {
      load();
    }
    const input = fileInputs.get(dir);
    if (input) input.value = "";
  }

  if (loading) return <p className="text-white/60">Carregando...</p>;

  const dirs = Object.keys(manifest?.files || {}).sort();

  if (dirs.length === 0) {
    return <p className="text-white/60">Nenhum arquivo ainda.</p>;
  }

  return (
    <div className="space-y-8">
      {dirs.map((dir) => {
        const items = manifest?.files[dir] || [];
        return (
          <div key={dir}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white/70">{dir}</h3>
              <button
                onClick={() => fileInputs.get(dir)?.click()}
                disabled={busy === dir}
                className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/10 disabled:opacity-50"
              >
                + Adicionar
              </button>
              <input
                ref={(el) => fileInputs.set(dir, el)}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleAdd(dir, e.target.files)}
              />
            </div>

            {dir in addProgress && (
              <div className="mb-3 space-y-1">
                <ProgressBar percent={addProgress[dir]} />
                <p className="text-xs text-white/50">Enviando... {addProgress[dir]}%</p>
              </div>
            )}

            {items.length === 0 ? (
              <p className="text-xs text-white/40">Vazio.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {items.map((url, index) => {
                  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(url);
                  return (
                    <div key={url} className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30">
                      {isVideo ? (
                        <video src={url} className="h-24 w-full object-cover" muted />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt="" className="h-24 w-full object-cover" />
                      )}

                      <div className="absolute inset-x-0 top-0 flex justify-between px-1 pt-1 opacity-0 transition group-hover:opacity-100">
                        <button
                          onClick={() => handleMove(dir, index, -1)}
                          disabled={index === 0 || busy === dir}
                          className="rounded bg-black/70 px-1.5 text-xs text-white disabled:opacity-30"
                          title="Mover para trás"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => handleMove(dir, index, 1)}
                          disabled={index === items.length - 1 || busy === dir}
                          className="rounded bg-black/70 px-1.5 text-xs text-white disabled:opacity-30"
                          title="Mover para frente"
                        >
                          ▶
                        </button>
                      </div>

                      <button
                        onClick={() => handleDelete(dir, url)}
                        disabled={busy === url}
                        className="absolute inset-x-0 bottom-0 bg-red-600/90 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 disabled:opacity-50"
                      >
                        {busy === url ? "..." : "Excluir"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function useRefMap<T>() {
  const [map] = useState(() => new Map<string, T | null>());
  return {
    get: (key: string) => map.get(key) ?? null,
    set: (key: string, value: T | null) => {
      map.set(key, value);
    },
  };
}

function BioTab() {
  const [bio, setBio] = useState<Bio>(DEFAULT_BIO);
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "ok" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });

  useEffect(() => {
    fetch("/api/bio", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setBio(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Salvando..." });

    const form = new FormData();
    form.set("markdown", bio.markdown);
    form.set("botaoLabel", bio.botaoLabel);
    form.set("botaoUrl", bio.botaoUrl);
    form.set("imagemAtual", bio.imagem);
    if (photo) form.set("photo", photo);

    const res = await fetch("/api/bio", { method: "POST", body: form });
    if (res.ok) {
      const data = await res.json();
      setBio(data.bio);
      setPhoto(null);
      setStatus({ type: "ok", msg: "Bio salva!" });
    } else {
      setStatus({ type: "error", msg: "Erro ao salvar." });
    }
  }

  if (loading) return <p className="text-white/60">Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className="mb-1 block text-sm text-white/70">Foto de perfil</label>
        <div className="flex items-center gap-4">
          {bio.imagem && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={bio.imagem} alt="" className="h-16 w-16 rounded-full object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
            className="text-sm text-white/80 file:mr-3 file:rounded-md file:border-0 file:bg-violet-600 file:px-3 file:py-1.5 file:text-white"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70">Texto (markdown)</label>
        <textarea
          value={bio.markdown}
          onChange={(e) => setBio({ ...bio, markdown: e.target.value })}
          rows={18}
          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-white outline-none focus:border-violet-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-white/70">Texto do botão</label>
          <input
            value={bio.botaoLabel}
            onChange={(e) => setBio({ ...bio, botaoLabel: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-violet-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Link do botão</label>
          <input
            value={bio.botaoUrl}
            onChange={(e) => setBio({ ...bio, botaoUrl: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {status.type !== "idle" && (
        <p
          className={
            status.type === "error" ? "text-sm text-red-400" : status.type === "ok" ? "text-sm text-green-400" : "text-sm text-white/60"
          }
        >
          {status.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
      >
        {status.type === "loading" ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}

function blankCard(): PortfolioCard {
  return {
    id: "card-" + Date.now(),
    titulo: "Novo card",
    subtitulo: "",
    icone: "fa-solid fa-star",
    from: "#7c3aed",
    to: "#312e81",
    tab: "#a78bfa",
    fullWidth: false,
    iconFolder: "",
    socialAnim: false,
    pillCorner: "",
    iconPills: [],
    markdown: "",
  };
}

function CardsTab() {
  const [cards, setCards] = useState<PortfolioCard[]>(DEFAULT_PORTFOLIO_CARDS);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "ok" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });

  useEffect(() => {
    fetch("/api/portfolio-cards", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setCards(data.cards);
        setLoading(false);
      });
  }, []);

  function updateCard(index: number, patch: Partial<PortfolioCard>) {
    setCards((prev) => prev.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function moveCard(index: number, delta: number) {
    setCards((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = prev.slice();
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function removeCard(index: number) {
    if (!confirm("Excluir este card?")) return;
    setCards((prev) => prev.filter((_, i) => i !== index));
  }

  function addCard() {
    setCards((prev) => [...prev, blankCard()]);
  }

  function updatePill(cardIndex: number, pillIndex: number, patch: Partial<PortfolioPill>) {
    setCards((prev) =>
      prev.map((c, i) => {
        if (i !== cardIndex) return c;
        const pills = c.iconPills.map((p, pi) => (pi === pillIndex ? { ...p, ...patch } : p));
        return { ...c, iconPills: pills };
      })
    );
  }

  function addPill(cardIndex: number) {
    setCards((prev) =>
      prev.map((c, i) => (i === cardIndex ? { ...c, iconPills: [...c.iconPills, { texto: "" }] } : c))
    );
  }

  function removePill(cardIndex: number, pillIndex: number) {
    setCards((prev) =>
      prev.map((c, i) => (i === cardIndex ? { ...c, iconPills: c.iconPills.filter((_, pi) => pi !== pillIndex) } : c))
    );
  }

  async function handleSave() {
    setStatus({ type: "loading", msg: "Salvando..." });
    const res = await fetch("/api/portfolio-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards }),
    });
    if (res.ok) {
      setStatus({ type: "ok", msg: "Cards salvos! O site já reflete as mudanças." });
    } else {
      setStatus({ type: "error", msg: "Erro ao salvar." });
    }
  }

  if (loading) return <p className="text-white/60">Carregando...</p>;

  return (
    <div className="max-w-3xl space-y-6">
      {cards.map((card, index) => (
        <div key={card.id} className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white/90">{card.titulo || "(sem título)"}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moveCard(index, -1)}
                disabled={index === 0}
                className="rounded border border-white/10 px-2 py-1 text-xs text-white/70 disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveCard(index, 1)}
                disabled={index === cards.length - 1}
                className="rounded border border-white/10 px-2 py-1 text-xs text-white/70 disabled:opacity-30"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={() => removeCard(index)}
                className="rounded border border-red-500/30 px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
              >
                Excluir
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-white/60">Título</label>
              <input
                value={card.titulo}
                onChange={(e) => updateCard(index, { titulo: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Subtítulo</label>
              <input
                value={card.subtitulo}
                onChange={(e) => updateCard(index, { subtitulo: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Ícone (classe Font Awesome)</label>
              <input
                value={card.icone}
                onChange={(e) => updateCard(index, { icone: e.target.value })}
                placeholder="fa-solid fa-star"
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Pasta de ícones de fundo (opcional)</label>
              <input
                value={card.iconFolder}
                onChange={(e) => updateCard(index, { iconFolder: e.target.value })}
                placeholder="icons/softwares/"
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Cor inicial</label>
              <input
                type="color"
                value={card.from}
                onChange={(e) => updateCard(index, { from: e.target.value })}
                className="h-9 w-full rounded-lg border border-white/10 bg-black/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Cor final</label>
              <input
                type="color"
                value={card.to}
                onChange={(e) => updateCard(index, { to: e.target.value })}
                className="h-9 w-full rounded-lg border border-white/10 bg-black/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Cor da aba</label>
              <input
                type="color"
                value={card.tab}
                onChange={(e) => updateCard(index, { tab: e.target.value })}
                className="h-9 w-full rounded-lg border border-white/10 bg-black/30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-white/60">Posição das pills</label>
              <select
                value={card.pillCorner}
                onChange={(e) => updateCard(index, { pillCorner: e.target.value as PortfolioCard["pillCorner"] })}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
              >
                <option value="">Padrão</option>
                <option value="top-right">Canto superior direito</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={card.fullWidth}
                onChange={(e) => updateCard(index, { fullWidth: e.target.checked })}
              />
              Card largura total
            </label>
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={card.socialAnim}
                onChange={(e) => updateCard(index, { socialAnim: e.target.checked })}
              />
              Alternar pills automaticamente
            </label>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/60">Pills (habilidades/ferramentas mostradas no card)</label>
            <div className="space-y-2">
              {card.iconPills.map((pill, pillIndex) => (
                <div key={pillIndex} className="flex gap-2">
                  <input
                    value={pill.texto}
                    onChange={(e) => updatePill(index, pillIndex, { texto: e.target.value })}
                    placeholder="Texto"
                    className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
                  />
                  <input
                    value={pill.img || ""}
                    onChange={(e) => updatePill(index, pillIndex, { img: e.target.value })}
                    placeholder="caminho do ícone (opcional)"
                    className="flex-1 rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={() => removePill(index, pillIndex)}
                    className="rounded border border-red-500/30 px-2 text-xs text-red-400 hover:bg-red-500/10"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addPill(index)}
              className="mt-2 rounded-lg border border-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
            >
              + Adicionar pill
            </button>
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/60">Conteúdo (markdown, aberto ao clicar no card)</label>
            <textarea
              value={card.markdown}
              onChange={(e) => updateCard(index, { markdown: e.target.value })}
              rows={10}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 font-mono text-sm text-white outline-none focus:border-violet-500"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCard}
        className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
      >
        + Adicionar novo card
      </button>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={status.type === "loading"}
          className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
        >
          {status.type === "loading" ? "Salvando..." : "Salvar tudo"}
        </button>
        {status.type !== "idle" && (
          <p
            className={
              status.type === "error" ? "text-sm text-red-400" : status.type === "ok" ? "text-sm text-green-400" : "text-sm text-white/60"
            }
          >
            {status.msg}
          </p>
        )}
      </div>
    </div>
  );
}

function ConteudoTab() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "ok" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });

  useEffect(() => {
    fetch("/api/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Salvando..." });
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      setStatus({ type: "ok", msg: "Salvo! O site já reflete as mudanças." });
    } else {
      setStatus({ type: "error", msg: "Erro ao salvar." });
    }
  }

  if (loading) return <p className="text-white/60">Carregando...</p>;

  const fields: [keyof SiteContent, string][] = [
    ["siteTitle", "Título da aba do navegador"],
    ["heroTitleLine1", "Título — linha 1"],
    ["heroTitleLine2", "Título — linha 2"],
    ["heroSubtitle", "Subtítulo"],
    ["searchPlaceholder", "Texto de exemplo na busca"],
    ["searchButtonLabel", "Texto do botão de busca"],
    ["showMoreLabel", "Texto do botão \"mostrar mais\""],
    ["instagramHandle", "Instagram (@handle)"],
    ["linkedinName", "Nome no LinkedIn"],
    ["email", "E-mail de contato"],
    ["facebookName", "Nome no Facebook"],
    ["whatsappNumber", "WhatsApp (somente números)"],
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="mb-1 block text-sm text-white/70">{label}</label>
          <input
            value={content[key] ?? ""}
            onChange={(e) => setContent({ ...content, [key]: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-violet-500"
          />
        </div>
      ))}

      {status.type !== "idle" && (
        <p
          className={
            status.type === "error" ? "text-sm text-red-400" : status.type === "ok" ? "text-sm text-green-400" : "text-sm text-white/60"
          }
        >
          {status.msg}
        </p>
      )}

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
      >
        {status.type === "loading" ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
