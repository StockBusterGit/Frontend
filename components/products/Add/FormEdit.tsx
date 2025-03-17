'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '@/components/TextInput';
import CounterInput from "@/components/CounterInput";
import SelectInput from "@/components/SelectInput";
import { isValidPrice, isValidStockRange, isValidText, isValidSelection } from '@/utils/formValidation';
import {FormEditProps, ProductDataSend} from "@/utils/Interface";
import Toaster from "@/components/Toaster";
import {redirect} from "next/navigation";



export default function FormEdit({id, label, price_unit, quantity, stock_min, tags, status, company, onSubmit }: FormEditProps) {
    const t = useTranslations('Product');

    const [labelText, setLabelText] = useState<string>(label || '');
    const [priceValue, setPriceValue] = useState<number>(price_unit || 0);
    const [stockValue, setStockValue] = useState<number>(price_unit || 0);
    const [stockMin, setStockMin] = useState<number>(stock_min || 0);
    const [formatValue, setFormatValue] = useState<string>(tags || {1, ''});
    const [statusValue, setStatusValue] = useState<string>(status?.[0] || '');
    const [entrepriseValue, setEntrepriseValue] = useState<string>(company?.[0] || '');
    const [showToaster, setShowToaster] = useState<boolean>(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setLabelText(label || '');
        setPriceValue(price_unit || 0);
        setStockValue(stock || 0);
        setStockMin(stockMinimum || 0);
        setFormatValue( '');
        setStatusValue('');
        setEntrepriseValue( '');
    }, [id, label, price_unit, stock, stockMinimum, stockMaximum, format, status, entreprise]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        console.log(entrepriseValue);
        if (!isValidText(labelText)) newErrors.label = t('errors.labelRequired');
        if (!isValidPrice(priceValue)) newErrors.price = t('errors.pricePositive');
        if (!isValidStockRange(stockMin, stockMax)) newErrors.stock = t('errors.stockRangeInvalid');
        if (!isValidSelection(statusValue)) newErrors.status = t('errors.selectStatus');
        if (!isValidSelection(formatValue)) newErrors.format = t('errors.selectFormat');
        if (!isValidSelection(entrepriseValue)) newErrors.entreprise = t('errors.selectCompany');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;


    };

    useEffect(() => {
        if (stockValue > stockMax) {
            setStockValue(stockMax);
        }
    }, [stockValue, stockMax]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const productData: ProductDataSend = {
            id,
            label: labelText,
            price_unit: priceValue,
            stock: stockValue,
            stock_min: stockMin,
            tags: formatValue,
            status: statusValue,
            entreprise: entrepriseValue,
        };

        onSubmit(productData);
        setShowToaster(true);

        setTimeout(() => {
            redirect('/products');
        }, 2000);
    };

    return (
        <>
        {showToaster && <Toaster message={t('Product saved successfully!')} onClose={() => setShowToaster(false)} />}
        <form onSubmit={handleSubmit} className="product-form w-1/2 flex flex-col gap-y-4">
            {id && <p className="text-gray-500">{t('Ref')} : {id}</p>}

            <div>
                <TextInput label={t('Label')} value={labelText} onChange={setLabelText} />
                {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
            </div>

            <div>
                <CounterInput label={t('Unit price')} initialCount={priceValue} onChange={setPriceValue} />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div className="flex gap-4 my-4">
                <div>
                    <CounterInput initialCount={stockValue} onChange={setStockValue} max={stockMax} showMaxInLabel={true} label={t('Stock')} integer={true} />
                </div>
                <div>
                    <CounterInput initialCount={stockMin} onChange={setStockMin} max={stockMax} label={t('Stock minimum')} integer={true} />
                </div>
                <div>
                    <CounterInput initialCount={stockMax} onChange={setStockMax} label={t('Stock maximum')} integer={true} />
                </div>
            </div>
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}

            <div>
                <SelectInput onSelect={setStatusValue} options={status || []} label={t('Status')} />
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>

            <div>
                <SelectInput onSelect={setFormatValue} options={format || []} label={t('Format')} />
                {errors.format && <p className="text-red-500 text-sm mt-1">{errors.format}</p>}
            </div>

            <div>
                <SelectInput onSelect={setEntrepriseValue} options={entreprise || []} label={t('Entreprise')} />
                {errors.entreprise && <p className="text-red-500 text-sm mt-1">{errors.entreprise}</p>}
            </div>

            <button type="submit" className="bg-secondary h-[43px] w-[168px] text-sm font-semibold py-1.5 text-primary px-8 rounded-md mt-7 hover:bg-opacity-40 transition-all duration-300">
                {t('Submit')}
            </button>
        </form>
        </>
    );
}