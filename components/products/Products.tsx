'use client';
import { useState, useEffect } from "react";
import Filter from "@/components/products/Filter";
import Table from "@/components/products/Table";
import FilterContext from "@/components/context/FilterContext";
import { useTranslations } from "next-intl";
import { getProductsRequest } from "@/utils/productRequest";
import { ProductProps } from "@/utils/Interface";

export default function Products() {
    const [filter, setFilter] = useState({ searchText: "", orderBy: "", OutOfStock: false });
    const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
    const [filteredData, setFilteredData] = useState<ProductProps[]>([]); 
    const [loading, setLoading] = useState(true);
    const t = useTranslations('Components');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsRequest();
                setAllProducts(data);
                setFilteredData(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let data = [...allProducts];

        if (filter.searchText) {
            data = data.filter((product) =>
                product.label.toLowerCase().includes(filter.searchText.toLowerCase())
            );
        }

        if (filter.OutOfStock) {
            data = data.filter((product) => product.quantity <= 0);
        }


        if (filter.orderBy) {
            data = data.sort((a, b) => {
                if (filter.orderBy === t('Price')) return a.price_unit - b.price_unit;
                if (filter.orderBy === t('Name')) return a.label.localeCompare(b.label);
                if (filter.orderBy === t('Growing stock')) return a.stock - b.stock;
                if (filter.orderBy === t('Descending stock')) return b.stock - a.stock;
                if (filter.orderBy === t('Price descending')) return b.price_unit - a.price_unit;
                if (filter.orderBy === t('Price ascending')) return a.price_unit - b.price_unit;
                return 0;
            });
        }

        setFilteredData(data);
    }, [filter, t, allProducts]);



    if (loading) return <div>Loading...</div>;

    return (
        <FilterContext.Provider value={{ filter, setFilter, data: filteredData }}>
            <Filter />
            <Table products={filteredData} />
        </FilterContext.Provider>
    );
}
