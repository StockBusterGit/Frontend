import { useTranslations } from "next-intl";
import StatusDisplay from "@/components/products/StatusDisplay";
import { useState } from "react";
import FiVertical from '../../public/icons/fiicon_vertical.svg';
import { useRouter } from "next/navigation";

export interface TableProps {
    products: {
        id: number;
        name: string;
        price: number;
        stock: number;
        stockMax: number;
        format: string[];
        isOutOfStock: boolean;
        status: string;
    }[];
}

export default function Table({ products }: TableProps) {
    const t = useTranslations('Components');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const router = useRouter();

    // Toggle menu
    const toggleMenu = (id: number) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };


    const handleClickOutside = () => {
        setOpenMenuId(null);
    };

    return (
        <div className="relative" onClick={handleClickOutside}>
            <table className="w-full mt-5">
                <thead className="py-10">
                <tr className="bg-primary bg-opacity-60 text-white py-20 text-left">
                    <th className="py-4 pl-7 w-20">{t('Id')}</th>
                    <th className="py-4">{t('Label')}</th>
                    <th className="py-4">{t('Price')}</th>
                    <th className="py-4">{t('Stock')}</th>
                    <th className="py-4">{t('Format')}</th>
                    <th className="py-4">{t('Status')}</th>
                    <th className="py-4 pr-7 w-10"></th>
                </tr>
                </thead>
                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="text-center py-4">
                            {t('No data available')}
                        </td>
                    </tr>
                ) : (
                    products.map((product, index) => (
                        <tr
                            key={product.id}
                            className={`bg-tertiaryLight text-primary font-medium w-full py-10 ${
                                index % 2 === 0 ? "bg-tertiaryLight" : "bg-primary bg-opacity-30"
                            }`}
                        >
                            <td className="py-3 pl-7">#{product.id}</td>
                            <td className="text-left">{product.name}</td>
                            <td>{product.price} €</td>
                            <td>{product.stock}/{product.stockMax}</td>
                            <td>{product.format.join(", ")}</td>
                            <td>
                                <StatusDisplay IsOutOfStock={product.isOutOfStock} status={product.status} />
                            </td>
                            <td className="relative">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMenu(product.id);
                                    }}
                                    className="p-2 rounded-md hover:bg-tertiaryDark transition-all duration-300"
                                >
                                    <FiVertical className="text-lg" />
                                </button>


                                {openMenuId === product.id && (
                                    <div
                                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-md rounded-md z-50"
                                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                                    >
                                        <button
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                            onClick={() => router.push(`/products/edit/${product.id}`)}
                                        >
                                             {t('Edit')}
                                        </button>
                                        <button
                                            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                                            onClick={() => alert(`Delete product #${product.id}`)}
                                        >
                                            {t('Delete')}
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}