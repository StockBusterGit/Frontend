'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import TextInput from '@/components/TextInput';
import CounterInput from "@/components/CounterInput";
import SelectInput from "@/components/SelectInput";
import { isValidPrice, isValidStockRange, isValidText, isValidSelection } from '@/utils/formValidation';
import { FormEditProps, ProductDataSend, Tag } from "@/utils/Interface";
import Toaster from "@/components/Toaster";
import { redirect } from "next/navigation";
import { getStatusRequest, getCompaniesRequest, getTagsRequest } from '@/utils/productRequest';
import MultiSelectInput from "@/components/MultiSelectInput";

const transformOptions = (options: { id: number; label?: string; name?: string }[]) => {
    return options.map(option => ({
        id: option.id,
        label: option.label || option.name || '',
    }));
};

export default function FormEdit({ id, label, price_unit, quantity, stock_min, stock, tags, status, company, onSubmit, statusEntity }: FormEditProps) {
    const t = useTranslations('Product');

    const [labelText, setLabelText] = useState<string>(label || '');
    const [priceValue, setPriceValue] = useState<number>(price_unit || 0);
    const [stockValue, setStockValue] = useState<number>(quantity || 0);
    const [stockMin, setStockMin] = useState<number>(stock_min || 0);
    const [stockMax, setStockMax] = useState<number>(stock || 100);
    const [statusValue, setStatusValue] = useState<number>(statusEntity?.id || 0);
    const [entrepriseValue, setEntrepriseValue] = useState<number>(company?.id || 0);
    const [showToaster, setShowToaster] = useState<boolean>(false);
    const [statusOptions, setStatusOptions] = useState<{ id: number; label: string }[]>([]);
    const [companyOptions, setCompanyOptions] = useState<{ id: number; label: string }[]>([]);
    const [formatOptions, setFormatOptions] = useState<Tag[]>([]);
    const [formatValue, setFormatValue] = useState<Tag[]>(tags || []);

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setLabelText(label || '');
        setPriceValue(price_unit || 0);
        setStockValue(quantity || 0);
        setStockMin(stock_min || 0);
        setStockMax(stock || 100);
        setFormatValue(tags || []);
        setStatusValue(statusEntity?.id || 0);
        setEntrepriseValue(company?.id || 0);

        const fetchStatus = async () => {
            try {
                const statusData = await getStatusRequest();
                const transformedStatus = transformOptions(statusData);
                setStatusOptions(transformedStatus);

                // Set default value for status
                const defaultStatus = transformedStatus.find(s => s.id === statusEntity?.id)?.id || 0;
                setStatusValue(defaultStatus);
            } catch (error) {
                console.error('Erreur lors de la récupération des statuts :', error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const companyData = await getCompaniesRequest();
                const transformedCompanies = transformOptions(companyData);
                setCompanyOptions(transformedCompanies);

                const defaultCompany = transformedCompanies.find(c => c.id === company?.id)?.id || 0;
                setEntrepriseValue(defaultCompany);
            } catch (error) {
                console.error('Erreur lors de la récupération des entreprises :', error);
            }
        };

        const fetchTags = async () => {
            try {
                const tagsData = await getTagsRequest();
                const transformedTags = transformOptions(tagsData);
                setFormatOptions(transformedTags);
            } catch (error) {
                console.error('Erreur lors de la récupération des tags :', error);
            }
        };

        fetchStatus();
        fetchCompanies();
        fetchTags();
    }, [id, label, price_unit, quantity, stock_min, tags, status, company, statusEntity]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!isValidText(labelText)) newErrors.label = t('errors.labelRequired');
        if (!isValidPrice(priceValue)) newErrors.price = t('errors.pricePositive');
        if (!isValidStockRange(stockMin, stockMax)) newErrors.stock = t('errors.stockRangeInvalid');
        if (!isValidSelection(statusValue)) newErrors.status = t('errors.selectStatus');
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
            quantity: stockValue,
            stock: stockValue,
            stock_min: stockMin,
            tags: formatValue,
            status: statusValue,
            company: entrepriseValue,
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
                    <MultiSelectInput
                        onSelect={setFormatValue}
                        options={formatOptions}
                        label={t('Format')}
                        selectedValues={formatValue}  // Assure que les tags sélectionnés s'affichent
                    />
                </div>

                <div>
                    <SelectInput onSelect={(value) => setStatusValue(Number(value))} options={statusOptions} label={t('Status')} defaultValue={statusValue} />
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>

                <div>
                    <SelectInput onSelect={(value) => setEntrepriseValue(Number(value))} options={companyOptions} label={t('Entreprise')} defaultValue={entrepriseValue} />
                    {errors.entreprise && <p className="text-red-500 text-sm mt-1">{errors.entreprise}</p>}
                </div>

                <button type="submit" className="bg-secondary h-[43px] w-[168px] text-sm font-semibold py-1.5 text-primary px-8 rounded-md mt-7 hover:bg-opacity-40 transition-all duration-300">
                    {t('Submit')}
                </button>
            </form>
        </>
    );
}
