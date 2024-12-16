"use server";

import { PHOTOS_GET } from "@/functions/api";
import { Photo } from "@/shared/types";

export async function getPhotos() {
  const { url } = PHOTOS_GET({ page: 1, total: 6, user: 0 });

  const response = await fetch(url, {
    next: {
      // add 10s to revalidate cache
      revalidate: 10,
      // add tags ["photo"] to call revalidateTags on post a new foto in post-photo action
      tags: ["photos"],
    },
  });

  const data = (await response.json()) as Photo[];

  return data;
}
