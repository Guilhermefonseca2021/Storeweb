import { createContext, useState } from 'react';
import { User } from '../../types/User';
import { useApi } from '../../hooks/useApi';

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: JSX.Element}) {
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    async function signin(email: string, password: string) {
        const data = await api.signin(email, password);
        if (data.user && data.token) {
            setUser(data.user);
            return true;
        }
        return false;
    }

    async function signout() {
        await api.signout();
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}