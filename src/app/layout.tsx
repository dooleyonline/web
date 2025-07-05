import { fonts } from "@/components/fonts";
import Providers from "@/components/providers";
import { Sidebar } from "@/components/sidebar";
import SiteNavbar from "@/components/site-navbar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "DooleyOnline",
  description: "Welcome to DooleyOnline, a hub for Emory students",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const fontVariables = Object.entries(fonts)
  .map(([, v]) => v.variable)
  .join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontVariables} font-sans antialiased h-svh`}>
        <Providers>
          <Sidebar variant="inset" />
          <SidebarInset className="@container">
            <SiteNavbar />
            <Toaster />
            {children}
          </SidebarInset>
        </Providers>
      </body>
    </html>
  );
}
