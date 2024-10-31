'use client';
import React from 'react';


interface ListSelectProps {
    options: string[];
    onSelect: (value: string) => void;
}

const ListPageInput: React.FC<ListSelectProps> = ({ options, onSelect }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };

    return (
        <div>
            <label className={'text-primary font-semibold font-sans mr-2'}>Page </label>
            <select id="listSelect" onChange={handleChange} className={'text-primary font-semibold  bg-tertiary bg-opacity-40 py-1.5 px-4 rounded-[4px]'}>
                {options.map((option, index) => (
                    <option  key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ListPageInput;