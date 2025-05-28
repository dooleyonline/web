import type { Item } from "@/types/item";

import ItemCard, { ItemCardSkeleton } from "./item-card";

interface ItemGalleryProps {
  data: Item[] | null;
  isLoading: boolean;
  error: string | null;
}

const ItemGallery = ({ data, isLoading, error }: ItemGalleryProps) => {
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-x-0 gap-y-1 md:gap-x-1 md:gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => <ItemCardSkeleton key={i} />)
        : data?.map((item: Item, i: number) => (
            <ItemCard key={i} item={item} />
          ))}
    </div>
  );
};

export default ItemGallery;
