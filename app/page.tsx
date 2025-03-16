import {useTranslations} from 'next-intl';
import {useAuth} from "@/components/context/AuthContext";


export default function HomePage() {
  const t = useTranslations('HomePage');
    const { user, login, logout } = useAuth();

  return (
      <>
        <h1>{t('title')}</h1>

      </>
  );
}