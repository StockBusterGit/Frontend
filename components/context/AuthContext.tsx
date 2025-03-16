'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { loginRequest, logoutRequest } from '@/utils/authRequest';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    const login = async (email: string, password: string) => {
        try {
            const userData = await loginRequest({ email, password });
            setUser(userData);

        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    const logout = async () => {
        try {
            await logoutRequest();
            setUser(null);
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};
