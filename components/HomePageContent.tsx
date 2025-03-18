'use client';
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getProductsRequest } from "@/utils/productRequest";
import { ProductProps } from "@/utils/Interface";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import TableHome from "@/components/home/TableHome";

export default function HomePageContent() {
    const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations('Components');
    const x = useTranslations('HomePage');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsRequest();
                setAllProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Fonction pour obtenir le nombre total de produits
    const getTotalProducts = () => {
        return allProducts.length;
    };

    if (loading) return <div className={"loader"}></div>;

    return (
        <>
            <ProtectedRoute>
                <h1>{x('title')}</h1>
                <div className={'flex'}>
                    <div className={"w-1/2 bg-tertiaryLight mr-4 mt-5 flex justify-center align-middle"}>
                        <div className={"my-auto flex-col justify-center align-middle"}>
                            <h3 className={"text-4xl font-black text-center"}>{getTotalProducts()}</h3>
                            <h2 className={"text-4xl font-black text-center"}>{t('Total products')}</h2>
                        </div>
                    </div>
                    <div className={"w-1/2"}>
                    <TableHome products={allProducts} />
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
}