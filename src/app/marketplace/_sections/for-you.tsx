"use client";

import ItemGallery from "@/components/item/item-gallery";
import { Section, SectionHeader } from "@/components/site-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useDataFetching from "@/hooks/useDataFetching";
import { getItems } from "@/lib/item-service";
import { getSubcategories } from "@/lib/subcategory-service";
import type { Subcategory } from "@/types/subcategory";
import { useState } from "react";

const ForYouSection = () => {
  const [selected, setSelected] = useState<string>("All");

  const {
    data: subcategories,
    isLoading: isSubcategoriesLoading,
    error: subcategoriesError,
  } = useDataFetching(getSubcategories);

  const itemsData = useDataFetching(getItems);

  if (subcategoriesError) {
    return <p>Error: {subcategoriesError}</p>;
  }

  return (
    <Section id="for-you">
      <SectionHeader
        title="For You"
        subtitle="Picked based on your recent search. Updated daily."
        className="mb-4"
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
      <ItemGallery
        data={itemsData.data ? itemsData.data.slice(0, 10) : null}
        isLoading={itemsData.isLoading}
        error={itemsData.error}
      />
    </Section>
  );
};

export default ForYouSection;
