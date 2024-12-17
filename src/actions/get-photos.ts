"use server";

import { PHOTOS_GET } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse, Photo } from "@/shared/types";

type GetPhotosInput = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export async function getPhotos(
  { page = 1, total = 6, user = 0 }: GetPhotosInput = {},
  optionsFront?: RequestInit
): Promise<ActionResponse<Photo[] | null>> {
  const { url } = PHOTOS_GET({ page, total, user });

  const options = optionsFront || {
    next: {
      // add 10s to revalidate cache
      revalidate: 10,
      // add tags ["photo"] to call revalidateTags on post a new foto in post-photo action
      tags: ["photos"],
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error("Erro ao carregar as fotos");

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
