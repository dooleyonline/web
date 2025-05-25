import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "@/types/item";
import Image from "next/image";

import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

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

const ItemCard = ({ item }: ItemCardProps) => {
  const relativeTime = getRelativeTime(item.postedAt);

  return (
    <Card className="overflow-hidden border-none rounded-none shadow-none cursor-pointer">
      <CardHeader className="relative overflow-hidden p-0 rounded-md mb-2">
        <AspectRatio ratio={1 / 1} className="w-full">
          <Image src={item.images[0]} alt={item.name} fill />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-0">
        <span className="block font-medium w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
          {item.name}
        </span>
        <span className="font-bold">${item.price.toFixed(2)}</span>
      </CardContent>
      <CardFooter className="p-0">
        <small>
          {relativeTime} · {item.views}
        </small>
      </CardFooter>
    </Card>
  );
};

export const ItemCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border-none rounded-none shadow-none">
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
