"use client";

import {
  ItemConditionBadge,
  ItemNegotiableBadge,
} from "@/components/item/item-badge";
import ItemCarousel from "@/components/item/item-carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useItems } from "@/hooks/api/marketplace";
import formatPrice from "@/lib/utils/format-price";
import getRelativeTime from "@/lib/utils/get-relative-time";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo } from "react";

type ItemModalProps = {
  itemId: string;
};

export const ItemModal = memo((props: ItemModalProps) => {
  const { itemId } = props;
  const { data, isLoading, error } = useItems({
    id: itemId,
  });
  const item = data?.data[0];
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (error || !item) {
    console.error("Error fetching item:", itemId);
    return null;
  }

  const relativeTime = getRelativeTime(item?.postedAt);

  return (
    <Dialog defaultOpen onOpenChange={router.back}>
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
    </Dialog>
  );
});
ItemModal.displayName = "ItemDialog";

export default ItemModal;
