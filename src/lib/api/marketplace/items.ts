import createQueryString from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type {
  ItemsResponse,
  MarketplaceItem,
  MarketplaceItemQueryParams,
} from "./types";

export const itemsApi = {
  get: (
    params: Partial<MarketplaceItemQueryParams>
  ): Promise<ItemsResponse> => {
    const queryString = createQueryString(params);
    if (queryString.length === 0) {
      return Promise.resolve({
        data: [],
        count: 0,
      } satisfies ItemsResponse);
    }

    return apiFetch(`/marketplace/items?${queryString}`);
  },

  getAllIds: (): Promise<{ ids: number[] }> => {
    return apiFetch("/marketplace/items/ids");
  },

  create: (item: Omit<MarketplaceItem, "id">): Promise<MarketplaceItem> =>
    apiFetch("/marketplace/items/", {
      method: "POST",
      body: JSON.stringify(item),
    }),

  // Other methods like update, delete, etc.
};
