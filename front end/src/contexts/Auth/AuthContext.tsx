import { createContext, useEffect, useState } from "react";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";

export type AuthContextType = {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  
  useEffect(() => {
    async function validateToken() {
      const storageData = localStorage.getItem("authToken");

      if (storageData) {
        console.log(storageData)
        const data = await api.validateToken(storageData);
        console.log(data)
        
        // multiple renders at here. idk why
        if (data.user) {
          setUser(data.user);
        }
      }
    }
    validateToken();
  }, [api]);

  async function signin(email: string, password: string) {
    const data = await api.signin(email, password);
    console.log(data);

    if (data) {
      setUser(data.user);
      console.log(data.token);
      setToken(data.token);
      return true;
    }

    return false;
  }

  async function register(name: string, email: string, password: string) {
    const data = await api.register(name, email, password);
    if (data.user) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }

    return false;
  }

  async function signout() {
    await api.signout();
    setUser(null);
  }

  async function setToken(token: string) {
    localStorage.setItem("authToken", token);
  }

  return (
    <AuthContext.Provider value={{ user, register, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
