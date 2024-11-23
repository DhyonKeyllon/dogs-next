"use server";

import { TOKEN_POST } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types/action-response";
import { cookies } from "next/headers";

export async function login(
  _state: {},
  formData: FormData
): Promise<ActionResponse<null>> {
  const { url } = TOKEN_POST();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    if (!username || !password) throw new Error("Preencha os dados");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Usuário ou senha inválidos");

    const data = await response.json();

    if (data.token) {
      cookies().set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });
    }

    return {
      ok: true,
      error: "",
      data: null,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
