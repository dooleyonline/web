export type MarketplaceItem = {
  id: number;
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

export type MarketplaceItemQueryParams = {
  id: string;
  q: string;
  category: string;
  subcategory: string;
};

export type ItemsResponse = {
  data: MarketplaceItem[];
  count: number;
};

export type MarketplaceItemCategory = {
  name: string;
  icon: string;
};

export type MarketplaceItemSubcategory = {
  name: string;
  parent: MarketplaceItemCategory["name"];
};
