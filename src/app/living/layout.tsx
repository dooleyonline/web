import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Living @ dooleyonline",
  description: "Find your perfect place; WIP",
};

const LivingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default LivingLayout;
