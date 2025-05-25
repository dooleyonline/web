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
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Item } from "@/types/item";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ItemConditionBadge, ItemNegotiableBadge } from "./item-badge";

interface ItemCardProps {
  item: Item;
}

function getRelativeTime(datetime: string): string {
  const date = new Date(datetime);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

function formatPrice(price: number): string {
  return "$" + price.toFixed(2);
}

const ItemCard = ({ item }: ItemCardProps) => {
  const relativeTime = getRelativeTime(item.postedAt);
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <HoverCard>
        <HoverCardTrigger>
          <Card className="overflow-hidden border-none rounded-md shadow-none p-1 hover:bg-accent">
            <CardContent className="relative overflow-hidden p-0 rounded-md mb-2">
              <AspectRatio ratio={1 / 1} className="w-full">
                <DrawerTrigger>
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    quality={50}
                    loading="lazy"
                    className="object-cover"
                  />
                </DrawerTrigger>
              </AspectRatio>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer backdrop-blur-sm absolute top-2 right-2 rounded-full p-2 bg-foreground/20">
                      <HeartIcon
                        size={16}
                        fill="hsl(var(--muted))"
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
            </CardContent>

            <DrawerTrigger className="text-left cursor-pointer w-full">
              <CardHeader className="p-0 block w-full">
                <CardTitle className="text-left leading-snug font-medium overflow-x-hidden whitespace-nowrap overflow-ellipsis">
                  {item.name}
                </CardTitle>

                <CardDescription className="font-bold text-foreground !mt-0 text-base">
                  {formatPrice(item.price)}
                </CardDescription>
              </CardHeader>

              <CardFooter className="p-0">
                <small className="text-muted-foreground">
                  {relativeTime} · {item.views} views
                </small>
              </CardFooter>
            </DrawerTrigger>
          </Card>
        </HoverCardTrigger>

        <ItemHoverCard {...item} />
      </HoverCard>

      <ItemDrawer {...item} />
    </Drawer>
  );
};

const ItemHoverCard = (item: Item) => {
  return (
    <HoverCardContent className="w-72 flex flex-col gap-2">
      <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
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
};

const ItemDrawer = (item: Item) => {
  const relativeTime = getRelativeTime(item.postedAt);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <DrawerContent className="px-5 pb-5 h-[calc(100vh-20px)] md:h-auto">
      <div className="flex-col md:flex-row flex md:gap-6 pt-2 h-full">
        {/* CAROUSEL */}
        <Carousel
          setApi={setApi}
          className="w-full md:w-2/5 flex flex-col gap-3"
        >
          <CarouselContent>
            {item.images.map((image, index) => (
              <CarouselItem key={index}>
                <AspectRatio
                  ratio={1 / 1}
                  className="rounded-xl overflow-hidden border"
                >
                  <Image
                    src={image}
                    alt={item.name}
                    fill
                    quality={90}
                    className="object-cover"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between">
            <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0" />
            <div className="py-2 text-center text-sm text-muted-foreground">
              Image {current} of {count}
            </div>
            <CarouselNext className="relative translate-x-0 translate-y-0 left-0 top-0" />
          </div>
        </Carousel>

        <div className="flex flex-col justify-between flex-1">
          <DrawerHeader className="text-left p-0 pt-2">
            <DrawerTitle className="text-2xl">{item.name}</DrawerTitle>
            <div className="flex gap-1">
              <ItemConditionBadge condition={item.condition} />
              <ItemNegotiableBadge negotiable={item.isNegotiable} />
            </div>
            <span className="my-2 sm:my-6 text-lg font-semibold">
              {formatPrice(item.price)}
            </span>
            <ScrollArea>
              <DrawerDescription className="text-secondary-foreground text-base">
                {item.description}
              </DrawerDescription>
            </ScrollArea>
          </DrawerHeader>

          <DrawerFooter className="p-0 pt-2">
            <div className="flex gap-2 items-center mb-2">
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
            <div className="flex gap-2">
              <DrawerClose asChild>
                <Button variant="default" size="lg" className="w-full">
                  Contact Seller
                </Button>
              </DrawerClose>
              <Button size="lg" variant="outline">
                <HeartIcon />
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </div>
    </DrawerContent>
  );
};

export const ItemCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-none rounded-none shadow-none m-1">
      <CardHeader className="relative overflow-hidden p-0 rounded-md mb-2">
        <AspectRatio ratio={1 / 1} className="w-full">
          <Skeleton className="h-full w-full animate-pulse" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-0">
        <Skeleton className="h-3 w-full animate-pulse mb-1" />
        <Skeleton className="h-3 w-16 animate-pulse mb-1" />
      </CardContent>
      <CardFooter className="p-0">
        <Skeleton className="h-3 w-20 animate-pulse" />
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
