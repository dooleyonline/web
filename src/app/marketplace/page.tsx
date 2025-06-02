"use client";

import useValidSearchParams from "@/hooks/ui/use-valid-search-params";

export default function Marketplace() {
  useValidSearchParams({
    page: "marketplace",
  });
  return null;
}
