"use client";

import ItemGallery from "@/components/item/item-gallery";
import { Section, SectionHeader } from "@/components/section/section";
import useDataFetching from "@/hooks/useDataFetching";
import { getItems } from "@/lib/item-service";
import { useSearchParams } from "next/navigation";

const MarketplaceSearch = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const itemsData = useDataFetching(getItems);

  return (
    <main>
      <Section id="search-results">
        <SectionHeader title={`Results for "${query}"`} />
        <ItemGallery {...itemsData} />
      </Section>
    </main>
  );
};

export default MarketplaceSearch;
