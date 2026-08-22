import { upload } from "@vercel/blob/client";
import { resolveTargetDir, sanitizeFilename } from "./uploadPath";
import type { Manifest } from "./manifest";

export type ClientUploadResult = { ok: boolean; error?: string; manifest?: Manifest };

// Envia os arquivos direto do navegador pro Vercel Blob (sem passar pelo corpo
// da function, que tem limite pequeno) e, ao terminar, registra as URLs no
// manifesto através de /api/upload/confirm.
export async function uploadFilesToBlob(
  files: File[],
  category: string,
  galleryName: string,
  onProgress: (percent: number) => void
): Promise<ClientUploadResult> {
  if (files.length === 0) return { ok: false, error: "Nenhum arquivo selecionado" };

  const targetDir = resolveTargetDir(category, galleryName);
  const progressPerFile = new Array(files.length).fill(0);

  function reportProgress() {
    const total = progressPerFile.reduce((a, b) => a + b, 0);
    onProgress(Math.round(total / files.length));
  }

  try {
    const results = await Promise.all(
      files.map((file, index) =>
        upload(`${targetDir}${sanitizeFilename(file.name)}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          onUploadProgress: (event) => {
            progressPerFile[index] = event.percentage;
            reportProgress();
          },
        })
      )
    );

    const confirmRes = await fetch("/api/upload/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category,
        galleryName,
        urls: results.map((r) => r.url),
      }),
    });

    const data = await confirmRes.json().catch(() => null);

    if (!confirmRes.ok) {
      return { ok: false, error: data?.error || "Erro ao registrar arquivos" };
    }

    return { ok: true, manifest: data?.manifest };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Erro ao enviar arquivos" };
  }
}
