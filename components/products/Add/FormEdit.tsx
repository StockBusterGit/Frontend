'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '@/components/TextInput';
import CounterInput from "@/components/CounterInput";
import SelectInput from "@/components/SelectInput";
// import { createProduct } from '@/utils/api';

interface FormEditProps {
    id: number;
    label?: string;
    description?: string;
    price?: number;
    stock?: number;
    stockMaximum?: number;
    stockMinimum?: number;
    format: string[];
    status: string[];
    entreprise: string[];
}

export default function FormEdit({ id, stock, stockMaximum, stockMinimum,format, entreprise, status, price, label, description }: FormEditProps) {
    const t = useTranslations('Product');
    const [labelText, setLabelText] = useState(label || '');
    const [descriptionText, setDescriptionText] = useState(description || '');
    const [priceValue, setPriceValue] = useState(price || 0);
    const [stockValue, setStockValue] = useState(stock || 0);
    const [stockMin, setStockMin] = useState(stockMinimum || 0);
    const [stockMax, setStockMax] = useState(stockMaximum || 0);
    const [entrepriseValue, setEntrepriseValue] = useState('');
    const [formatValue, setFormatValue] = useState('');
    const [statusValue, setStatusValue] = useState('');


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
        <form onSubmit={handleSubmit} className="product-form w-1/2 flex-col gap-y-5">
            <p>{t('Ref')} : {id}</p>
            <TextInput onChange={setLabelText} className="mt-3" label={t('Label')} value={labelText}  />
            <TextInput onChange={setDescriptionText} className="my-3" label={t('Description')} value={descriptionText} />
            <CounterInput initialCount={priceValue} className="my-3" onChange={setPriceValue} label={t('Unit price')} />
            <div className={'flex gap-4 my-4 '}>
                <CounterInput initialCount={stockValue} onChange={setStockValue} max={stockMax} label={"Stock"}   />
                <CounterInput initialCount={stockMinimum} onChange={setStockMin} max={stockMax} label={t('Stock minimum')}   />
                <CounterInput initialCount={stockMaximum} onChange={setStockMax} label={t('Stock maximum')}   />
            </div>
            <SelectInput onSelect={setStatusValue} options={status} label={t('Status')} className={'my-4'}/>
            <SelectInput onSelect={setFormatValue} options={format} label={t('Format')} className={'my-4'}   />
            <SelectInput onSelect={setEntrepriseValue} options={entreprise} label={t('Entreprise')} className={'my-4'}/>

            <button type="submit" className="submit-button bg-secondary bg-opacity-40 h-[32px] text-sm font-semibold py-1.5 text-primary px-3 rounded-md mt-10">{t('Submit')}</button>
        </form>
    );
}