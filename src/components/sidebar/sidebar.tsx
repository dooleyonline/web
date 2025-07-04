"use client";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BellIcon,
  GlobeIcon,
  HomeIcon,
  SettingsIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import NavUser from "./nav-user";

const data = {
  navMain: [
    {
      title: "Marketplace",
      url: "/marketplace",
      icon: ShoppingBasketIcon,
    },
    {
      title: "Living",
      url: "/living",
      icon: HomeIcon,
    },
    {
      title: "Forum",
      url: "/forum",
      icon: GlobeIcon,
    },
  ],
  navSecondary: [
    {
      title: "Notifications",
      url: "#",
      icon: BellIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ],
};

export function Sidebar({ ...props }: ComponentProps<typeof SidebarComponent>) {
  return (
    <SidebarComponent collapsible="offcanvas" {...props}>
      <SidebarHeader className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={32} height={32} />
                <span className={`font-logo text-base font-medium`}>
                  dooleyonline
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </SidebarComponent>
  );
}
