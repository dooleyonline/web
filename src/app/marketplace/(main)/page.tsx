"use client";

import { useValidSearchParams } from "@/hooks/api/shared";

export default function Marketplace() {
  useValidSearchParams("marketplace");
  return null;
}
