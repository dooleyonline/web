import SiteHeader from "@/components/site-header";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
};

export default Layout;
