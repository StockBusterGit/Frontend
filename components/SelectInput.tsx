'use client';
import React from 'react';


interface ListSelectProps {
    options: string[];
    onSelect: (value: string) => void;
}

const SelectInput: React.FC<ListSelectProps> = ({ options, onSelect }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };

    return (
        <div className={'flex flex-col w-96'}>
            <label className={'text-black font-semibold font-sans mb-2'}>Page </label>
            <select id="listSelect" onChange={handleChange} className={'text-primary font-semibold  bg-tertiary bg-opacity-40 py-2 px-4  rounded-[4px]'}>
                {options.map((option, index) => (
                    <option  key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;