import axios from "axios";
import {ProductDataSendApi} from "@/utils/Interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const productApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProductsRequest = async () => {
    try {
        const response = await productApi.get('products');
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération des produits : '+error);
    }
}


export const createProductRequest = async (productData: ProductDataSendApi) => {
    try {
        const response = await productApi.post('products', productData);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la création du produit : '+ error);
    }
};

export const getProductsByIdRequest = async (id: string) => {
    try {
        const response = await productApi.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération des produits : '+error);
    }
}

export const updateProductRequest = async (productId: string, productData: ProductDataSendApi) => {
    try {
        const url = `products/${productId}`;
        const response = await productApi.patch(url, productData);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la mise à jour du produit : '+error);
    }
}

export const deleteProductRequest = async (productId: number) => {
    try {
        const response = await productApi.delete(`/delete/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la suppression du produit : '+error);
    }
};

export const getStatusRequest = async () => {
    try {
        const response = await productApi.get('/status');
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération des status : '+error);
    }
}

export const getCompaniesRequest = async () => {
    try {
        const response = await productApi.get('/companies');
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération des entreprises : '+error);
    }
}

export const getTagsRequest = async () => {
    try {
        const response = await productApi.get('/tags');
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération des tags : '+error);
    }
}

export const getStatusByIdRequest = async (id: number) => {
    try {
        const response = await productApi.get(`status/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération du statut : '+error);
    }
}



