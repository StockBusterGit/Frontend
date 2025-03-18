'use client';
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { useAuth } from '@/components/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const t = useTranslations('Auth');
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleLogin = async () => {
        try {
            await login(email, password);
        } catch (err) {
            setError('Échec de la connexion. Veuillez réessayer.'+err);
        }
    };

    return (
        <div>
            <h1 className={'title'}>{t('Login Page')}</h1>
            <div>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full max-w-xs">
                        <form
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    {t('Email')}
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="text"
                                    placeholder={t('Email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    {t('Password')}
                                </label>
                                <input
                                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder={'******************'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs italic">{error}</p>}
                            <div>
                                <button
                                    className="bg-primary hover:bg-primaryDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    {t('Sign in')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
