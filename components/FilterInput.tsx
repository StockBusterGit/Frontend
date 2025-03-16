'use client';
import React from 'react';
import {useTranslations} from "next-intl";



interface ListSelectProps {
    onSelect: (value: string) => void;
}


const FilterInput: React.FC<ListSelectProps> = ({ onSelect }) => {
    const t = useTranslations('Components');
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };


    const options = [t('Name'), t("Growing stock"), t("Descending stock"), t('Price descending'), t('Price ascending')];

    return (
        <div >
            <select id="listSelect" onChange={handleChange} className={'text-primary font-semibold w-24  bg-transparent.5 px-4 rounded-[4px] dark:bg-transparent text-white'}>
                <option value="Filter">
                    {t('order_by')}
                </option>
                {options.map((option, index) => (
                    <option  key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterInput;