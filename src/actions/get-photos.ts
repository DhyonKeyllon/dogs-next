"use server";

import { PHOTOS_GET } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse, Photo } from "@/shared/types";

type GetPhotosInput = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export async function getPhotos({
  page = 1,
  total = 6,
  user = 0,
}: GetPhotosInput = {}): Promise<ActionResponse<Photo[] | null>> {
  const { url } = PHOTOS_GET({ page, total, user });

  try {
    const response = await fetch(url, {
      next: {
        // add 10s to revalidate cache
        revalidate: 10,
        // add tags ["photo"] to call revalidateTags on post a new foto in post-photo action
        tags: ["photos"],
      },
    });

    if (!response.ok) throw new Error("Erro ao carregas as fotos");

    const data = (await response.json()) as Photo[];

    return {
      data,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
