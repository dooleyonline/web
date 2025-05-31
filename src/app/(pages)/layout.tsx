import SiteHeader from "@/components/site-header";
import { SiteNavbar } from "@/components/site-navbar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SiteNavbar />
      <SiteHeader />
      {children}
    </>
  );
};

export default Layout;
