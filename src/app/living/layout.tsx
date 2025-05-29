import { SiteNavbar } from "@/components/site-navbar";
import { Metadata } from "next";

import HeaderSection from "./_sections/header";

export const metadata: Metadata = {
  title: "Living @ dooleyonline",
  description: "",
};

const LivingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SiteNavbar primaryButtonText="New Post" />
      <HeaderSection />
      {children}
    </>
  );
};

export default LivingLayout;
