"use client";

import SiteHeader from "@/components/site-header";
import { usePathname, useRouter } from "next/navigation";

const HeaderSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname.toLowerCase() === "/marketplace";

  const handleSearch = (query: string) => {
    router.push(`/marketplace/search?q=${encodeURIComponent(query)}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SiteHeader
      isMainPage={isMainPage}
      onSearch={handleSearch}
      onBack={handleBack}
      searchPlaceholder="Search for anything ..."
    />
  );
};

export default HeaderSection;
