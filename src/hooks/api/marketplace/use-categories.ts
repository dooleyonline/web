import type { MarketplaceItemCategory } from "@/lib/api/marketplace/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useCategories() {
  return useSWR<MarketplaceItemCategory[]>("/data/categories.json", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 min
  });
}
