import axios from "axios";

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


export const createProductRequest = async (productData: { name: string; price: number; stock: number; image: string }) => {
    try {
        const response = await productApi.post('/create', productData);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la création du produit : '+ error);
    }
};

export const getProductsByIdRequest = async (id: string) => {
    console.log(id);
    try {
        const response = await productApi.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Échec de la récupération des produits : '+error);
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


