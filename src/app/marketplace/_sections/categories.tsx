"use client";

import DynamicIcon from "@/components/dynamic-icon";
import { Section } from "@/components/site-section";
import { Skeleton } from "@/components/ui/skeleton";
import useCategories from "@/hooks/api/marketplace/use-categories";
import type { MarketplaceItemCategory } from "@/lib/api/marketplace/types";

const CategoriesSection = () => {
  const { data, isLoading, error } = useCategories();

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Section id="categories">
      <div className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          : data?.map((item: MarketplaceItemCategory, i: number) => (
              <CategoryCard key={i} {...item} />
            ))}
      </div>
    </Section>
  );
};

const CategoryCard = (category: MarketplaceItemCategory) => {
  return (
    <button className="flex h-[72px] flex-col justify-between rounded-md bg-accent p-3 hover:opacity-75 sm:h-24">
      <DynamicIcon
        name={category.icon}
        className="size-6 text-muted-foreground"
      />
      <span className="block text-left text-sm font-semibold leading-none">
        {category.name}
      </span>
    </button>
  );
};

const CategoryCardSkeleton = () => {
  return (
    <Skeleton className="h-20 justify-between rounded-md p-3 sm:h-24 animate-pulse" />
  );
};

export default CategoriesSection;
