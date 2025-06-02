import createQueryString from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type {
  MarketplaceItemCategoriesResponse,
  MarketplaceItemCategory,
  MarketplaceItemCategoryQueryParams,
} from "./types";

export const categoriesApi = {
  get: (
    params: Partial<MarketplaceItemCategoryQueryParams>
  ): Promise<MarketplaceItemCategoriesResponse> => {
    const queryString = createQueryString(params);

    return apiFetch(`/marketplace/categories/${queryString}`);
  },

  create: (item: MarketplaceItemCategory): Promise<MarketplaceItemCategory> =>
    apiFetch("/marketplace/categories/", {
      method: "POST",
      body: JSON.stringify(item),
    }),

  // Other methods like update, delete, etc.
};
