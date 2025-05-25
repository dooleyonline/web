import type { Subcategory } from "@/types/subcategory";

import { createCachedFetcher } from "./fetch-utils";

/**
 * Fetches subcategories.
 * Uses the generic createCachedFetcher to fetch from /data/subcategories.json.
 */
export const getSubcategories = createCachedFetcher<Subcategory[]>(
  "/data/subcategories.json", // Endpoint for local JSON
  "SubcategoriesService",
  { isLocalJson: true } // Specify that this is a local JSON file
);
