import { categoriesApi } from "@/lib/api/marketplace/categories";
import type { MarketplaceItemCategoryQueryParams } from "@/lib/api/marketplace/types";
import createQueryString from "@/lib/utils/create-query-string";
import { useMemo } from "react";
import useSWR from "swr";

/**
 * Custom hook to fetch categories from the marketplace API.
 *
 * @param params The query parameters for fetching categories.
 * @returns An object containing the data, loading state, and error state for the categories.
 */
export default function useCategories(
  params: Partial<MarketplaceItemCategoryQueryParams>
) {
  // Create a stable cache key
  const queryKey = useMemo(() => {
    const queryString = createQueryString(params);
    return `/marketplace/categories/${queryString}`;
  }, [params]);

  return useSWR(queryKey, () => categoriesApi.get(params), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  });
}
