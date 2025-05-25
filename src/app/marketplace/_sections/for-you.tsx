"use client";

import ItemCard, { ItemCardSkeleton } from "@/components/item-card";
import Section from "@/components/section/section";
import SectionHeader from "@/components/section/section-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useDataFetching from "@/hooks/useDataFetching";
import { getItems } from "@/lib/item-service";
import { getSubcategories } from "@/lib/subcategory-service";
import { Item } from "@/types/item";
import type { Subcategory } from "@/types/subcategory";
import { useState } from "react";

const ForYouSection = () => {
  const [selected, setSelected] = useState<string>("All");

  const {
    data: subcategories,
    isLoading: isSubcategoriesLoading,
    error: subcategoriesError,
  } = useDataFetching(getSubcategories);

  const {
    data: items,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useDataFetching(getItems);

  if (subcategoriesError) {
    return <p>Error: {subcategoriesError}</p>;
  }

  if (itemsError) {
    return <p>Error: {itemsError}</p>;
  }

  return (
    <Section id="for-you">
      <SectionHeader
        title="For You"
        subtitle="Picked based on your recent search. Updated daily."
      />

      {/* SUBCATEGORIES */}
      <div className="flex flex-wrap gap-2 mb-4">
        {isSubcategoriesLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-9 rounded-md w-16 animate-pulse" />
          ))
        ) : (
          <>
            <Button
              variant={selected === "All" ? "default" : "secondary"}
              onClick={() => setSelected("All")}
            >
              All
            </Button>
            {subcategories?.map((item: Subcategory, i: number) => (
              <Button
                key={i}
                variant={selected === item.name ? "default" : "secondary"}
                onClick={() => setSelected(item.name)}
              >
                {item.name}
              </Button>
            ))}
          </>
        )}
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {isItemsLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <ItemCardSkeleton key={i} />
            ))
          : items?.map((item: Item, i: number) => (
              <ItemCard key={i} item={item} />
            ))}
      </div>
    </Section>
  );
};

export default ForYouSection;
