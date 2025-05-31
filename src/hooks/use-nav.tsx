import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useNav() {
  const pathname = usePathname().toLowerCase();

  const { paths, mainPage, isMainPage } = useMemo(() => {
    const lp = pathname.toLowerCase();
    const p = lp.slice(1).split("/");
    return {
      pathname: lp,
      paths: p,
      mainPage: p[0] || "",
      isMainPage: p.length === 1 && p[0] !== "",
    };
  }, [pathname]);

  if (mainPage !== "" && !(mainPage in nav)) {
    console.log(mainPage);
    console.error("No sugh page!");
  }

  const navData =
    mainPage in nav ? nav[mainPage as keyof typeof nav] : undefined;

  if (!navData) {
    console.error("Could not find navigation data for", mainPage);
  }

  return useMemo(
    () => ({
      pathname,
      paths,
      mainPage,
      isMainPage,
      navData,
    }),
    [pathname, paths, mainPage, isMainPage, navData]
  );
}

const nav = {
  marketplace: {
    profile: "/marketplace/profile",
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
  },
  living: {
    profile: "/marketplace/profile",
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
      text: "New Post",
    },
  },
  forum: {
    profile: "/marketplace/profile",
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
      text: "New Post",
    },
  },
};
