import { fonts } from "@/components/fonts";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteNavbar } from "@/components/site-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "dooleyonline",
  description: "Welcome to dooleyonline, a hub for Emory students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts.sans.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteNavbar />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
