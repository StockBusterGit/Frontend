'use client';

import Searchbar from "@/components/Searchbar";
import { useState, useContext } from "react";
import CheckboxInput from "@/components/CheckboxInput";
import FilterInput from "@/components/FilterInput";
import ButtonLink from "@/components/ButtonLink";
import FilterContext from "@/components/context/FilterContext";
import {useTranslations} from "next-intl";

export default function Filter() {
    const { filter, setFilter } = useContext(FilterContext);
    const [searchText, setSearchText] = useState(filter.searchText);
    const [orderBy, setOrderBy] = useState(filter.orderBy);
    const [outOfStock, setOutOfStock] = useState(filter.OutOfStock);
    const t = useTranslations('Components');

    console.log(orderBy);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setFilter({ ...filter, searchText: e.target.value });
    };

    const handleSelect = (value: string) => {
        setOrderBy(value);
        setFilter({ ...filter, orderBy: value });
    };

    const handleOutOfStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOutOfStock(e.target.checked);
        setFilter({ ...filter, OutOfStock: e.target.checked });
    };

    console.log(filter);

    return (
        <div className={'flex justify-between mt-4 pb-8 border-b-2 border-tertiary border-opacity-20'}>
            <Searchbar onChange={handleSearchChange} value={searchText} />
            <div className={'flex flex-nowrap justify-center items-center space-x-9 '}>
                <FilterInput onSelect={handleSelect} />
                <CheckboxInput label={'En rupture'} onChange={handleOutOfStockChange} checked={outOfStock} />
                <ButtonLink link={'/products/add'} label={t('Create')} />
            </div>
        </div>
    );
}