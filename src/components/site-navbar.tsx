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
import { useAuth } from "@/hooks/api/shared";
import { useIsMobile, useNav } from "@/hooks/ui";
import { getInitial } from "@/lib/utils";
import cn from "@/lib/utils/cn";
import slugToTitle from "@/lib/utils/slug-to-title";
import { PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  Fragment,
  forwardRef,
} from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const SiteNavbar = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { paths, navData } = useNav();

  const isLinkVisible = navData?.links.length > 0 || false;
  const isButtonVisible = navData?.button.href !== "" || false;

  if (!navData) {
    return null;
  }

  return (
    <nav className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear px-2 justify-between w-full">
      <div className="w-fit p-2">
        {isMobile && <SidebarTrigger className="-ml-1 text-foreground" />}

        {paths.length > 1 && (
          <Breadcrumb className="hidden md:block">
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

      <NavigationMenu
        viewport
        className="max-w-[320px] md:max-w-[420px] lg:max-w-[520px] flex-1 justify-end"
      >
        <NavigationMenuList>
          {isLinkVisible && user && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href={navData.profile}>
                  <UserIcon size={24} />
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 w-[300px] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-muted p-6 hover:bg-muted/70"
                        href={navData.profile}
                      >
                        <Avatar>
                          <AvatarImage src={user?.avatar} alt="User avatar" />
                          <AvatarFallback>{getInitial(user)}</AvatarFallback>
                        </Avatar>
                        <div className="mb-1 mt-4 text-lg font-medium">
                          {user.username}
                        </div>
                        <ul>
                          {/* {user.summary.map((e, i) => (
                              <li
                                key={i}
                                className="text-sm leading-tight flex justify-between"
                              >
                                <span className="text-muted-foreground">
                                  {e.key}
                                </span>
                                <span>{e.val}</span>
                              </li>
                            ))} */}
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
          )}
          {isButtonVisible && (
            <NavigationMenuItem>
              <Button asChild variant={"default"}>
                <Link href={navData.button.href} passHref>
                  <PlusIcon size={16} />
                  {navData.button.text}
                </Link>
              </Button>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default SiteNavbar;

const ListItem = forwardRef<ComponentRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
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
  }
);
ListItem.displayName = "ListItem";
