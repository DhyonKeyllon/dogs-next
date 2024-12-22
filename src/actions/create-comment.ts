"use server";

import { COMMENT_POST } from "@/functions/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { apiError } from "@/functions/api-error";
import { ActionResponse, Comment } from "@/shared/types";

export async function createComment(
  state: {},
  formData: FormData
): Promise<ActionResponse<Comment | null>> {
  const token = cookies().get("token")?.value;

  const comment = formData.get("comment") as string | null;
  const id = formData.get("id") as string | null;

  try {
    if (!token || !comment || !id) throw new Error("Preencha os dados.");

    const { url } = COMMENT_POST(id);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Falha ao postar comentário.");

    const data = (await response.json()) as Comment;

    revalidateTag("comment");

    return { data, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
