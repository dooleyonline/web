import { ENDPOINTS } from "../core";
import { apiFetch } from "../core/client";

type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

const userApi = {
  me: async () => {
    return apiFetch<User>(ENDPOINTS.AUTH.ME);
  },
};

export { userApi, type User };
