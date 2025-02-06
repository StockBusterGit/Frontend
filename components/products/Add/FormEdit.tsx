'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '@/components/TextInput';
import CounterInput from "@/components/CounterInput";
import SelectInput from "@/components/SelectInput";
import { isValidPrice, isValidStockRange, isValidText, isValidSelection } from '@/utils/formValidation';

interface FormEditProps {
    id?: number;
    label?: string;
    description?: string;
    price?: number;
    stock?: number;
    stockMaximum?: number;
    stockMinimum?: number;
    format: string[];
    status: string[];
    entreprise: string[];
    onSubmit?: (data: never) => void;
}

export default function FormEdit({ id, stock, stockMaximum, stockMinimum, format, entreprise, status, price, label, description }: FormEditProps) {
    const t = useTranslations('Product');

    const [labelText, setLabelText] = useState(label || '');
    const [descriptionText, setDescriptionText] = useState(description || '');
    const [priceValue, setPriceValue] = useState(price || 0);
    const [stockValue, setStockValue] = useState(stock || 0);
    const [stockMin, setStockMin] = useState(stockMinimum || 0);
    const [stockMax, setStockMax] = useState(stockMaximum || 100);
    const [entrepriseValue, setEntrepriseValue] = useState('');
    const [formatValue, setFormatValue] = useState('');
    const [statusValue, setStatusValue] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string | null } = {};
        if (!isValidText(labelText)) newErrors.label = t('Label is required');
        if (!isValidText(descriptionText)) newErrors.description = t('Description is required');
        if (!isValidPrice(priceValue)) newErrors.price = t('Price must be positive');
        if (!isValidStockRange(stockMin, stockMax)) newErrors.stock = t('Minimum stock must be less than or equal to maximum stock');
        if (!isValidSelection(statusValue)) newErrors.status = t('Please select a status');
        if (!isValidSelection(formatValue)) newErrors.format = t('Please select a format');
        if (!isValidSelection(entrepriseValue)) newErrors.entreprise = t('Please select a company');

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log("Valid data:", {
            stockMin, stockMax, stockValue, priceValue, descriptionText, labelText, entrepriseValue, formatValue, statusValue
        });

        // @TODO: Add API call to save data
    };

    return (
        <form onSubmit={handleSubmit} className="product-form w-1/2 flex flex-col gap-y-4">
            {id && <p> {t('Ref')} : {id}</p>}

            <div>
                <TextInput onChange={setLabelText} className="mt-3" label={t('Label')} value={labelText} />
                {errors.label && <p className="text-red-500 text-sm mt-1">{errors.label}</p>}
            </div>

            <div>
                <TextInput onChange={setDescriptionText}  label={t('Description')} value={descriptionText} />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
                <CounterInput initialCount={priceValue}  onChange={setPriceValue} label={t('Unit price')} />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div className="flex gap-4 my-4">
                <div>
                    <CounterInput initialCount={stockValue} onChange={setStockValue} max={stockMax} label={"Stock"} showMaxInLabel={true} />
                </div>
                <div>
                    <CounterInput initialCount={stockMin} onChange={setStockMin} max={stockMax} label={t('Stock minimum')} />
                </div>
                <div>
                    <CounterInput initialCount={stockMax} onChange={setStockMax} label={t('Stock maximum')} />
                </div>
            </div>
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}

            <div>
                <SelectInput onSelect={setStatusValue} options={status} label={t('Status')}  />
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>

            <div>
                <SelectInput onSelect={setFormatValue} options={format} label={t('Format')}  />
                {errors.format && <p className="text-red-500 text-sm mt-1">{errors.format}</p>}
            </div>

            <div>
                <SelectInput onSelect={setEntrepriseValue} options={entreprise} label={t('Entreprise')}  />
                {errors.entreprise && <p className="text-red-500 text-sm mt-1">{errors.entreprise}</p>}
            </div>

            <button type="submit" className="submit-button bg-secondary h-[43px] w-[168px] text-sm font-semibold py-1.5 text-primary px-8 rounded-md mt-7 hover:bg-opacity-40 transition-all duration-300">
                {t('Submit')}
            </button>
        </form>
    );
}