"use client";

import ItemGallery from "@/components/item/item-gallery";
import useDataFetching from "@/hooks/useDataFetching";
import { getItems } from "@/lib/item-service";

const MarketplaceSearch = () => {
  const itemsData = useDataFetching(getItems);

  return (
    <main className="pt-0">
      <section id="search-results">
        <ItemGallery {...itemsData} />
      </section>
    </main>
  );
};

export default MarketplaceSearch;
