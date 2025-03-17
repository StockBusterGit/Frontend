import React, { useEffect, useState } from 'react';
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation';

interface SettingsPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ isOpen, onClose }) => {
    const t = useTranslations('SideMenu');
    const [isClient, setIsClient] = useState(false);
    const [selectedLocale, setSelectedLocale] = useState('fr');
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const router = useRouter();

    const changeTheme = (theme: 'light' | 'dark' | 'system') => {
        setTheme(theme);
        document.cookie = `theme=${theme}; path=/; max-age=31536000`;

        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    useEffect(() => {
        setIsClient(true);

        const savedLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1];

        const savedTheme = document.cookie
            .split('; ')
            .find(row => row.startsWith('theme='))
            ?.split('=')[1] as 'light' | 'dark' | 'system';

        if (savedLocale) {
            setSelectedLocale(savedLocale);
        }

        if (savedTheme) {
            setTheme(savedTheme);
            changeTheme(savedTheme);
        } else {

            changeTheme('system');
        }
    }, []);

    const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value;

        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

        setSelectedLocale(newLocale);

        router.refresh();
    };

    if (!isOpen || !isClient) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{t('Settings')}</h2>
                <label className="block mb-2 text-gray-900 dark:text-white">{t('Language')}</label>
                <select
                    value={selectedLocale}
                    onChange={handleChangeLanguage}
                    className="w-full p-2 border rounded mb-4 bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                    <option value="fr">🇫🇷 Français</option>
                    <option value="en">🇬🇧 English</option>
                </select>


                <label className="block mb-2 text-gray-900 dark:text-white">{t('Theme')}</label>
                <select
                    value={theme}
                    onChange={(e) => changeTheme(e.target.value as 'light' | 'dark' | 'system')}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                >
                    <option value="light">{t('Light')}</option>
                    <option value="dark">{t('Dark')}</option>
                    <option value="system">{t('System')}</option>
                </select>

                <button
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark"
                    onClick={onClose}
                >
                    {t('Close')}
                </button>
            </div>
        </div>

    );
};

export default SettingsPopup;
