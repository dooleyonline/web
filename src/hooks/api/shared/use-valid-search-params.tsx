"use client";

import { ForumPostQueryParams } from "@/lib/api/forum";
import { LivingPostQueryParams } from "@/lib/api/housing";
import { MarketplaceItemQueryParams } from "@/lib/api/marketplace";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Map page names to their corresponding param types
type PageToParamsMap = {
  marketplace: MarketplaceItemQueryParams;
  living: LivingPostQueryParams;
  forum: ForumPostQueryParams;
};

type PageType = keyof PageToParamsMap;

export const useValidSearchParams = <T extends PageType>(page: T) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [queryParams, setQueryParams] = useState<PageToParamsMap[T]>();
  const [isValid, setIsValid] = useState(true);
  const isSearch = searchParams.size > 0;

  useEffect(() => {
    if (!isSearch) {
      setIsValid(true);
      return;
    }

    if (typeof page !== "string") return;

    let params: PageToParamsMap[T];

    switch (page) {
      case "marketplace":
        params = {
          id: searchParams.get("id") || "",
          q: searchParams.get("q") || "",
          category: searchParams.get("category") || "",
          subcategory: searchParams.get("subcategory") || "",
          username: searchParams.get("username") || "",
        } satisfies MarketplaceItemQueryParams as PageToParamsMap[T];
        break;
      case "living":
        params = {
          id: searchParams.get("id") || "",
          q: searchParams.get("q") || "",
        } satisfies LivingPostQueryParams as PageToParamsMap[T];
        break;

      case "forum":
        params = {
          id: searchParams.get("id") || "",
          q: searchParams.get("q") || "",
        } satisfies ForumPostQueryParams as PageToParamsMap[T];
        break;

      default:
        throw new Error(`Invalid page type: ${page}`);
    }

    setQueryParams(params);
    setIsValid(Object.values(params).some((val) => val.toString().length > 0));
  }, [page, searchParams, isSearch]);

  useEffect(() => {
    if (!isValid) {
      console.warn("Invalid search params, redirecting to main page");
      router.replace(`/${page}`);
    }
  }, [isValid, page, router]);

  return {
    isSearch,
    isValid,
    queryParams: queryParams!,
  };
};
