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
import { cn } from "@/lib/utils";
import { PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, forwardRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function SiteNavbar() {
  const isMobile = useIsMobile();
  const paths = usePathname().slice(1).split("/");

  function slugToTitle(slug: string) {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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
              <UserIcon size={24} />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-hidden focus:shadow-md"
                      href="/"
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="mb-2 mt-4 text-lg font-medium">
                        @ecosbcae
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Passionate collector and seller with a keen eye for
                        unique items
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Saved Items">
                  View items you&apos;ve saved for later
                </ListItem>
                <ListItem href="/docs/installation" title="My Listings">
                  Edit and track items you&apos;ve listed for sale
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button asChild variant={"default"}>
              <Link href="/docs" passHref>
                <PlusIcon size={16} />
                Sell My Item
              </Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
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
