"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile, useNav } from "@/hooks/ui";
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
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon, UserIcon } from "lucide-react";
import slugToTitle from "@/lib/utils/slug-to-title";
import cn from "@/lib/utils/cn";

export function SiteNavbar() {
  const isMobile = useIsMobile();
  const { paths, currentPage, navData } = useNav();
  const { user, accessToken, logout } = useAuth();
  const router = useRouter();

  if (!navData) return null;

  const profileLink = `/${currentPage}/usr/${user?.id}`;
  const hasLinks = (navData.links?.length ?? 0) > 0;
  const hasButton = !!navData.button?.href;

  return (
    <nav className="flex h-12 items-center border-b px-2 justify-between">
      <div className="flex items-center">
        {isMobile && <SidebarTrigger className="mr-2 text-foreground" />}
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
                  <BreadcrumbSeparator />
                </Fragment>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {slugToTitle(paths[paths.length - 1])}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      <NavigationMenu className="flex-1 justify-end">
        <NavigationMenuList>
          {user && hasLinks && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <UserIcon size={24} />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href={profileLink}
                        className="flex h-full w-full flex-col justify-end rounded-md bg-muted p-6 no-underline focus:shadow-md"
                      >
                        <Avatar>
                          <AvatarImage src={user.avatar} alt="avatar" />
                          <AvatarFallback>
                            {(user.name || user.id)?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="mt-4 text-lg font-medium">
                          {user.id}
                        </div>
                        {user.summary && (
                          <ul>
                            {user.summary.map((e, i) => (
                              <li
                                key={i}
                                className="flex justify-between text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {e.key}
                                </span>
                                <span>{e.val}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {navData.links.map((link, i) => (
                    <NavigationMenuItem key={i}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={link.href}
                          className="block rounded-md p-3 hover:bg-accent"
                        >
                          <div className="font-medium">{link.title}</div>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          {hasButton && (
            <NavigationMenuItem>
              <Button asChild>
                <Link href={navData.button.href}>
                  <PlusIcon size={16} className="mr-1" />
                  {navData.button.text}
                </Link>
              </Button>
            </NavigationMenuItem>
          )}

          {/* Sign Out / Sign In depending on sign in status */}
          {accessToken ? (
            <NavigationMenuItem>
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  router.push("/sign-in");
                }}
              >
                Sign Out
              </Button>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Button asChild variant="default">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
