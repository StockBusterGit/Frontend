'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { loginRequest, logoutRequest } from '@/utils/authRequest';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                setUser({
                    username: decodedToken.username,
                    id: decodedToken.sub,
                });
            } catch (error) {
                console.error('Erreur lors du décodage du token:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userData = await loginRequest({ email, password });
            const decodedToken: any = jwtDecode(userData.access_token);
            setUser({
                username: decodedToken.username,
                id: decodedToken.sub,
            });
            Cookies.set('token', userData.access_token, { expires: 7 });
            router.push('/');
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            Cookies.remove('token');
            router.push('/auth/login');
        } catch (error) {
            console.error('Erreur de déconnexion:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
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
