import {useTranslations} from 'next-intl';
import ProtectedRoute from "@/components/auth/ProtectedRoute";


export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
      <>
          <ProtectedRoute>
            <h1>{t('title')}</h1>
          </ProtectedRoute>
      </>
  );
}