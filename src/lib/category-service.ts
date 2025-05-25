import type { Category } from "@/types/category";

import { createCachedFetcher } from "./fetch-utils";

/**
 * Fetches categories.
 * Uses the generic createCachedFetcher to fetch from /data/categories.json.
 */
export const getCategories = createCachedFetcher<Category[]>(
  "/data/categories.json", // Endpoint for local JSON
  "CategoriesService",
  { isLocalJson: true } // Specify that this is a local JSON file
);
