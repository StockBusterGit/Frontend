import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const supportedLocales = ['fr', 'en', 'de'];

export default getRequestConfig(async () => {
    const headerStore = await headers();
    const savedLocale = headerStore.get('cookie')?.match(/NEXT_LOCALE=([a-zA-Z-]+)/)?.[1];

    const activeLocale: string = supportedLocales.includes(savedLocale || '')
        ? savedLocale!
        : 'fr';

    try {
        const messages = (await import(`../../messages/${activeLocale}.json`)).default;
        return { locale: activeLocale, messages };
    } catch (error) {
        console.error(`Erreur chargement locale ${activeLocale}:`, error);
        return {
            locale: 'fr',
            messages: (await import(`../../messages/fr.json`)).default
        };
    }
});
