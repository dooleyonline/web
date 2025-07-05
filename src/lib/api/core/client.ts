import { env } from "@/lib/env";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import { performTokenRefresh } from "../shared/auth";
import { ApiResponse } from "./types";

let getAccessToken: () => string | null = () => null;
let setAccessToken: (token: string) => void = () => {};
let signOut: () => void = () => {};

export const setAuthHooks = (
  newGetAccessToken: () => string | null,
  newSetAccessToken: (token: string) => void,
  newSignOut: () => void
) => {
  getAccessToken = newGetAccessToken;
  setAccessToken = newSetAccessToken;
  signOut = newSignOut;
};

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
});

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error("Unknown error during token refresh"));
    }
  });
  failedQueue = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status !== 401 || originalRequest._retry)
      return Promise.reject(error);

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) =>
        failedQueue.push({ resolve, reject })
      ).then((token) => {
        if (originalRequest.headers)
          originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await performTokenRefresh();
      const newAccessToken = data.access;

      setAccessToken(newAccessToken);
      processQueue(null, newAccessToken);
      
      const newRequestConfig = { ...originalRequest };
      if (newRequestConfig.headers) {
        newRequestConfig.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return apiClient(newRequestConfig);

    } catch (refreshError) {
      processQueue(refreshError as Error, null);
      signOut();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export async function apiFetch<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.request<T>({ url: endpoint, ...options });
    return {
      data: response.data,
      status: response.status,
      ok: true,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      status: 500,
      ok: false,
      error: error instanceof Error ? error : new Error("Unknown fetch error"),
    };
  }
}
