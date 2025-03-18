import { useTranslations } from "next-intl";
import StatusDisplay from "@/components/products/StatusDisplay";
import {useState} from "react";
import FiVertical from '../../public/icons/fiicon_vertical.svg';
import { useRouter } from "next/navigation";
import {ProductProps, TableProps} from "@/utils/Interface";

export default function Table({ products }: TableProps ) {
    const t = useTranslations('Components');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const router = useRouter();
    const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);



    // Toggle menu
    const toggleMenu = (id: number | undefined) => {
        setOpenMenuId(openMenuId === id ? null : id ?? null);
    };

    const handleClickOutside = () => {
        setOpenMenuId(null);
    };

    const handleMouseEnter = (productId: number | undefined) => {
        if (productId !== undefined) {
            setHoveredProductId(productId);
        }
    };

    const handleMouseLeave = () => {
        setHoveredProductId(null);
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
                    products.map((product: ProductProps, index: number) => (
                        <tr
                            key={product.id}
                            className={`bg-tertiaryLight text-primary font-medium w-full py-10 ${
                                index % 2 === 0 ? "bg-tertiaryLight dark:bg-primary dark:text-white" : "bg-primary bg-opacity-30 dark:bg-tertiaryDark dark:text-white"
                            }`}
                        >
                            <td className="py-3 pl-7">#{product.id}</td>
                            <td className="text-left">{product.label}</td>
                            <td>{product.price_unit} €</td>
                            <td>{product.stock}/{product.stock_min}</td>
                            <td  className="relative"
                                 onMouseEnter={() => handleMouseEnter(product!.id)}
                                 onMouseLeave={handleMouseLeave}> {product.tags.length > 2 ? (
                                <div className="flex items-center">
                                    {product.tags.slice(0, 2).map((tag, index) => (
                                        <span key={index} className="bg-primary bg-opacity-30 text-white rounded-md px-2 py-1 text-xs mr-2">
                                                    {tag.label}
                                                </span>
                                    ))}
                                    <button className="bg-primary bg-opacity-30 text-white rounded-md px-2 py-1 text-xs">
                                        +{product.tags.length - 2}
                                    </button>
                                </div>
                            ) : (
                                product.tags.map((tag, index) => (
                                    <span key={index} className="bg-primary bg-opacity-30 text-white rounded-md px-2 py-1 text-xs mr-2">
                                                {tag.label}
                                            </span>
                                ))
                            )}
                                {hoveredProductId === product.id && product.tags.length > 2 && (
                                    <div className="absolute top-0 right-0 mt-2 p-2 w-1/2 bg-white shadow-lg rounded-md z-50 border border-gray-300">
                                        {product.tags.slice(2).map((tag, index) => (
                                            <span key={index} className="block bg-primary bg-opacity-30 text-white rounded-md px-2 py-1 text-xs mb-2">
                                                    {tag.label}
                                                </span>
                                        ))}
                                    </div>
                                )}

                            </td>
                            <td>
                                <StatusDisplay IsOutOfStock={product.quantity <= 0} status={product.statusEntity.label} />
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
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:text-black "
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