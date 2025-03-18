import React from 'react';
import { useTranslations } from "next-intl";

interface ListSelectProps {
    options: { id: number; label: string }[] | string[];
    onSelect: (value: any) => void;
    label?: string;
    className?: string;
    defaultValue?: string | number;
}



const SelectInput: React.FC<ListSelectProps> = ({ options, onSelect, label, className, defaultValue }) => {
    const t = useTranslations('Product');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value, 10);
        onSelect(selectedId);
    };

    return (
        <div className={`flex flex-col w-96 ${className || ''}`}>
            <label className={'text-black font-semibold font-sans mb-2 dark:text-white'}>{label}</label>
            <select id="listSelect" onChange={handleChange} value={defaultValue} className={'text-primary font-semibold bg-tertiary bg-opacity-40 py-2 px-4 rounded-[4px] dark:text-white'}>
                <option key={''} value={''} disabled>
                    {t('Select an option')}
                </option>
                {options.map(option => (
                    <option key={typeof option === 'string' ? option : option.id} value={typeof option === 'string' ? option : option.id}>
                        {typeof option === 'string' ? option : option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
