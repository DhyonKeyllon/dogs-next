"use client";

import { User } from "@/shared/types";
import {
  createContext,
  Dispatch,
  Suspense,
  useContext,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";

type UserContextProps = {
  user: User | null;
  setUser: Dispatch<User | null>;
};

const UserContext = createContext<UserContextProps | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null)
    throw new Error("useContext deve estar dentro do provider");

  return context;
};

type UserContextProviderProps = {
  children: ReactNode;
  user: User | null;
};

export function UserContextProvider({
  children,
  user: userData,
}: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(userData);

  useEffect(() => {
    if (user === null) {
      setUser(userData);
    }
  }, [user, userData]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
