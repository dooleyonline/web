"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  summary?: { key: string; val: number }[];
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoading: boolean;
  login: (access: string, refresh: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial Load: load tokens from localStorage
  useEffect(() => {
    const savedAccess = localStorage.getItem("accessToken");
    const savedRefresh = localStorage.getItem("refreshToken");
    if (savedAccess && savedRefresh) {
      setAccessToken(savedAccess);
      setRefreshToken(savedRefresh);
      // fetchUserProfile(savedAccess);
    } else {
      setIsLoading(false);
    }
  }, []);

  // login: save tokens and set user
  // Note: fetchUserProfile is commented out for now, you can uncomment it to fetch
  const handleLogin = (newAccess: string, newRefresh: string) => {
    localStorage.setItem("accessToken", newAccess);
    localStorage.setItem("refreshToken", newRefresh);
    setAccessToken(newAccess);
    setRefreshToken(newRefresh);
    // fetchUserProfile(newAccess);
    setIsLoading(false);
  };

  // logout: clear tokens and user
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
