import createQueryString from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type {
  MarketplaceItemCategory,
  MarketplaceItemCategoryQueryParams,
} from "./types";

export const categoriesApi = {
  get: (params: Partial<MarketplaceItemCategoryQueryParams>) => {
    const queryString = createQueryString(params);

    return apiFetch<MarketplaceItemCategory[]>(
      `/marketplace/categories/${queryString}`
    );
  },

  create: (item: MarketplaceItemCategory) => {
    return apiFetch<MarketplaceItemCategory>("/marketplace/categories/", {
      method: "POST",
      body: JSON.stringify(item),
    });
  },

  // Other methods like update, delete, etc.
};
