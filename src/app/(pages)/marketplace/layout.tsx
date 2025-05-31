import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Marketplace @ dooleyonline",
  description: "Find what you need. Sell what you don't",
};

const MarketplaceLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default MarketplaceLayout;
