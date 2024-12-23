"use server";

import { PHOTOS_GET, STATS_GET } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse, Photo, Statistics } from "@/shared/types";
import { cookies } from "next/headers";

type GetPhotosInput = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export async function getStatistics(): Promise<
  ActionResponse<Statistics[] | null>
> {
  const { url } = STATS_GET();
  const token = cookies().get("token")?.value;

  try {
    if (!token) throw new Error("Usuário não autenticado.");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Erro ao carregar as estatísticas");

    const data = (await response.json()) as Statistics[];

    return {
      data,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
