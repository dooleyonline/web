"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import type { Item } from "@/lib/api/marketplace/types";
import formatPrice from "@/lib/utils/format-price";
import getImageURL from "@/lib/utils/get-image-url";
import getRelativeTime from "@/lib/utils/get-relative-time";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useMemo, useState } from "react";

import { ItemConditionBadge, ItemNegotiableBadge } from "./item-badge";
import ItemCarousel from "./item-carousel";

type ItemCardProps = {
  item: Item;
  index: number;
};

const ItemCard = ({ item, index }: ItemCardProps) => {
  const relativeTime = getRelativeTime(item.postedAt);
  const link = `/marketplace/item/${item.id}`;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  const ItemLink = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <Link
        href={link}
        onNavigate={(e) => {
          e.preventDefault();
          if (isMobile) {
            router.push(link);
          } else {
            setOpen(true);
          }
        }}
      >
        {children}
      </Link>
    );
  };

  const thumbnail = (
    <Image
      src={getImageURL(item.images[0])}
      alt={item.name}
      quality={40}
      fill
      priority={index < 10}
      loading="eager"
      sizes="(max-width: 640px) 50vw, (max-width: 768px) 20vw, (max-width: 1024px) 18vw, (max-width: 1280px) 15vw, (max-width: 1920) 12vw, 350px"
      className="size-full object-cover cursor-pointer"
    />
  );

  const info = (
    <>
      <CardHeader className="p-0 block w-full">
        <CardTitle className="text-left m-0 leading-snug font-medium overflow-x-hidden whitespace-nowrap text-ellipsis">
          {item.name}
        </CardTitle>

        <CardDescription className="font-bold text-foreground mt-0! text-base">
          {formatPrice(item.price)}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-0">
        <small className="text-muted-foreground">
          {relativeTime} · {item.views} views
        </small>
      </CardFooter>
    </>
  );

  const favoriteButton = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-pointer backdrop-blur-xs absolute top-2 right-2 rounded-full p-2 bg-foreground/20">
            <HeartIcon
              size={16}
              fill="var(--muted)"
              fillOpacity={0.6}
              strokeWidth={0}
              className="hover:animate-pulse"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Add to favorites</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const hoverCard = (
    <HoverCardContent className="w-72 flex flex-col gap-2">
      <p className="overflow-hidden whitespace-nowrap text-ellipsis">
        {item.name}
      </p>
      <div className="flex gap-1">
        <ItemConditionBadge condition={item.condition} />
        <ItemNegotiableBadge negotiable={item.isNegotiable} />
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {item.description}
      </p>
    </HoverCardContent>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="overflow-hidden border-none rounded-md shadow-none p-1 hover:bg-accent touch-none relative cursor-pointer">
            <CardContent className="relative overflow-hidden p-0 rounded-md mb-2">
              <ItemLink>
                <AspectRatio ratio={1 / 1} className="w-full relative">
                  {thumbnail}
                </AspectRatio>
              </ItemLink>

              {favoriteButton}
            </CardContent>

            <ItemLink>{info}</ItemLink>
          </Card>
        </HoverCardTrigger>

        {hoverCard}
      </HoverCard>
      <ItemDialog item={item} />
    </Dialog>
  );
};

export const ItemDialog = memo(({ item }: { item: Item }) => {
  const relativeTime = useMemo(
    () => getRelativeTime(item.postedAt),
    [item.postedAt]
  );

  return (
    <DialogContent className="h-[min(90svh,1000px)] flex flex-col gap-2 bg-background">
      <div className="h-full overflow-auto flex flex-col gap-2">
        <ItemCarousel item={item} />

        <DialogHeader className="text-left p-0 grow mb-2">
          <DialogTitle className="text-2xl font-medium">
            {item.name}
          </DialogTitle>
          <div className="flex gap-1 my-2!">
            <ItemConditionBadge condition={item.condition} />
            <ItemNegotiableBadge negotiable={item.isNegotiable} />
          </div>
          <span className="block my-3! text-xl font-semibold">
            {formatPrice(item.price)}
          </span>

          <DialogDescription className="text-secondary-foreground text-base">
            {item.description}
          </DialogDescription>
        </DialogHeader>

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
      </div>

      <DialogFooter className="p-0 flex gap-2 grow-0 justify-start! space-x-0! w-full bg-background rounded-md">
        <DialogClose asChild>
          <Button variant="default" size="lg" className="flex-1">
            Contact Seller
          </Button>
        </DialogClose>
        <Button size="lg" variant="outline" className="shrink-0">
          <HeartIcon />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
});
ItemDialog.displayName = "ItemDialog";

export const ItemCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-none rounded-none shadow-none m-1">
      <CardHeader className="relative overflow-hidden p-0 rounded-md mb-2">
        <AspectRatio ratio={1 / 1} className="w-full">
          <Skeleton className="h-full w-full animate-pulse" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-0">
        <Skeleton className="h-4 w-full animate-pulse mb-1" />
        <Skeleton className="h-4 w-16 animate-pulse mb-1" />
      </CardContent>
      <CardFooter className="p-0">
        <Skeleton className="h-4 w-20 animate-pulse" />
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
