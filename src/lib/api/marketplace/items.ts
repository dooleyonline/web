import createQueryString from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type { MarketplaceItem, MarketplaceItemQueryParams } from "./types";

export const itemsApi = {
  get: async (params: Partial<MarketplaceItemQueryParams>) => {
    const queryString = createQueryString(params);

    return apiFetch<MarketplaceItem[]>(`/marketplace/items?${queryString}`);
  },

  create: (data: Omit<MarketplaceItem, "id">) =>
    apiFetch<MarketplaceItem>("/marketplace/items/", {
      method: "POST",
      data,
    }),
};
