"use client";

import { use } from "react";

import ItemModal from "./item-modal";

export default function ItemModalPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = use(params);

  return <ItemModal itemId={itemId} />;
}
