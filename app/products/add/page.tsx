import {useTranslations} from "next-intl";

export default function ProductsPage() {
    const t = useTranslations('Product');
    return (
        <div>
            <h1>{t('Create products')}</h1>
        </div>
    );
}