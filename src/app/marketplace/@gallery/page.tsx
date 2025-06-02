"use client";

import ItemGallery from "@/components/item/item-gallery";
import { useItems } from "@/hooks/api/marketplace";
import useValidSearchParams from "@/hooks/ui/use-valid-search-params";
import { MarketplaceItemQueryParams } from "@/lib/api/marketplace";

import CategoriesSection from "../_sections/categories";
import ForYouSection from "../_sections/for-you";
import TrendingSection from "../_sections/trending";

const Gallery = () => {
  const { queryParams, isSearch } = useValidSearchParams({
    page: "marketplace",
  });
  const { data, isLoading, error } = useItems(
    queryParams as MarketplaceItemQueryParams
  );

  console.log("data:", data);

  if (!isSearch) {
    // If no search parameters are provided, show the homepage sections
    return (
      <>
        <CategoriesSection />
        <ForYouSection />
        <TrendingSection />
      </>
    );
  }

  return <ItemGallery data={data?.data} isLoading={isLoading} error={error} />;
};

export default Gallery;
