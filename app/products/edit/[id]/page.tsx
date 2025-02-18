'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FormEdit from '@/components/products/Add/FormEdit';
import { ProductData, ProductDataSend } from "@/utils/Interface";

export default function EditProductPage() {
    const t = useTranslations('Product');
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [product, setProduct] = useState<ProductData | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) return;
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) throw new Error('Failed to fetch product');
                const data: ProductData = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching product');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

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

    if (loading) return <p>{t('Loading...')}</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">{t('Edit Product')}</h1>
            {product && <FormEdit {...product} onSubmit={handleFormSubmit} />}
        </div>
    );
}