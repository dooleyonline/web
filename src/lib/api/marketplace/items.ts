import createQueryString from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type {
  MarketplaceItem,
  MarketplaceItemQueryParams,
  MarketplaceItemsResponse,
} from "./types";

export const itemsApi = {
  get: (params: Partial<MarketplaceItemQueryParams>) => {
    const queryString = createQueryString(params);
    if (queryString.length === 0) {
      return Promise.resolve({
        data: [],
        error: null,
      } satisfies MarketplaceItemsResponse);
    }

    return apiFetch<MarketplaceItem[]>(`/marketplace/items?${queryString}`);
  },

  // getAllIds: (): Promise<{ ids: number[] }> => {
  //   return apiFetch("/marketplace/items/ids");
  // },

  create: (item: Omit<MarketplaceItem, "id">) =>
    apiFetch<MarketplaceItem>("/marketplace/items/", {
      method: "POST",
      body: JSON.stringify(item),
    }),

  // Other methods like update, delete, etc.
};
