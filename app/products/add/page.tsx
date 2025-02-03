import {useTranslations} from "next-intl";
import ProductAddComponents from "@/components/products/Add/ProductAddComponents";

export default function ProductsPage() {
    const t = useTranslations('Product');
    return (
        <div>
            <h1 className={'title'} >{t('Create products')}</h1>
            <div className={"flex"}>

                   <ProductAddComponents />

            </div>
        </div>
    );
}