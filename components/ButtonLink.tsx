import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    label?: string;
    link?: string;
    className?: string;
}

export default function ButtonLink({ label = "Default Label", link = "/", className = "" }: ButtonProps) {
    const buttonClasses = `bg-tertiary text-primary bg-opacity-40 h-[32px] text-sm font-semibold py-1.5 text-primary px-3 rounded-md ${className}`;

    if (link) {
        return (
            <Link href={link} className={buttonClasses}>
                {label}
            </Link>
        );
    }

    return (
        <button className={buttonClasses}>
            {label}
        </button>
    );
}