import {useTranslations} from "next-intl";

import Products from "@/components/products/Products";
import ProtectedRoute from "@/components/auth/ProtectedRoute";


export default function ProductsPage() {
    const t = useTranslations('Product');


  return (
      <ProtectedRoute>
        <div>
            <h1 className={'title'}>{t('title')}</h1>
            <Products />
        </div>
      </ProtectedRoute>
  );
}