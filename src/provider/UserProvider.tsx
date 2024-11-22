/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/User";
import { verifyUser } from "./../utils/verifyUser";

type UserContext = {
  isSignedIn: boolean;
  isAdmin: boolean;
  login(
    email: string,
    password: string
  ): {
    ok: boolean;
    error: {
      [key: string]: string;
    };
    user: User | undefined;
  };
  logout(): void;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const signed = localStorage.getItem("user");

  useEffect(() => {
    if (signed) {
      const userData = JSON.parse(signed);
      setUser(userData);
    }
  }, [signed]);

  const isSignedIn = !!localStorage.getItem("user");

  const isAdmin = user?.role === "admin";

  function login(email: string, password: string) {
    const verify = verifyUser(email, password);

    if (verify.ok) {
      const data = {
        email: verify.user!.email,
        role: verify.user!.role,
      };

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
    }

    return verify;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{ login, logout, isAdmin, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return user;
}
