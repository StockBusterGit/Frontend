import {  useEffect } from 'react';

interface ToasterProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

export default function Toaster({ message, duration = 3000, onClose }: ToasterProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity animate-fade-in">
            {message}
        </div>
    );
}