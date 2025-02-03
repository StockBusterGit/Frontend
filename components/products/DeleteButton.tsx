import React from 'react';
import Link from 'next/link';
import DeleteIcon from '../../public/icons/delete_icon.svg';

interface DeleteButtonProps {
    label?: string;
    link?: string;
    className?: string;
}

export default function DeleteButton({ label = "Default Label", link = "/", className = "" }: DeleteButtonProps) {
    const buttonClasses = `flex items-center justify-center ${className}`;

    if (link) {
        return (
            <Link href={link} className={buttonClasses}>
                <DeleteIcon className="text-primary mr-2 ml-6"/>
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