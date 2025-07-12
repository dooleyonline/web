"use client";

import { useValidSearchParams } from "@/hooks/api/shared";

import Home from "./home";
import Search from "./search";

const Gallery = () => {
  const { queryParams, isSearch } = useValidSearchParams({
    page: "marketplace",
  });

  return isSearch ? <Search queryParams={queryParams} /> : <Home />;
};
export default Gallery;
