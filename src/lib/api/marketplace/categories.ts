import createQueryString from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type {
  MarketplaceCategory,
  MarketplaceCategoryQueryParams,
} from "./types";

export const categoriesApi = {
  get: (params: Partial<MarketplaceCategoryQueryParams>) => {
    const queryString = createQueryString(params);

    return apiFetch<MarketplaceCategory[]>(
      `/marketplace/categories/${queryString}`
    );
  },

  create: (data: MarketplaceCategory) => {
    return apiFetch<MarketplaceCategory>("/marketplace/categories/", {
      method: "POST",
      data,
    });
  },

  // Other methods like update, delete, etc.
};
