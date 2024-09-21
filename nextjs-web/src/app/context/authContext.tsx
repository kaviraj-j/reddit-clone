"use client";

import { User } from "@/lib/data-types";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userDetails: User, tokenDetails: string) => void;
  logout: () => void;
}

// Create the Auth context with default value `undefined`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (userDetails: User, tokenDetails: string) => {
    setUser(userDetails);
    setToken(tokenDetails);
    localStorage.setItem("user", JSON.stringify(userDetails));
    localStorage.setItem("token", tokenDetails);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext); // `AuthContext` used as a value, not namespace
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
