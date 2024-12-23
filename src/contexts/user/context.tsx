"use client";

import { logout, validateToken } from "@/actions";
import { User } from "@/shared/types";
import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useEffect,
  useState,
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

  const validate = useCallback(async () => {
    const { ok } = await validateToken();

    if (!ok) await logout();
  }, []);

  useEffect(() => {
    if (user) validate();
  }, [user, validate]);

  useEffect(() => {
    setUser(userData);
  }, [userData, setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
