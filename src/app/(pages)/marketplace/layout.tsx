import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Marketplace @ dooleyonline",
  description: "Find what you need. Sell what you don't",
};

const MarketplaceLayout = ({
  children,
  gallery,
}: Readonly<{
  children: React.ReactNode;
  gallery: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <>
      {gallery}
      {children}
    </>
  );
};

export default MarketplaceLayout;
