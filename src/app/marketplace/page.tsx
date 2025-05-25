import SiteSearchBar from "@/components/site-search-bar";
import { Metadata } from "next";

import CategoriesSection from "./_sections/categories";
import ForYouSection from "./_sections/for-you";
import MarketplaceHeaderSection from "./_sections/marketplace-header";

export const metadata: Metadata = {
  title: "Marketplace @ dooleyonline",
  description: "Find what you need. Sell what you don't",
};

export default function Marketplace() {
  return (
    <main>
      <MarketplaceHeaderSection />
      <SiteSearchBar />
      <CategoriesSection />
      <ForYouSection />
    </main>
  );
}
