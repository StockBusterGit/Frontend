'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormEdit from '@/components/products/Add/FormEdit';
import { ProductDataSend, ProductProps} from "@/utils/Interface";
import {getProductsByIdRequest} from "@/utils/productRequest";

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

            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) throw new Error('Failed to update product');

            router.push('/');
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