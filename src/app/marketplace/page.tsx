"use client";

import SiteSearchBar from "@/components/site-search-bar";
import { useRouter } from "next/navigation";

import CategoriesSection from "./_sections/categories";
import ForYouSection from "./_sections/for-you";
import MarketplaceHeaderSection from "./_sections/marketplace-header";

export default function Marketplace() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    router.push(`/marketplace/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <main>
      <MarketplaceHeaderSection />
      <SiteSearchBar onSearch={handleSearch} />
      <CategoriesSection />
      <ForYouSection />
    </main>
  );
}
