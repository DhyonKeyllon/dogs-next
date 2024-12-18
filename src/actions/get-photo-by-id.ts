"use server";

import { PHOTO_GET } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse, PhotoWithComments } from "@/shared/types";

export async function getPhotoById(
  id: string
): Promise<ActionResponse<PhotoWithComments | null>> {
  const { url } = PHOTO_GET(id);

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ["photos", "comment"],
      },
    });

    if (!response.ok) throw new Error("Erro ao carregar a foto");

    const data = (await response.json()) as PhotoWithComments;

    return {
      data,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
