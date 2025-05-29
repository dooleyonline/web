"use client";

import ItemGallery from "@/components/item/item-gallery";
import { Section, SectionHeader } from "@/components/site-section";
import { Button } from "@/components/ui/button";
import useDataFetching from "@/hooks/useDataFetching";
import { getItems } from "@/lib/item-service";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const MarketplaceSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

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
