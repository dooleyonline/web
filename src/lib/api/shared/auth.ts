import { ENDPOINTS } from "../core";
import { apiFetch } from "../core/client";
import { User } from "./types";

const authApi = {
  me: async () => {
    return apiFetch<User>(ENDPOINTS.AUTH.ME);
  },

  refresh: async ({ refreshToken }: { refreshToken: string }) => {
    return apiFetch<{ access: string }>(ENDPOINTS.AUTH.REFRESH, {
      method: "POST",
      data: { refresh: refreshToken },
    });
  },
};

export { authApi, type User };
