"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useNav from "@/hooks/ui/use-nav";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const { mainPage } = useNav();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <Link
              key={item.title}
              href={`/${mainPage === "home" ? "" : mainPage}`}
              style={{
                background:
                  mainPage === item.url.slice(1) ? "var(--sidebar-accent)" : "",
                color:
                  mainPage === item.url.slice(1)
                    ? "var(--sidebar-accent-foreground)"
                    : "",
              }}
              className="cursor-pointer overflow-hidden rounded-md"
            >
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
