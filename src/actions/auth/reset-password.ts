"use server";

import { PASSWORD_RESET } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types";
import { redirect } from "next/navigation";

export async function resetPassword(
  _state: {},
  formData: FormData
): Promise<ActionResponse<null>> {
  const login = formData.get("login") as string;
  const key = formData.get("key") as string;
  const password = formData.get("password") as string;

  try {
    if (!login || !key || !password) throw new Error("Preencha os dados.");

    if (password.length < 6)
      throw new Error("A senha deve ter pelo menos 6 dígitos.");

    const { url } = PASSWORD_RESET();

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Não autorizado.");
  } catch (error: unknown) {
    return apiError(error);
  }

  redirect("/login");
}
