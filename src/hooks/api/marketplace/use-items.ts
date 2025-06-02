import { itemsApi } from "@/lib/api/marketplace";
import type { MarketplaceItemQueryParams } from "@/lib/api/marketplace/types";
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

  return useSWR(queryKey, () => itemsApi.get(params), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  });
}
