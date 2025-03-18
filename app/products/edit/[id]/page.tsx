'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormEdit from '@/components/products/Add/FormEdit';
import {ProductDataSend, ProductDataSendApi, ProductProps} from "@/utils/Interface";
import {getProductsByIdRequest, updateProductRequest} from "@/utils/productRequest";

export default function EditProductPage() {
    const t = useTranslations('Product');
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [product, setProduct] = useState<ProductProps | null>(null);


    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const data = await getProductsByIdRequest(id);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        }
        fetchProducts();
    }, []);

    const handleFormSubmit = async (updatedProduct: ProductDataSend) => {
        try {
            if (!id) return;

            const tagIds = updatedProduct.tags.map(tag => tag.id);

            const productData: ProductDataSendApi = {
                label: updatedProduct.label,
                price_unit: updatedProduct.price_unit,
                quantity: updatedProduct.quantity,
                stock: updatedProduct.stock,
                stock_min: updatedProduct.stock_min,
                tags: tagIds,
                statusId: updatedProduct.status,
                companyId: updatedProduct.company,
            };

            await updateProductRequest(id, productData);

            router.push('/products');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error updating product');
        }
    };
    if (loading) return <div className={"w-full"}><div className={"loader"}></div></div>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">{t('Edit Product')}</h1>
            {product && <FormEdit {...product} onSubmit={handleFormSubmit} />}
        </div>
    );
}