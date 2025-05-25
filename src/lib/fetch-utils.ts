import { cache } from "react";

// This would be your actual Django API base URL, e.g., from an environment variable
const DJANGO_API_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL; // || 'http://localhost:8000/api';

interface FetchOptions {
  isLocalJson?: boolean;
}

/**
 * A generic function to fetch data.
 * Can fetch from a local JSON file (relative to /public) or a remote API endpoint.
 * @param endpoint - The API endpoint path (e.g., '/categories/') or local JSON path (e.g., '/data/items.json').
 * @param serviceName - A descriptive name for the service being called (for logging).
 * @param options - Fetch options, e.g., to specify if it's a local JSON file.
 * @returns A promise that resolves with the fetched data of type T.
 */
async function fetchGenericData<T>(
  endpoint: string,
  serviceName: string,
  options: FetchOptions = {}
): Promise<T> {
  let dataSourceUrl: string;
  let fetchSourceDescription: string;

  if (options.isLocalJson) {
    dataSourceUrl = endpoint; // Endpoint is already the full path for local JSON, e.g., /data/items.json
    fetchSourceDescription = `local public file: ${dataSourceUrl}`;
  } else {
    if (!DJANGO_API_BASE_URL) {
      console.warn(
        `[${serviceName}] DJANGO_API_BASE_URL is not set. Falling back to local JSON for endpoint: ${endpoint}`
      );
      // Fallback to a conventional local JSON path if API base URL is not set
      // Assumes endpoint like '/categories/' maps to '/data/categories.json'
      dataSourceUrl = `/data${endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint}.json`;
      fetchSourceDescription = `fallback local public file: ${dataSourceUrl}`;
    } else {
      dataSourceUrl = `${DJANGO_API_BASE_URL}${endpoint}`;
      fetchSourceDescription = `API: ${dataSourceUrl}`;
    }
  }

  console.log(`[${serviceName}] Fetching from ${fetchSourceDescription}`);
  try {
    const response = await fetch(dataSourceUrl);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[${serviceName}] Failed to fetch from ${fetchSourceDescription}: ${response.status} ${response.statusText}`,
        errorText
      );
      throw new Error(
        `[${serviceName}] Failed to fetch from ${fetchSourceDescription}. Status: ${response.status}`
      );
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(
      `[${serviceName}] Error fetching from ${fetchSourceDescription}:`,
      error
    );
    if (
      error instanceof Error &&
      error.message.startsWith(`[${serviceName}]`)
    ) {
      throw error; // Re-throw if it's already our custom error
    }
    throw new Error(
      `[${serviceName}] Failed to fetch from ${fetchSourceDescription}.`
    );
  }
}

/**
 * Wraps the generic data fetching function with React.cache for server-side deduplication.
 * @param endpoint - The API endpoint path or local JSON path.
 * @param serviceName - A descriptive name for the service.
 * @param options - Fetch options.
 * @returns A cached function that fetches data of type T.
 */
export function createCachedFetcher<T>(
  endpoint: string,
  serviceName: string,
  options: FetchOptions = {}
) {
  // Determine if we are using local JSON for the primary strategy or as a fallback
  const useLocalJson = options.isLocalJson || !DJANGO_API_BASE_URL;
  const effectiveOptions = { ...options, isLocalJson: useLocalJson };

  return cache(() =>
    fetchGenericData<T>(endpoint, serviceName, effectiveOptions)
  );
}
