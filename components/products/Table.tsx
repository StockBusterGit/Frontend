import {useTranslations} from "next-intl";
import StatusDisplay from "@/components/products/StatusDisplay";


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

export default function Table({products}: TableProps) {
    const t = useTranslations('Components');
    return (
        <div>
            <table className={'w-full mt-5'}>
                <thead className={'py-10 '}>
                <tr className={'bg-primary bg-opacity-60 text-white py-20 text-left'}>
                    <th className={'py-4 pl-7 w-20'}>{t('Id')}</th>
                    <th className={'py-4 '}>{t('Label')}</th>
                    <th className={'py-4'}>{t('Stock')}</th>
                    <th className={'py-4'}>{t('Price')}</th>
                    <th className={'py-4'}>{t('Format')}</th>
                    <th className={'py-4'}>{t('Status')}</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr className={`bg-tertiaryLight text-primary font-medium w-full py-10 ${index % 2 === 0 ? 'bg-tertiaryLight' : 'bg-primary bg-opacity-30'}`} key={index}>
                        <td className={'py-3 pl-7'}>#{product.id}</td>
                        <td className={'text-left'}>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}/{product.stockMax}</td>
                        <td>{product.format.join(', ')}</td>
                        <td><StatusDisplay IsOutOfStock={product.isOutOfStock} status={product.status} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}