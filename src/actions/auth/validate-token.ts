"use server";

import { TOKEN_VALIDATE_POST } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types";
import { cookies } from "next/headers";

export async function validateToken(): Promise<ActionResponse<null>> {
  const { url } = TOKEN_VALIDATE_POST();
  const token = cookies().get("token")?.value;

  try {
    if (!token) throw new Error("Usuário não autenticado.");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok)
      throw new Error("Erro ao validar autenticação do usuário.");

    const data = await response.json();

    return {
      data,
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
