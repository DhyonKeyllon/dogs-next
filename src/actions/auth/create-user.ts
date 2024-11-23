"use server";

import { USER_POST } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types/action-response";
import { login } from "./login";

export async function createUser(
  _state: {},
  formData: FormData
): Promise<ActionResponse<null>> {
  const { url } = USER_POST();
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!username || !password || !email) throw new Error("Preencha os dados.");
    if (password.length < 6)
      throw new Error("Senha deve ter no mínimo 6 caracteres.");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Email ou usuário já cadastrado.");

    await response.json();

    const { ok } = await login({ ok: true, data: null }, formData);

    if (!ok) throw new Error("Erro ao logar.");

    return {
      ok: true,
      error: "",
      data: null,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}
