export type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};
