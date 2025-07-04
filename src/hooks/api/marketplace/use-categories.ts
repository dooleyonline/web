import { ENDPOINTS } from "@/lib/api/core";
import { categoriesApi } from "@/lib/api/marketplace";
import type { MarketplaceCategoryQueryParams } from "@/lib/api/marketplace/types";
import createQueryString from "@/lib/utils/create-query-string";
import { useMemo } from "react";
import useSWR from "swr";

import { useAuth } from "../shared";

/**
 * Custom hook to fetch categories from the marketplace API.
 *
 * @param params The query parameters for fetching categories.
 * @returns An object containing the data, loading state, and error state for the categories.
 */
export default function useCategories(
  params: Partial<MarketplaceCategoryQueryParams>
) {
  const { user } = useAuth();

  const queryKey = useMemo(() => {
    const queryString = createQueryString(params);
    return user?.username + ENDPOINTS.MARKETPLACE.CATEGORIES + queryString;
  }, [params, user]);

  return useSWR(queryKey, async () => {
    const { error, data } = await categoriesApi.get(params);
    if (error) throw error;
    return data;
  });
}
