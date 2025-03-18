import { useTranslations } from "next-intl";
import StatusDisplay from "@/components/products/StatusDisplay";
import {useState} from "react";
import FiVertical from '../../public/icons/fiicon_vertical.svg';
import { useRouter } from "next/navigation";
import {ProductProps, TableProps} from "@/utils/Interface";

export default function TableHome({ products }: TableProps ) {
    const t = useTranslations('Components');
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const router = useRouter();





    // Toggle menu
    const toggleMenu = (id: number | undefined) => {
        setOpenMenuId(openMenuId === id ? null : id ?? null);
    };




    const handleClickOutside = () => {
        setOpenMenuId(null);
    };

    return (
        <div className="relative" onClick={handleClickOutside}>
            <table className="w-full mt-5 rounded-2xl">
                <thead className="py-10">
                <tr className="bg-primary bg-opacity-60 text-white py-20 text-left">
                    <th className="py-4 pl-7 w-20">{t('Id')}</th>
                    <th className="py-4">{t('Label')}</th>
                    <th className="py-4">{t('Stock')}</th>
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
                            <td>{product.stock}/{product.stock_min}</td>


                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}