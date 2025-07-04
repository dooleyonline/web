import axios, { AxiosRequestConfig } from "axios";

import { API_BASE_URL } from "./config";
import { ApiResponse } from "./types";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiFetch<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> {
  try {
    const { method, data, headers } = options;

    const response = await apiClient
      .request({
        url: endpoint,
        method,
        data,
        headers,
      })
      .catch((error) => {
        throw error;
      });

    const ok = response.status >= 200 && response.status < 300;

    return {
      data: response.data as T,
      status: response.status,
      ok,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      ok: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
}
