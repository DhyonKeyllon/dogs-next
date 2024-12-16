"use server";

import { Photo } from "@/shared/types";

export async function getPhotos() {
  const response = await fetch(
    "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0",
    {
      next: {
        // add 10s to revalidate cache
        revalidate: 10,
        // add tags ["photo"] to call revalidateTags on post a new foto in post-photo action
        tags: ["photos"],
      },
    }
  );

  const data = (await response.json()) as Photo[];

  return data;
}
