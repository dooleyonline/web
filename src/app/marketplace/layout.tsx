import { SiteNavbar, type SiteNavbarProps } from "@/components/site-navbar";
import { Metadata } from "next";

import HeaderSection from "./_sections/header";

export const metadata: Metadata = {
  title: "Marketplace @ dooleyonline",
  description: "Find what you need. Sell what you don't",
};

const navData: SiteNavbarProps["data"] = {
  username: "John Doe",
  profile: "/marketplace/profile",
  avatar: "https://github.com/shadcn.png",
  summary: [
    { key: "Saved", val: 32 },
    { key: "Listed", val: 17 },
  ],
  links: [
    {
      href: "/marketplace/profile/saved",
      title: "Saved Items",
      description: "View items I've saved for later",
    },
    {
      href: "/marketplace/profile/listing",
      title: "My Listing",
      description: "Edit and track items I've listed for sale",
    },
  ],
  button: {
    href: "/marketplace/new",
    text: "Sell My Stuff",
  },
};

const MarketplaceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SiteNavbar data={navData} />
      <HeaderSection />
      {children}
    </>
  );
};

export default MarketplaceLayout;
