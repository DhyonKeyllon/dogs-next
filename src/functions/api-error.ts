import { ActionResponse } from "@/shared/types/action-response";

export function apiError(error: unknown): ActionResponse<null> {
  const ok = false;
  const data = null;
  const errorString =
    error instanceof Error ? error.message : "Erro desconhecido";

  return { ok, error: errorString, data };
}
