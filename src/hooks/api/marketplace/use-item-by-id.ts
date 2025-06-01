import { itemsApi } from "@/lib/api/marketplace";
import { useMemo } from "react";
import useSWR from "swr";

/**
 * Custom hook to fetch a single item by its ID from the marketplace API.
 *
 * @param id The ID of the item to fetch.
 * @returns An object containing the data, loading state, and error state for the item.
 */
export default function useItemById(id: string | number) {
  // Create a stable cache key
  const queryKey = useMemo(() => {
    return `/marketplace/items?id=${id}`;
  }, [id]);

  return useSWR(queryKey, () => itemsApi.get({ id: id }), {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
  });
}
