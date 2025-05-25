import type { Item } from "@/types/item";

import { createCachedFetcher } from "./fetch-utils";

/**
 * Fetches items.
 * Uses the generic createCachedFetcher to fetch from /data/items.json.
 */
export const getItems = createCachedFetcher<Item[]>(
  "/data/items.json", // Endpoint for local JSON
  "ItemsService",
  { isLocalJson: true } // Specify that this is a local JSON file
);
