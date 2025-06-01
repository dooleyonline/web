// Base API client with authentication and error handling// src/lib/api/core/client.ts
import { API_BASE_URL } from "./config";

/**
 * Generic function to fetch data from the API with authentication and error handling.
 *
 * @param endpoint API endpoint to fetch data from
 * @param options Additional fetch options like method, headers, body, etc.
 * @returns A promise that resolves to the fetched data of type T
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Add auth token if available
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle 204 No Content response
    if (response.status === 204) {
      console.warn(`No content returned for ${endpoint}`);
      return null as T;
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        `An unknown error occurred ${response.status}: ${response.statusText}`
      );
    }

    return data as T;
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    return null as T;
  }
}
