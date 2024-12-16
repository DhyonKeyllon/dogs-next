"use server";

import { USER_GET } from "@/functions/api";
import { apiError } from "@/functions/api-error";
import { ActionResponse } from "@/shared/types";
import { User } from "@/shared/types/user";
import { cookies } from "next/headers";

export async function getUser(): Promise<ActionResponse<User | null>> {
  const { url } = USER_GET();

  try {
    const token = cookies().get("token")?.value;

    if (!token) throw new Error("Autenticação não autorizada.");

    // ? By default, in next v14 fetch is cached, but the function no.
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok)
      throw new Error("Erro ao carregar informações do usuário.");

    const data = (await response.json()) as User;

    return {
      ok: true,
      error: "",
      data,
    };
  } catch (error: unknown) {
    return apiError(error);
  }
}

// ? * "cache" function by created by React, is used to cache all function. Useful to complex functions.

// const getUserCache = cache(getUser);
// export default getUserCache;
