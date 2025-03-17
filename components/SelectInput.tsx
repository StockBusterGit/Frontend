'use client';
import React from 'react';
import { useTranslations } from "next-intl";

interface ListSelectProps {
    options: { id: number; name: string }[] | string[];
    onSelect: (value: any) => void;
    label?: string;
    className?: string;
}

const SelectInput: React.FC<ListSelectProps> = ({ options, onSelect, label, className }) => {
    const t = useTranslations('Product');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = options.find(option =>
            typeof option === 'string' ? option === event.target.value : option.name === event.target.value
        );
        onSelect(selectedValue);
    };

    return (
        <div className={`flex flex-col w-96 ${className || ''}`}>
            <label className={'text-black font-semibold font-sans mb-2 dark:text-white'}>{label}</label>
            <select id="listSelect" onChange={handleChange} className={'text-primary font-semibold bg-tertiary bg-opacity-40 py-2 px-4 rounded-[4px] dark:text-white'}>
                <option key={''} value={''}>
                    {t('Select an option')}
                </option>
                {options.map(option => (
                    <option key={typeof option === 'string' ? option : option.id} value={typeof option === 'string' ? option : option.name}>
                        {typeof option === 'string' ? option : option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
