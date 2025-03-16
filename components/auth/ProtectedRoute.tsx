'use client';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className={'flex w-full justify-center align-middle'}>
            <div className="loader"></div>
        </div>;
    }

    return <>{user ? children : null}</>;
};

export default ProtectedRoute;
