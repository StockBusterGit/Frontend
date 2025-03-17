'use client';
import React from 'react';

interface Tag {
    id: number;
    label: string;
}

interface MultiSelectProps {
    options: Tag[];
    onSelect: (values: number[]) => void;
    label?: string;
    className?: string;
}

const MultiSelectInput: React.FC<MultiSelectProps> = ({ options, onSelect, label, className }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => parseInt(option.value));
        onSelect(selectedOptions);
    };

    return (
        <div className={`flex flex-col w-96 ${className || ''}`}>
            <label className={'text-black font-semibold font-sans mb-2 dark:text-white'}>{label}</label>
            <select
                id="multiSelect"
                onChange={handleChange}
                multiple
                className={'text-primary font-semibold bg-tertiary bg-opacity-40 py-2 px-4 rounded-[4px] dark:text-white'}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MultiSelectInput;
