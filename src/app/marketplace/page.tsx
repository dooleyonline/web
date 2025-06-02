"use client";

import { useValidSearchParams } from "@/hooks/api/shared";

export default function Marketplace() {
  useValidSearchParams({
    page: "marketplace",
  });
  return null;
}
