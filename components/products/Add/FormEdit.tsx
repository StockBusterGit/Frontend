'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '@/components/TextInput';
import CounterInput from "@/components/CounterInput";
import SelectInput from "@/components/SelectInput";
import { isValidPrice, isValidStockRange, isValidText, isValidSelection } from '@/utils/formValidation';
import {ProductDataSend} from "@/utils/Interface";

interface FormEditProps {
    id?: number;
    label?: string;
    description?: string;
    price?: number;
    stock?: number;
    stockMaximum?: number;
    stockMinimum?: number;
    format?: string[];
    status?: string[];
    entreprise?: string[];
    onSubmit: (productData: ProductDataSend) => void;
}


export default function FormEdit({id, label, description, price, stock, stockMaximum, stockMinimum, format, status, entreprise, onSubmit }: FormEditProps) {
    const t = useTranslations('Product');

    const [labelText, setLabelText] = useState<string>(label || '');
    const [descriptionText, setDescriptionText] = useState<string>(description || '');
    const [priceValue, setPriceValue] = useState<number>(price || 0);
    const [stockValue, setStockValue] = useState<number>(stock || 0);
    const [stockMin, setStockMin] = useState<number>(stockMinimum || 0);
    const [stockMax, setStockMax] = useState<number>(stockMaximum || 100);
    const [formatValue, setFormatValue] = useState<string>(format?.[0] || '');
    const [statusValue, setStatusValue] = useState<string>(status?.[0] || '');
    const [entrepriseValue, setEntrepriseValue] = useState<string>(entreprise?.[0] || '');

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setLabelText(label || '');
        setDescriptionText(description || '');
        setPriceValue(price || 0);
        setStockValue(stock || 0);
        setStockMin(stockMinimum || 0);
        setStockMax(stockMaximum || 100);
        setFormatValue(format?.[0] || '');
        setStatusValue(status?.[0] || '');
        setEntrepriseValue(entreprise?.[0] || '');
    }, [id, label, description, price, stock, stockMinimum, stockMaximum, format, status, entreprise]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!isValidText(labelText)) newErrors.label = t('errors.labelRequired');
        if (!isValidText(descriptionText)) newErrors.description = t('errors.descriptionRequired');
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
            description: descriptionText,
            price: priceValue,
            stock: stockValue,
            stockMinimum: stockMin,
            stockMaximum: stockMax,
            format: formatValue,
            status: statusValue,
            entreprise: entrepriseValue,
        };

        onSubmit(productData);
    };

    return (
        <form onSubmit={handleSubmit} className="product-form w-1/2 flex flex-col gap-y-4">
            {id && <p className="text-gray-500">{t('Ref')} : {id}</p>}

            <div>
                <TextInput label={t('Label')} value={labelText} onChange={setLabelText} />
                {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
            </div>

            <div>
                <TextInput label={t('Description')} value={descriptionText} onChange={setDescriptionText} />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
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
    );
}