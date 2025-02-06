'use client';
import { useTranslations } from "next-intl";
import DeleteButton from "@/components/products/DeleteButton";
import Image from "next/image";
import { useState } from "react";

interface ProfilePictureProps {
    src?: string;
    onChange: (newSrc: string) => void;
    className?: string;
}

export default function ProfilePicture({ src, onChange, className }: ProfilePictureProps) {
    const t = useTranslations('Product');
    const [preview, setPreview] = useState<string>(src || "/images/placeholder.jpg");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setPreview(result);
                onChange(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`w-1/2 h-full  ${className || ''}`}>
            <Image src={preview} width={300} height={300} className={'w-3/4'} alt="Profile Picture" />
            <div className="flex mt-4">
                <label className="bg-tertiary text-primary font-semibold px-4 py-2 rounded cursor-pointer">
                    {t('Edit')}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
                <DeleteButton label={t('Delete')} onClick={() => {
                    setPreview("/images/placeholder.jpg");
                    onChange("/images/placeholder.jpg");
                }} />
            </div>
        </div>
    );
}