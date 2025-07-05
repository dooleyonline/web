"use client";

import { User, authApi } from "@/lib/api/shared";
import { ReactNode, createContext, useEffect, useState } from "react";

type HandleSignInProps = {
  newAccessToken: string;
  newRefreshToken: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  handleSignIn: ({
    newAccessToken,
    newRefreshToken,
  }: HandleSignInProps) => void;
  handleSignOut: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      const { data, error } = await authApi.me();

      if (error || !data) {
        console.error("Error fetching user:", error);
        setUser(null);
        return;
      }

      setUser(data);
      setIsLoading(false);
    };

    const localAccessToken = localStorage.getItem("accessToken");
    const localRefreshToken = localStorage.getItem("refreshToken");

    if (localAccessToken && localRefreshToken) {
      setAccessToken(localAccessToken);
      setRefreshToken(localRefreshToken);
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const refreshAuth = async () => {
      if (isLoading) return;

      if (!accessToken && refreshToken) {
        const { data, error } = await authApi.refresh({ refreshToken });

        if (error || !data) {
          console.error("Error refreshing auth:", error);
          handleSignOut();
          return;
        }

        handleSignIn({
          newAccessToken: data.access,
          newRefreshToken: refreshToken,
        });
      }
    };

    refreshAuth();
  }, [accessToken, isLoading, refreshToken]);

  const handleSignIn = async ({
    newAccessToken,
    newRefreshToken,
  }: HandleSignInProps) => {
    setIsLoading(true);

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    setIsLoading(false);
  };

  const handleSignOut = async () => {
    setIsLoading(true);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        accessToken,
        refreshToken,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
