import { itemsApi } from "@/lib/api/marketplace";
import type {
  MarketplaceItem,
  MarketplaceItemQueryParams,
} from "@/lib/api/marketplace/types";
import createQueryString from "@/lib/utils/create-query-string";
import { useMemo } from "react";
import useSWR from "swr";

/**
 * Custom hook to fetch items from the marketplace API.
 *
 * @param params The query parameters for fetching items.
 * @returns An object containing the data, loading state, and error state for the items.
 */
export default function useItems(params: Partial<MarketplaceItemQueryParams>) {
  // Create a stable cache key
  const queryKey = useMemo(() => {
    const queryString = createQueryString(params);
    return `/marketplace/items?${queryString}`;
  }, [params]);

  return useSWR(
    queryKey,
    async () => {
      const result = await itemsApi.get(params);
      if (result.error) throw result.error;
      return result.data;
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
        if (retryCount >= 3) return;

        // Don't retry on 404s or other client errors
        if (error.status >= 400 && error.status < 500) return;

        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
      fallbackData: [] as MarketplaceItem[],
    }
  );
}
