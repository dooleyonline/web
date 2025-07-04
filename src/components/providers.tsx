"use client";

import { AuthProvider } from "@/contexts";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

import { SidebarProvider } from "./ui/sidebar";

type ProvidersProp = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProp) => {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          dedupingInterval: 60000, // 1 minute
          onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
            if (retryCount >= 3) return;

            // Don't retry on 404s or other client errors
            if (error.status >= 400 && error.status < 500) return;

            // Retry after 5 seconds
            setTimeout(() => revalidate({ retryCount }), 5000);
          },
        }}
      >
        <SidebarProvider>{children}</SidebarProvider>
      </SWRConfig>
    </AuthProvider>
  );
};

export default Providers;
