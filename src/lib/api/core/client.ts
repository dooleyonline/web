import axios from "axios";

import { API_BASE_URL } from "./config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth token interceptor
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const { method = "GET", body, headers } = options;

    const response = await apiClient({
      url: endpoint,
      method,
      data: body,
      headers: headers ? Object.fromEntries(new Headers(headers)) : undefined,
    });

    return response.data as T;
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);

    if (axios.isAxiosError(error) && error.response?.status === 204) {
      console.warn(`No content returned for ${endpoint}`);
      return null as T;
    }

    throw error;
  }
}
