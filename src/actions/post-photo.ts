"use server";

import { PHOTO_POST } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function postPhoto(
  _state: {},
  formData: FormData
): Promise<ActionResponse<null>> {
  const { url } = PHOTO_POST();

  const token = cookies().get("token")?.value;

  const name = formData.get("nome") as string | null;
  const years = formData.get("idade") as string | null;
  const weight = formData.get("peso") as string | null;
  const image = formData.get("img") as File;

  try {
    if (!token) throw new Error("Usuário não autenticado.");
    if (!name || !years || !weight || image.size === 0)
      throw new Error("Preencha os dados.");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Falha ao postar foto.");
  } catch (error: unknown) {
    return apiError(error);
  }

  revalidateTag("photos");
  redirect("/", RedirectType.push);
}
