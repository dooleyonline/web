import createQueryString from "@/lib/utils/create-query-string";

import { ENDPOINTS } from "../core";
import { apiFetch } from "../core/client";
import type { MarketplaceItem, MarketplaceItemQueryParams } from "./types";

export const itemsApi = {
  get: async (params: Partial<MarketplaceItemQueryParams>) => {
    const queryString = createQueryString(params);

    return apiFetch<MarketplaceItem[]>(
      `${ENDPOINTS.MARKETPLACE.ITEMS}?${queryString}`
    );
  },

  create: (data: Omit<MarketplaceItem, "id">) =>
    apiFetch<MarketplaceItem>(ENDPOINTS.MARKETPLACE.ITEMS, {
      method: "POST",
      data,
    }),
};
