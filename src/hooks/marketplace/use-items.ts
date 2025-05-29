import useSWR from "swr";
import { Item } from "@/types/item";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useItems() {
  return useSWR<Item[]>("/data/items.json", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 min
  });
}