"use server";

import { Photo } from "@/shared/types/photo";

export async function getPhotos() {
  const response = await fetch(
    "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=6&_user=0"
  );

  const data = (await response.json()) as Photo[];

  return data;
}
