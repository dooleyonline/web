import { itemsApi } from "@/lib/api/marketplace/items";
import { ItemQueryParams } from "@/lib/api/marketplace/types";
import { createQueryString } from "@/lib/utils/create-query-string";
import { useMemo } from "react";
import useSWR from "swr";

export default function useItems(params: ItemQueryParams) {
  // Create a stable cache key
  const queryKey = useMemo(() => {
    const queryString = createQueryString(params);
    return `/marketplace/items?${queryString}`;
  }, [params]);

  return useSWR(queryKey, () => itemsApi.getList(params), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  });
}
