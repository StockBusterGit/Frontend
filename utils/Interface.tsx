export interface ProductData {
    id?: number;
    label: string;
    description: string;
    price: number;
    stock: number;
    stockMaximum: number;
    stockMinimum: number;
    format: string[];
    status: string[];
    entreprise: string[];
}

export interface FormEditProps {
    id?: number;
    label: string;
    price_unit: number;
    quantity: number;
    stock: number;
    stock_min: number;
    status: string;
    company: {id: number; name: string};
    tags: [{ id: number; label: string }];
    statusEntity: object;
}

export interface ProductDataSend {
    id?: number;
    label: string;
    price_unit: number;
    quantity: number;
    stock: number;
    stock_min: number;
    status: string;
    company: {id: number; name: string};
    tags: [{ id: number; label: string }];
    statusEntity: object;
}

export interface ProductProps {
    id?: number;
    label: string;
    price_unit: number;
    quantity: number;
    stock: number;
    stock_min: number;
    status: string;
    company: {id: number; name: string};
    tags: [{ id: number; label: string }];
    statusEntity: object;
}

export interface TableProps {
    products: {
        id?: number;
        label: string;
        price_unit: number;
        quantity: number;
        stock: number;
        stock_min: number;
        status: string;
        company: {id: number; name: string};
        tags: [{ id: number; label: string }];
        statusEntity: object;
    }[];
}

