"use server";

import { PASSWORD_LOST } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types/action-response";

export async function forgotPassword(
  _state: {},
  formData: FormData
): Promise<ActionResponse<null>> {
  const login = formData.get("login") as string;
  const urlLost = formData.get("url") as string;

  try {
    const { url } = PASSWORD_LOST();

    if (!login) throw new Error("Preencha os dados.");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, url: urlLost }),
    });

    if (!response.ok) throw new Error("Email ou usuário já cadastrado.");

    await response.json();

    return {
      ok: true,
      error: "",
      data: null,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
