import { itemsApi } from "@/lib/api/marketplace";
import type { MarketplaceItemQueryParams } from "@/lib/api/marketplace/types";
import createQueryString from "@/lib/utils/create-query-string";
import { useMemo } from "react";
import useSWR from "swr";

import { useAuth } from "../shared";

/**
 * Custom hook to fetch items from the marketplace API.
 *
 * @param params The query parameters for fetching items.
 * @returns An object containing the data, loading state, and error state for the items.
 */
export default function useItems(params: Partial<MarketplaceItemQueryParams>) {
  const { user } = useAuth();

  const queryKey = useMemo(() => {
    const queryString = createQueryString(params);
    return `${user?.username ?? ""}-/marketplace/items?${queryString}`;
  }, [params, user]);

  return useSWR(queryKey, async () => {
    const result = await itemsApi.get(params);
    if (result.error) throw result.error;
    return result.data;
  });
}
