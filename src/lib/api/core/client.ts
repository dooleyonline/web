import axios from "axios";

import { API_BASE_URL } from "./config";
import { ApiResponse } from "./types";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth token interceptor
// apiClient.interceptors.request.use((config) => {
//   if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
//     const token = localStorage.getItem("auth_token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const { method = "GET", body, headers } = options;

    const response = await apiClient({
      url: endpoint,
      method,
      data: body,
      headers: headers ? Object.fromEntries(new Headers(headers)) : undefined,
    });

    return { data: response.data as T, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    };
  }
}
