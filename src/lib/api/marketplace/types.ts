// Marketplace-specific types

export type Item = {
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

export type ItemQueryParams = {
  id?: number | string;
  q?: string;
  category?: string;
  subcategory?: string;
};

export type ItemsResponse = {
  data: Item[];
  count: number;
  // next?: string;
  // previous?: string;
};

export type Category = {
  name: string;
  icon: string;
};

export type Subcategory = {
  name: string;
  parent: Category["name"];
};
