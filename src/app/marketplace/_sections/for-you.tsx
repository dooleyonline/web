"use client";

import ItemGallery from "@/components/item/item-gallery";
import { Section, SectionHeader } from "@/components/site-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useItems from "@/hooks/marketplace/use-items";
import useSubcategories from "@/hooks/marketplace/use-subcategories";
import type { Subcategory } from "@/types/subcategory";
import { useState } from "react";

const ForYouSection = () => {
  const [selected, setSelected] = useState<string>("All");

  const {
    data: subcategoriesData,
    isLoading: isSubcategoriesLoading,
    error: subcategoriesError,
  } = useSubcategories();

  const {
    data: itemsData,
    isLoading: isItemsLoading,
    error: itemsError,
  } = useItems();

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
            {subcategoriesData?.map((item: Subcategory, i: number) => (
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
        data={itemsData?.slice(0, 10) || null}
        isLoading={isItemsLoading}
        error={itemsError}
      />
    </Section>
  );
};

export default ForYouSection;
