import { ApiResponse } from "../core";

export type MarketplaceItem = {
  id: string | number;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number | string;
  postedAt: string;
  isSold: boolean;
  condition: number;
  isNegotiable: boolean;
  views: number;
  subcategory: string;
  seller: string;
};

export type MarketplaceCategory = {
  name: string;
  icon: string;
  subcategories: MarketplaceSubcategory["name"][];
};

export type MarketplaceSubcategory = {
  name: string;
  parent: MarketplaceCategory["name"];
};

export type MarketplaceItemQueryParams = {
  id: MarketplaceItem["id"];
  q: string;
  category: string;
  subcategory: string;
};

export type MarketplaceCategoryQueryParams = {
  name: MarketplaceCategory["name"];
};

export type MarketplaceItemsResponse = ApiResponse<MarketplaceItem[]>;

export type MarketplaceCategoriesResponse = ApiResponse<MarketplaceCategory[]>;
