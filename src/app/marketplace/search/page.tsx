"use client";

import ItemGallery from "@/components/item/item-gallery";
import useItems from "@/hooks/marketplace/use-items";

const MarketplaceSearch = () => {
  const { data, isLoading, error } = useItems();

  return (
    <main>
      <section id="search-results">
        <ItemGallery data={data || null} isLoading={isLoading} error={error} />
      </section>
    </main>
  );
};

export default MarketplaceSearch;
