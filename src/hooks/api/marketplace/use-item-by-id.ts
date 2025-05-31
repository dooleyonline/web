import { itemsApi } from "@/lib/api/marketplace/items";
import { useMemo } from "react";
import useSWR from "swr";

export default function useItemsById(id: string | number) {
  // Create a stable cache key
  const queryKey = useMemo(() => {
    return `/marketplace/items?id=${id}`;
  }, [id]);

  return useSWR(queryKey, () => itemsApi.getById(String(id)), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  });
}
