"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ALL_CATEGORIES, FILE_CATEGORIES, GALLERY_CATEGORIES, isGalleryCategory } from "@/lib/categories";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content";
import type { Manifest } from "@/lib/manifest";

type Tab = "upload" | "arquivos" | "conteudo";

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

    const form = new FormData();
    form.set("category", category);
    if (isGallery) form.set("galleryName", galleryName);
    for (const file of Array.from(files)) form.append("files", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
    const data = await res.json();

    if (res.ok) {
      setStatus({ type: "ok", msg: `${files.length} arquivo(s) enviado(s) com sucesso.` });
      setFiles(null);
      setGalleryName("");
      const input = document.getElementById("file-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } else {
      setStatus({ type: "error", msg: data.error || "Erro ao enviar." });
    }
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
        {status.type === "loading" ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

function ArquivosTab() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

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
    setDeleting(url);
    await fetch("/api/files", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dir, url }),
    });
    setDeleting(null);
    load();
  }

  if (loading) return <p className="text-white/60">Carregando...</p>;

  const dirs = Object.keys(manifest?.files || {}).filter((d) => (manifest?.files[d] || []).length > 0);

  if (dirs.length === 0) {
    return <p className="text-white/60">Nenhum arquivo enviado pelo painel ainda.</p>;
  }

  return (
    <div className="space-y-8">
      {dirs.map((dir) => (
        <div key={dir}>
          <h3 className="mb-3 text-sm font-semibold text-white/70">{dir}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {(manifest?.files[dir] || []).map((url) => {
              const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(url);
              return (
                <div key={url} className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/30">
                  {isVideo ? (
                    <video src={url} className="h-24 w-full object-cover" muted />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={url} alt="" className="h-24 w-full object-cover" />
                  )}
                  <button
                    onClick={() => handleDelete(dir, url)}
                    disabled={deleting === url}
                    className="absolute inset-x-0 bottom-0 bg-red-600/90 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 disabled:opacity-50"
                  >
                    {deleting === url ? "..." : "Excluir"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
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
    ["heroTitleLine1", "Título — linha 1"],
    ["heroTitleLine2", "Título — linha 2"],
    ["heroSubtitle", "Subtítulo"],
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
