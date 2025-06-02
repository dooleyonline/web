"use client";

import { ForumPostQueryParams } from "@/lib/api/forum";
import { LivingPostQueryParams } from "@/lib/api/housing";
import { MarketplaceItemQueryParams } from "@/lib/api/marketplace";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Map page names to their corresponding param types
type PageToParamsMap = {
  marketplace: MarketplaceItemQueryParams;
  living: LivingPostQueryParams;
  forum: ForumPostQueryParams;
};

type PageType = keyof PageToParamsMap;

type QueryParams = PageToParamsMap[PageType];

const useValidSearchParams = (props: { page: PageType }) => {
  const { page } = props;
  const searchParams = useSearchParams();

  const [queryParams, setQueryParams] = useState<QueryParams>();
  const [isValid, setIsValid] = useState(true);
  const isSearch = searchParams.size > 0;

  useEffect(() => {
    if (!isSearch) {
      setIsValid(true);
      return;
    }

    let params: QueryParams;

    switch (page) {
      case "marketplace":
        params = {
          id: searchParams.get("id") || "",
          q: searchParams.get("q") || "",
          category: searchParams.get("category") || "",
          subcategory: searchParams.get("subcategory") || "",
        } satisfies MarketplaceItemQueryParams;
        break;
      case "living":
        params = {
          id: searchParams.get("id") || "",
          q: searchParams.get("q") || "",
        } satisfies LivingPostQueryParams;
        break;

      case "forum":
        params = {
          id: searchParams.get("id") || "",
          q: searchParams.get("q") || "",
        } satisfies ForumPostQueryParams;
        break;

      default:
        throw new Error("Invalid page:", page);
    }

    setQueryParams(params);
    setIsValid(Object.values(params).some((val) => val.length > 0));
  }, [page, searchParams, isSearch]);

  useEffect(() => {
    if (!isValid) {
      console.warn("Invalid search params, redirecting to main page");
      window.location.replace(`/${page}`);
    }
  }, [isValid, page]);

  return {
    isSearch,
    isValid,
    queryParams: queryParams as QueryParams,
  };
};

export default useValidSearchParams;
