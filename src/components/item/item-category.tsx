import { Skeleton } from "@/components/ui/skeleton";
import { MarketplaceItemCategory } from "@/lib/api/marketplace";
import Link from "next/link";

import DynamicIcon from "../dynamic-icon";

const CategoryCard = (category: MarketplaceItemCategory) => {
  return (
    <Link
      href={`/marketplace?category=${category.name}`}
      className="flex h-[72px] flex-col justify-between rounded-md bg-muted p-3 hover:opacity-75 sm:h-24"
    >
      <DynamicIcon
        name={category.icon}
        className="size-6 text-muted-foreground"
      />
      <span className="block text-left text-sm font-semibold leading-none">
        {category.name}
      </span>
    </Link>
  );
};
export default CategoryCard;

export const CategoryCardSkeleton = () => {
  return (
    <Skeleton className="h-20 justify-between rounded-md p-3 sm:h-24 animate-pulse" />
  );
};
