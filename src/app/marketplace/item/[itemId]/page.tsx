"use client";

import ItemModal from "@/components/item/item-modal";
import { useItems } from "@/hooks/api/marketplace";
import { use } from "react";

const MarketplaceItem = ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = use(params);
  const { data, isLoading, error } = useItems({ id: itemId });
  const item = data?.data[0];

  return (
    <main className="size-full">
      <ItemModal item={item} isLoading={isLoading} error={error} />
    </main>
  );
};

export default MarketplaceItem;
