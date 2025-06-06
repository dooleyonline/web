import { fonts } from "@/components/fonts";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteNavbar } from "@/components/site-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata, Viewport } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css";


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${fontVariables} font-sans antialiased h-svh`}>
//         <SidebarProvider>
//           <AppSidebar variant="inset" />
//           <SidebarInset>
//             <SiteNavbar />
//             {children}
//           </SidebarInset>
//         </SidebarProvider>
//       </body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <SidebarProvider>
           <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteNavbar />
              {children}
            </SidebarInset>
         </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}