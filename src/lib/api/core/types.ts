export type ApiResponse<T> = {
  data: T | null;
  status: number;
  ok: boolean;
  error: Error | null;
};
