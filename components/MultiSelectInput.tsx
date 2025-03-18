import React, { useEffect, useState } from "react";
import { Tag } from "@/utils/Interface";

interface MultiSelectInputProps {
    options: Tag[];
    selectedValues: Tag[];
    onSelect: (values: Tag[]) => void;
    label: string;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({ options, selectedValues, onSelect, label }) => {
    const [selected, setSelected] = useState<Tag[]>(selectedValues || []);

    useEffect(() => {
        setSelected(selectedValues || []);
    }, [selectedValues]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => {
            const id = Number(option.value);
            return options.find(tag => tag.id === id)!;
        });

        setSelected(selectedOptions);
        onSelect(selectedOptions);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select
                multiple
                value={selected.map(tag => tag.id.toString())}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
                {options.map(tag => (
                    <option key={tag.id} value={tag.id}>
                        {tag.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MultiSelectInput;