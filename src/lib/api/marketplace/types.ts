import { ApiResponse } from "../core";

export type MarketplaceItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  postedAt: string;
  isSold: boolean;
  condition: number;
  isNegotiable: boolean;
  views: number;
  subcategory: string;
  seller: string;
};

export type MarketplaceItemCategory = {
  name: string;
  icon: string;
  subcategories: MarketplaceItem["subcategory"][];
};

export type MarketplaceItemSubcategory = {
  name: string;
  parent: MarketplaceItemCategory["name"];
};

export type MarketplaceItemQueryParams = {
  id: MarketplaceItem["id"];
  q: string;
  category: string;
  subcategory: string;
};

export type MarketplaceItemCategoryQueryParams = {
  name: MarketplaceItemCategory["name"];
};

export type MarketplaceItemsResponse = ApiResponse<MarketplaceItem> & {};

export type MarketplaceItemCategoriesResponse =
  ApiResponse<MarketplaceItemCategory> & {};
