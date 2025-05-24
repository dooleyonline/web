import { Category } from "./category";

export type Subcategory = {
  name: string;
  parent: Category.name;
};
