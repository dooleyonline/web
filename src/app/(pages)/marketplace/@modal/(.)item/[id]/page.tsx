"use client";

import { ItemDialog, ItemDrawer } from "@/components/item/item-card";
import { useIsMobile } from "@/hooks/ui/use-mobile";
// import { getItemById } from "@/lib/item-service";
import type { Item } from "@/types/item";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Adjust based on your data fetching method

export default function ItemModalPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [item, setItem] = useState<Item | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch the item data when the component mounts
    const fetchItem = async () => {
      try {
        const itemData = await getItemById(params.id);
        setItem(itemData);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching item:", error);
        // Redirect to the marketplace if item not found
        router.push("/marketplace");
      }
    };

    fetchItem();
  }, [params.id, router]);

  // Close handler navigates back to the marketplace
  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  // Show loading state while fetching item
  if (!item) return null;

  // Render either ItemDialog or ItemDrawer based on device
  return isMobile ? (
    <ItemDrawer {...item} open={isOpen} onOpenChange={handleClose} />
  ) : (
    <ItemDialog {...item} open={isOpen} onOpenChange={handleClose} />
  );
}
