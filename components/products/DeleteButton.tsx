import React from 'react';
import Link from 'next/link';
import DeleteIcon from '../../public/icons/delete_icon.svg';

interface DeleteButtonProps {
    label?: string;
    link?: string;
    className?: string;
    onClick?: () => void;
}

export default function DeleteButton({ label = "Default Label", link, className = "", onClick }: DeleteButtonProps) {
    const buttonClasses = `flex items-center justify-center text-red-600 font-semibold text ${className}`;

    if (link) {
        return (
            <Link href={link} className={buttonClasses}>
                <DeleteIcon className="text-red-600 mr-2 ml-6"/>
                {label}
            </Link>
        );
    }

    return (
        <button className={buttonClasses} onClick={onClick}>
            <DeleteIcon className="text-primary mr-2 ml-6"/>
            {label}
        </button>
    );
}