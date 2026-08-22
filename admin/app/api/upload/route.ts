import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { ALL_CATEGORIES } from "@/lib/categories";

// Emite um token de upload para o navegador enviar o arquivo DIRETO pro Blob,
// sem passar pelo corpo desta function (que tem limite de tamanho bem menor
// que arquivos de vídeo).
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const category = ALL_CATEGORIES.find((c) => pathname.startsWith(c.key));
        if (!category) {
          throw new Error("Categoria inválida para upload");
        }
        return {
          allowedContentTypes: ["image/*", "video/*"],
          addRandomSuffix: true,
          allowOverwrite: false,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao gerar token de upload" },
      { status: 400 }
    );
  }
}
