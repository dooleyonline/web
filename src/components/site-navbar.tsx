"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import useNav from "@/hooks/use-nav";
import { cn, slugToTitle } from "@/lib/utils";
import { PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, forwardRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function SiteNavbar() {
  const isMobile = useIsMobile();
  const { paths, mainPage, navData } = useNav();

  const user = {
    fName: "John",
    lName: "Doe",
    id: "shadcn",
    avatar: "https://github.com/shadcn.png",
    summary: [
      { key: "Saved", val: 32 },
      { key: "Listed", val: 17 },
    ],
  };

  const profileLink = `/${mainPage}/usr/${user.id}`;

  return (
    <nav className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear px-2 justify-between w-full">
      <div className="w-fit p-2">
        {isMobile && <SidebarTrigger className="-ml-1 text-foreground" />}

        {!isMobile && paths.length > 1 && (
          <Breadcrumb>
            <BreadcrumbList>
              {paths.slice(0, -1).map((p, i) => (
                <Fragment key={i}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={"/" + p}>
                      {slugToTitle(p)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {i < paths.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {slugToTitle(paths.slice(-1)[0])}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <NavigationMenu className="max-w-[500px] flex-1 justify-end w-full">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href={`/${mainPage}/`}>
                <UserIcon size={24} />
              </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                      href={profileLink}
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <Avatar>
                        <AvatarImage src={user.avatar} alt="User avatar" />
                        <AvatarFallback>
                          {(user.fName + user.lName).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mb-1 mt-4 text-lg font-medium">
                        {user.id}
                      </div>
                      <ul>
                        {user.summary.map((e, i) => (
                          <li
                            key={i}
                            className="text-sm leading-tight flex justify-between"
                          >
                            <span className="text-muted-foreground">
                              {e.key}
                            </span>
                            <span>{e.val}</span>
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {navData.links.map((link, i) => (
                  <ListItem key={i} href={link.href} title={link.title}>
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant={"default"}>
              <Link href={navData.button.href} passHref>
                <PlusIcon size={16} />
                {navData.button.text}
              </Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
