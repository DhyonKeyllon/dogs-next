"use server";

import { PHOTO_DELETE } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function deletePhotoById(
  id: string
): Promise<ActionResponse<null>> {
  const { url } = PHOTO_DELETE(id);

  const token = cookies().get("token")?.value;

  try {
    if (!token) throw new Error("Usuário não autenticado.");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) throw new Error("Erro ao deletar foto.");
  } catch (error: unknown) {
    return apiError(error);
  }

  revalidateTag("photos");
  redirect("/conta", RedirectType.push);
}
