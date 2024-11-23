export type ActionResponse<T> = {
  ok: boolean;
  error: string;
  data: T | null;
};
