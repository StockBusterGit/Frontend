'use client';
import { useState, useEffect } from "react";
import Filter from "@/components/products/Filter";
import Table from "@/components/products/Table";
import FilterContext from "@/components/context/FilterContext";
import {useTranslations} from "next-intl";

const fakeData = [
    { id: 1, name: "Product 1", price: 10.99, stock: 100, stockMax: 200, format: ["small", "medium"], isOutOfStock: false, status: "In order" },
    { id: 2, name: "Product 2", price: 20.99, stock: 50, stockMax: 150, format: ["medium", "large"], isOutOfStock: false, status: "In stock" },
    { id: 3, name: "Product 3", price: 30.99, stock: 0, stockMax: 100, format: ["large"], isOutOfStock: true, status: "Out of stock" },
];

export default function Products() {
    const [filter, setFilter] = useState({ searchText: "", orderBy: "", OutOfStock: false });
    const [filteredData, setFilteredData] = useState(fakeData);
    const t = useTranslations('Components');

    useEffect(() => {
        let data = fakeData;

        if (filter.searchText) {
            data = data.filter((product) =>
                product.name.toLowerCase().includes(filter.searchText.toLowerCase())
            );
        }

        if (filter.OutOfStock) {
            data = data.filter((product) => product.isOutOfStock);
        }

        if (filter.orderBy) {
            data = data.sort((a, b) => {
                if (filter.orderBy === t('Price')) return a.price - b.price;
                if (filter.orderBy === t('Name')) return a.name.localeCompare(b.name);
                if (filter.orderBy === t('Growing stock')) return b.stock - a.stock;
                if (filter.orderBy === t('Descending stock')) return a.stock - b.stock;
                return 0;
            });
        }

        setFilteredData(data);
    }, [filter]);

    return (
        <FilterContext.Provider value={{ filter, setFilter, data: filteredData }}>
            <Filter />
            <Table products={filteredData} />
        </FilterContext.Provider>
    );
}