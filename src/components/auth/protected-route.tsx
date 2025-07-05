"use client";

import { useAuth } from "@/hooks/api/shared/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * A client-side component to protect routes.
 * It checks the authentication status from `useAuth` and handles loading states
 * and redirects to the login page if the user is not authenticated.
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the initial auth check is complete and there is no user,
    // redirect to the login page.
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  // While the auth state is loading, you can show a global spinner
  // or a skeleton component for a better user experience.
  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  // If the user is authenticated, render the children components.
  if (user) {
    return <>{children}</>;
  }

  // If not loading and no user, return null to prevent rendering children
  // before the redirect effect kicks in.
  return null;
}
