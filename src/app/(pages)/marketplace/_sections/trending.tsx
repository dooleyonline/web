"use client";

import ItemGallery from "@/components/item/item-gallery";
import { Section, SectionHeader } from "@/components/site-section";
import useItems from "@/hooks/marketplace/use-items";

const TrendingSection = () => {
  const {
    data: itemsData,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useItems();

  return (
    <Section id="trending">
      <SectionHeader title="Trending" subtitle="Discover hot new items" />
      <ItemGallery
        data={itemsData?.slice(10, 20) || null}
        isLoading={isItemsLoading}
        error={itemsError}
      />
    </Section>
  );
};

export default TrendingSection;
