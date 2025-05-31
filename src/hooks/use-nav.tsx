import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useNav() {
  const pathname = usePathname().toLowerCase();

  const { paths, mainPage, isMainPage } = useMemo(() => {
    const lp = pathname.toLowerCase();
    const p = lp.slice(1).split("/");

    if (p[0] === "") {
      console.error("Can't load useNav in a root page!");
    } else if (!(p[0] in nav)) {
      console.error(`Unknown main page: ${p[0]}`); // most likely never gonna trigger since invalid urls are handled by Not Found page
    }

    return {
      pathname: lp,
      paths: p,
      mainPage: p[0] as keyof typeof nav,
      isMainPage: p.length === 1 && p[0] !== "",
    };
  }, [pathname]);

  return useMemo(
    () => ({
      pathname,
      paths,
      mainPage,
      isMainPage,
      navData: nav[mainPage],
      pages: Object.keys(nav),
    }),
    [pathname, paths, mainPage, isMainPage]
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
