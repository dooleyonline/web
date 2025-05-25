"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function SiteHeader() {
  const isMobile = useIsMobile();
  const paths = usePathname().slice(1).split("/");

  function slugToTitle(slug: string) {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {isMobile && <SidebarTrigger className="-ml-1" />}

        {paths.length > 1 && (
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
    </header>
  );
}
