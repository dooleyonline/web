"use client";

import DynamicIcon from "@/components/dynamic-icon";
import Section from "@/components/section/section";
import { Skeleton } from "@/components/ui/skeleton";
import useDataFetching from "@/hooks/useDataFetching";
import { getCategories } from "@/lib/category-service";
import type { Category } from "@/types/category";

const CategoriesSection = () => {
  const { data: categories, isLoading, error } = useDataFetching(getCategories);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Section id="categories">
      <div className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                className="shadow-sm h-20 justify-between rounded-md p-3 sm:h-24 animate-pulse"
              />
            ))
          : categories?.map((item: Category, i: number) => (
              <button
                key={i}
                className="shadow-sm flex h-20 flex-col justify-between rounded-md bg-accent p-3 hover:opacity-75 sm:h-24"
              >
                <DynamicIcon
                  name={item.icon}
                  className="h-6 w-6 text-muted-foreground"
                />
                <span className="block text-left text-sm font-semibold leading-none">
                  {item.name}
                </span>
              </button>
            ))}
      </div>
    </Section>
  );
};

export default CategoriesSection;
