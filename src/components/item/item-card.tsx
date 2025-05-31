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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/ui/use-mobile";
import { CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME } from "@/lib/env";
import type { Item } from "@/types/item";
import { DialogTitle } from "@radix-ui/react-dialog";
import { HeartIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";

import { ItemConditionBadge, ItemNegotiableBadge } from "./item-badge";

type ItemCardProps = {
  item: Item;
  index: number;
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

function getImageURL(src: string): string {
  if (!CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME) {
    console.error("CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME not configured.");
    return "";
  }

  const domain = CLOUDFRONT_DISTRIBUTION_DOMAIN_NAME.replace(/\/+$/, "");
  const path = src.replace(/^\/+/, "");
  return `https://${domain}/${path}`;
}

const ItemCard = ({ item, index }: ItemCardProps) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const relativeTime = getRelativeTime(item.postedAt);

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

  return isMobile ? (
    <Drawer open={open} onOpenChange={setOpen}>
      <Card className="overflow-hidden border-none rounded-md shadow-none p-1 hover:bg-accent">
        <CardContent className="relative overflow-hidden p-0 rounded-md mb-2">
          <AspectRatio ratio={1 / 1} className="w-full">
            <DrawerTrigger>{thumbnail}</DrawerTrigger>
          </AspectRatio>

          {favoriteButton}
        </CardContent>

        <DrawerTrigger className="text-left cursor-pointer w-full">
          {info}
        </DrawerTrigger>
      </Card>

      <ItemDrawer {...item} />
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <HoverCard>
        <HoverCardTrigger>
          <Card className="overflow-hidden border-none rounded-md shadow-none p-1 hover:bg-accent touch-none">
            <CardContent className="relative overflow-hidden p-0 rounded-md mb-2">
              <AspectRatio ratio={1 / 1} className="w-full relative">
                <DialogTrigger asChild>{thumbnail}</DialogTrigger>
              </AspectRatio>

              {favoriteButton}
            </CardContent>

            <DialogTrigger className="text-left cursor-pointer w-full">
              {info}
            </DialogTrigger>
          </Card>
        </HoverCardTrigger>

        {hoverCard}
      </HoverCard>
      <ItemDialog {...item} />
    </Dialog>
  );
};

export const ItemDrawer = memo((item: Item) => {
  const relativeTime = useMemo(
    () => getRelativeTime(item.postedAt),
    [item.postedAt]
  );

  return (
    <DrawerContent className="h-[calc(100svh-20px)] p-4 gap-2 flex flex-col">
      <div className="h-full overflow-auto scroll flex flex-col gap-2">
        <ItemCarousel {...item} />
        <DrawerHeader className="text-left p-0 grow mb-2 flex flex-col">
          <DrawerTitle className="text-2xl font-medium">
            {item.name}
          </DrawerTitle>
          <div className="flex gap-1 my-2!">
            <ItemConditionBadge condition={item.condition} />
            <ItemNegotiableBadge negotiable={item.isNegotiable} />
          </div>
          <span className="block my-2! text-xl font-semibold">
            {formatPrice(item.price)}
          </span>

          <DrawerDescription className="text-secondary-foreground text-base">
            {item.description}
          </DrawerDescription>
        </DrawerHeader>
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
      <DrawerFooter className="p-0 flex flex-row gap-2 justify-start! space-x-0! w-full bg-background">
        <DrawerClose asChild>
          <Button variant="default" size="lg" className="flex-1">
            Contact Seller
          </Button>
        </DrawerClose>
        <Button size="lg" variant="outline" className="shrink-0">
          <HeartIcon />
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
});
ItemDrawer.displayName = "ItemDrawer";

export const ItemDialog = memo((item: Item) => {
  const relativeTime = useMemo(
    () => getRelativeTime(item.postedAt),
    [item.postedAt]
  );

  return (
    <DialogContent className="h-[min(90svh,1000px)] flex flex-col gap-2">
      <div className="h-full overflow-auto flex flex-col gap-2">
        <ItemCarousel {...item} />

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

      <DialogFooter className="p-0 flex gap-2 grow-0 justify-start! space-x-0! w-full bg-background">
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

const ItemCarousel = memo((item: Item) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleClick = () => {
    if (!api) return;
    if (current === count - 1) api.scrollTo(0);
    else api.scrollNext();
  };

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {item.images.map((image, index) => (
          <CarouselItem key={index}>
            <AspectRatio
              ratio={1 / 1}
              className="rounded-lg overflow-hidden border"
            >
              <Image
                src={getImageURL(image)}
                alt={item.name}
                fill
                quality={60}
                loading="lazy"
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 70vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-between mt-2">
        <CarouselPrevious className="relative translate-x-0 translate-y-0 left-0 top-0" />
        <div onClick={handleClick} className="py-2 flex gap-1 items-center">
          {[...Array(count)].map((_, i) => (
            <motion.div
              key={i}
              animate={
                i === current
                  ? {
                      width: 12,
                      opacity: 0.8,
                    }
                  : { width: 8, opacity: 0.2 }
              }
              className="h-2 rounded-full border bg-muted-foreground"
            />
          ))}
        </div>
        <CarouselNext className="relative translate-x-0 translate-y-0 left-0 top-0" />
      </div>
    </Carousel>
  );
});
ItemCarousel.displayName = "ItemCarousel";

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
