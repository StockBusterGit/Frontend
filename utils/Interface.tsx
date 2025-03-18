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

export interface Tag {
    id: number;
    label: string;
}

export interface ProductProps {
    id?: number;
    label: string;
    price_unit: number;
    quantity: number;
    stock: number;
    stock_min: number;
    status: number;
    company: {id: number; name: string};
    tags: [{ id: number; label: string }];
    statusEntity: {id: number; label: string};
}

export interface TableProps {
    products: {
        id?: number;
        label: string;
        price_unit: number;
        quantity: number;
        stock: number;
        stock_min: number;
        status: number;
        company: {id: number; name: string};
        tags: [{ id: number; label: string }];
        statusEntity: {id: number; label: string};
    }[];
}

export interface Tag {
    id: number;
    label: string;
}

export interface FormEditProps {
    id?: number;
    label?: string;
    price_unit?: number;
    quantity?: number;
    stock?: number;
    stock_min?: number;
    status?: number;
    company?: { id: number; name: string };
    tags?: Tag[];
    statusEntity?: { id: number; label: string };
    onSubmit?: (productData: ProductDataSend) => void;
    statusOptions?: { id: number; label: string }[];
    companyOptions?: { id: number; label: string }[];
    formatOptions?: Tag[];
}


export interface ProductDataSend {
    id?: number;
    label: string;
    price_unit: number;
    quantity: number;
    stock: number;
    stock_min: number;
    status: number;
    company: number;
    tags: Tag[];
}

export interface ProductDataSendApi {
    id?: number;
    label: string;
    price_unit: number;
    quantity: number;
    stock: number;
    stock_min: number;
    statusId: number;
    companyId: number;
    tags: number[];
}