import {useTranslations} from "next-intl";

export default function AuthPage() {
    const t = useTranslations('Auth');
    return (
        <div>
            <h1 className={'title'}>{t('Auth')}</h1>
        </div>
    );
}