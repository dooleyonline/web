"use client";

import ItemGallery from "@/components/item/item-gallery";
import useItems from "@/hooks/api/marketplace/use-items";
import type { ItemQueryParams } from "@/lib/api/marketplace/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const MarketplaceSearch = () => {
  return (
    <main>
      <Suspense>
        <SearchResults />
      </Suspense>
    </main>
  );
};

const SearchResults = () => {
  const searchParams = useSearchParams();
  const queryParams: ItemQueryParams = {
    q: searchParams.get("q") || "",
    category: searchParams.get("category") || undefined,
    subcategory: searchParams.get("subcategory") || undefined,
  };

  const { data, isLoading, error } = useItems(queryParams);

  return (
    <section id="search-results">
      <ItemGallery data={data?.data} isLoading={isLoading} error={error} />
    </section>
  );
};

export default MarketplaceSearch;
