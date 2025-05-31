// Item listing operations
import { createQueryString } from "@/lib/utils/create-query-string";

import { apiFetch } from "../core/client";
import type { Item, ItemQueryParams, ItemsResponse } from "./types";

export const itemsApi = {
  getById: (id: string): Promise<Item> =>
    apiFetch(`/marketplace/items?id=${id}`),

  getList: (params: ItemQueryParams): Promise<ItemsResponse> => {
    const queryString = createQueryString(params || {});
    return apiFetch(`/marketplace/items?${queryString}`);
  },

  create: (item: Omit<Item, "id">): Promise<Item> =>
    apiFetch("/marketplace/items/", {
      method: "POST",
      body: JSON.stringify(item),
    }),

  // Other methods like update, delete, etc.
};
