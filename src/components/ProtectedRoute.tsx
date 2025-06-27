"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accessToken, refreshToken, isLoading, login, logout } = useAuth();
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const ensureAuth = async () => {
      if (isLoading) return;

      if (!accessToken) {
        if (refreshToken) {

          try {
            const res = await fetch(
              `https://api.dooleyonline.net/auth/login/refresh/`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
              }
            );
            if (res.ok) {
              const { access } = await res.json();

              login(access, refreshToken);
            } else {
              throw new Error("Refresh failed");
            }
          } catch {

            logout();
            router.push("/sign-in");
          }
        } else {

          router.push("/sign-in");
        }
      }

      setChecking(false);
    };

    ensureAuth();
  }, [isLoading, accessToken, refreshToken, login, logout, router]);


  if (isLoading || checking || !accessToken) {
    return null;
  }

  return <>{children}</>;
}
