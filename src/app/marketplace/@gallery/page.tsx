"use client";

import ItemGallery from "@/components/item/item-gallery";
import { useItems } from "@/hooks/api/marketplace";
import { ItemQueryParams } from "@/lib/api/marketplace";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import CategoriesSection from "../_sections/categories";
import ForYouSection from "../_sections/for-you";
import TrendingSection from "../_sections/trending";

const Gallery = () => {
  const searchParams = useSearchParams();
  const queryParams: ItemQueryParams = {
    q: searchParams.get("q") || undefined,
    category: searchParams.get("category") || undefined,
    subcategory: searchParams.get("subcategory") || undefined,
  };

  if (Object.values(queryParams).every((value) => !value)) {
    // If no search parameters are provided, show the main sections
    return (
      <>
        <CategoriesSection />
        <ForYouSection />
        <TrendingSection />
      </>
    );
  }

  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading search results...</p>}>
      <SearchResult queryParams={queryParams} />
    </Suspense>
  );
};

type SearchResultProps = {
  queryParams: ItemQueryParams;
};

const SearchResult = (props: SearchResultProps) => {
  const { queryParams } = props;

  const { data, isLoading, error } = useItems(queryParams);

  return (
    <div>
      <ItemGallery data={data?.data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Gallery;
