import { createContext } from "react";
import { ProductProps } from "@/utils/Interface";

interface Filter {
    searchText: string;
    orderBy: string;
    OutOfStock: boolean;
}


interface FilterContextType {
    filter: Filter;
    data: ProductProps[];
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