import {useTranslations} from "next-intl";

import Products from "@/components/products/Products";


export default function ProductsPage() {
    const t = useTranslations('Product');


  return (
    <div>
        <h1 className={'font-sans font-semibold text-2xl'}>{t('title')}</h1>
        <Products />
    </div>
  );
}