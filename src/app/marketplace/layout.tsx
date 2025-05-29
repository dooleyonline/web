import { Metadata } from "next";

import HeaderSection from "./_sections/header";

export const metadata: Metadata = {
  title: "Marketplace @ dooleyonline",
  description: "Find what you need. Sell what you don't",
};

const MarketplaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderSection />
      {children}
    </>
  );
};

export default MarketplaceLayout;
