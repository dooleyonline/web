"use client";

import { setAuthHooks } from "@/lib/api/core/client";
import { User, authApi } from "@/lib/api/shared";
import { jwtDecode } from "jwt-decode";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      const decodedUser: User = jwtDecode(token);
      setUser(decodedUser);
    } else {
      setUser(null);
    }
  }, []);

  const signIn = useCallback(
    (token: string) => setAccessToken(token),
    [setAccessToken]
  );

  const signOut = useCallback(async () => {
    setAccessToken(null);
    await authApi.signOut();
  }, [setAccessToken]);

  useEffect(() => {
    setAuthHooks(() => accessToken, setAccessToken, signOut);
  }, [accessToken, setAccessToken, signOut]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);

      const { data, error } = await authApi.me();

      if (error || !data) {
        console.error("Error fetching user:", error);
        setUser(null);
        return;
      }

      setUser(data);
    };

    checkAuthStatus().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
