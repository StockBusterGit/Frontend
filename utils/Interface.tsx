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
    label?: string;
    description?: string;
    price?: number;
    stock?: number;
    stockMaximum?: number;
    stockMinimum?: number;
    format?: string[];
    status?: string[];
    entreprise?: string[];
    onSubmit: (productData: ProductData) => void;
}

export interface ProductDataSend {
    id?: number;
    label: string;
    description: string;
    price: number;
    stock: number;
    stockMaximum: number;
    stockMinimum: number;
    format: string;
    status: string;
    entreprise: string;
}
