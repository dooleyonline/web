import SiteHeader from "@/components/site-header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Marketplace @ dooleyonline",
  description: "Find what you need. Sell what you don't",
};

const MarketplaceLayout = ({
  gallery,
  itemModal,
  children,
}: Readonly<{
  gallery: React.ReactNode;
  itemModal: React.ReactNode;
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SiteHeader />
      <main>
        {gallery}
        {itemModal}
        {children}
      </main>
    </>
  );
};

export default MarketplaceLayout;
