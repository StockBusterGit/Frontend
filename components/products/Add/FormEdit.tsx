'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '@/components/TextInput';
import CounterInput from "@/components/CounterInput";
// import { createProduct } from '@/utils/api';

interface FormEditProps {
    id: number;
    label?: string;
    description?: string;
    price?: number;
    stock?: number;
    stockMaximum?: number;
    format: string;
    entreprise: string;
}

export default function FormEdit({ id, stock, stockMaximum, format, entreprise, price, label, description }: FormEditProps) {
    const t = useTranslations('Product');
    const [labelText, setLabelText] = useState(label || '');
    const [descriptionText, setDescriptionText] = useState(description || '');
    const [priceValue, setPriceValue] = useState(price || 0);
    const [stockValue, setStockValue] = useState(stock || 0);
    const [entrepriseValue, setEntrepriseValue] = useState(entreprise);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // const productData = {
        //     id,
        //     label: labelText,
        //     description: descriptionText,
        //     price: priceValue,
        //     stock: stockValue,
        //     stockMaximum: stockMaxValue,
        //     format: formatValue,
        //     entreprise: entrepriseValue,
        // };

        // try {
        //     const result = await createProduct(productData);
        //     console.log('Product created successfully:', result);
        // } catch (error) {
        //     console.error('Error creating product:', error);
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form w-1/2 ">
            <p>{t('Ref')} : {id}</p>
            <TextInput onChange={setLabelText} className="mt-3" label={t('Label')} value={labelText}  />
            <TextInput onChange={setDescriptionText} className="mt-3" label={t('Description')} value={descriptionText} />
            <CounterInput initialCount={priceValue} onChange={setPriceValue} label={"test"} />
            <CounterInput initialCount={stockValue} onChange={setStockValue} max={stockMaximum} label={"test"}   />
            <TextInput onChange={setEntrepriseValue} className="" label={t('Entreprise')} value={entrepriseValue} />
            <button type="submit" className="submit-button bg-tertiary text-primary bg-opacity-40 h-[32px] text-sm font-semibold py-1.5 text-primary px-3 rounded-md">{t('Submit')}</button>
        </form>
    );
}