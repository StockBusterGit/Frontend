import { createContext } from "react";

interface Filter {
    searchText: string;
    orderBy: string;
    OutOfStock: boolean;
}

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    stockMax: number;
    format: string[];
    isOutOfStock: boolean;
    status: string;
}

interface FilterContextType {
    filter: Filter;
    data: Product[];
    setFilter: (filter: Filter) => void;
}

const FilterContext = createContext<FilterContextType>({
    filter: {
        searchText: '',
        orderBy: '',
        OutOfStock: false
    },
    data: [],
    setFilter: () => {}
});

export default FilterContext;