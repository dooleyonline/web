"use client";

import ItemModal from "@/components/item/item-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useItems } from "@/hooks/api/marketplace";
import { useRouter } from "next/navigation";
import { use } from "react";
import { memo } from "react";

const ItemDialog = memo(
  ({ params }: { params: Promise<{ itemId: string }> }) => {
    const { itemId } = use(params);
    const router = useRouter();

    const { data, isLoading, error } = useItems({
      id: itemId,
    });
    const item = data?.data[0];

    return (
      <Dialog defaultOpen onOpenChange={router.back}>
        <DialogContent
          showCloseButton={false}
          className="h-[min(90svh,1000px)] flex flex-col gap-2 bg-background rounded-lg"
        >
          <DialogTitle className="sr-only">{item?.name}</DialogTitle>
          <DialogDescription className="sr-only">
            {item?.description}
          </DialogDescription>
          <ItemModal item={item} isLoading={isLoading} error={error} />
        </DialogContent>
      </Dialog>
    );
  }
);
ItemDialog.displayName = "ItemDialog";

export default ItemDialog;
