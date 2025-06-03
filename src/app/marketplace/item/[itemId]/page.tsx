"use client";

import {
  ItemBadgeSkeleton,
  ItemConditionBadge,
  ItemNegotiableBadge,
} from "@/components/item/item-badge";
import ItemCarousel, {
  ItemCarouselSkeleton,
} from "@/components/item/item-carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useItems } from "@/hooks/api/marketplace";
import formatPrice from "@/lib/utils/format-price";
import getRelativeTime from "@/lib/utils/get-relative-time";
import { HeartIcon } from "lucide-react";
import { use } from "react";

const MarketplaceItem = ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = use(params);
  const { data, isLoading, error } = useItems({ id: itemId });

  // TODO: Create skeleton loading state
  if (isLoading || !data) {
    return <MarketplaceItemSkeleton />;
  }

  if (error) {
    return (
      <p className="text-destructive-foreground">
        Error loading item: {error.message}
      </p>
    );
  }

  const item = data.data[0];

  const relativeTime = getRelativeTime(item.postedAt);

  return (
    <div className="h-full overflow-auto flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:h-fit max-h-full">
      <div className="w-full lg:w-1/3">
        <ItemCarousel item={item} />
      </div>
      <div className="flex-1 h-full flex flex-col">
        <div className="text-left p-0 grow mb-2">
          <h2 className="text-2xl font-medium">{item.name}</h2>
          <div className="flex gap-1 my-2!">
            <ItemConditionBadge condition={item.condition} />
            <ItemNegotiableBadge negotiable={item.isNegotiable} />
          </div>
          <span className="block my-3! text-xl font-semibold">
            {formatPrice(item.price)}
          </span>

          <p className="text-secondary-foreground text-base lg:min-h-[calc((100vw-256px-48px-16px)/3-160px)]">
            {item.description}
          </p>
        </div>

        <div className="flex gap-2 items-center mb-3">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <span className="mr-2 inline-block">{item.seller}</span>
            <small className="text-muted-foreground">
              {relativeTime} · {item.views} views
            </small>
          </div>
        </div>

        <div className="p-0 flex gap-2 grow-0 justify-start! space-x-0! w-full bg-background">
          <Button variant="default" size="lg" className="flex-1">
            Contact Seller
          </Button>

          <Button size="lg" variant="outline" className="shrink-0">
            <HeartIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItem;

const MarketplaceItemSkeleton = () => {
  return (
    <div className="mt-[62px] lg:mt-[70px] w-full h-full lg:h-fit max-h-full">
      <div className="h-full overflow-auto flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="w-full lg:w-1/3 mb-10 lg:mb-0">
          <ItemCarouselSkeleton />
        </div>
        <div className="flex-1 h-full flex flex-col">
          <div className="text-left p-0 grow mb-2">
            <Skeleton className="h-6 w-1/2 my-2" />
            <div className="flex gap-1 my-3!">
              <ItemBadgeSkeleton />
              <ItemBadgeSkeleton />
            </div>
            <span className="block my-3! text-xl font-semibold">
              <Skeleton className="h-6 w-20" />
            </span>

            <div className="lg:min-h-[calc((100vw-256px-48px-16px)/3-160px)]">
              <Skeleton className="h-4 w-full my-2" />
              <Skeleton className="h-4 w-full my-2" />
              <Skeleton className="h-4 w-1/3 my-2" />
            </div>
          </div>

          <div className="flex gap-2 items-center mb-3">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-10 rounded-md w-full" />
        </div>
      </div>
    </div>
  );
};
