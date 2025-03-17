'use client';
import { useState, useEffect } from "react";
import Filter from "@/components/products/Filter";
import Table from "@/components/products/Table";
import FilterContext from "@/components/context/FilterContext";
import {useTranslations} from "next-intl";
import {getProductsRequest} from "@/utils/productRequest";
import { ProductProps } from "@/utils/Interface";

export default function Products() {
    const [filter, setFilter] = useState({searchText: "", orderBy: "", OutOfStock: false});
    const [filteredData, setFilteredData] =  useState<ProductProps[]>([]);
    const t = useTranslations('Components');


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const data = await getProductsRequest();
                setFilteredData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        }
        fetchProducts();
    }, []);


    useEffect(() => {
        let data = filteredData;

        if (filter.searchText) {
            data = data.filter((product) =>
                product.label.toLowerCase().includes(filter.searchText.toLowerCase())
            );
        }
        //
        // if (filter.quantity) {
        //     data = data.filter((product) => product.isOutOfStock);
        // }

        if (filter.orderBy) {
            data = data.sort((a, b) => {
                if (filter.orderBy === t('Price')) return a.price_unit - b.price_unit;
                if (filter.orderBy === t('Name')) return a.label.localeCompare(b.label);
                if (filter.orderBy === t('Growing stock')) return b.stock - a.stock;
                if (filter.orderBy === t('Descending stock')) return a.stock - b.stock;
                if (filter.orderBy === t('Price descending')) return a.price_unit - b.price_unit;
                if (filter.orderBy === t('Price ascending')) return b.price_unit - a.price_unit;
                return 0;
            });
        }

        setFilteredData(data);
    }, [filter]);

    if(!filteredData) return <div>Loading...</div>

    return (
        <FilterContext.Provider value={{filter, setFilter, data: filteredData}}>
            <Filter/>
            <Table products={filteredData}/>
        </FilterContext.Provider>
    );
}