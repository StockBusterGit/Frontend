import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';
import { AuthProvider } from '../components/context/AuthContext'; // Importez le AuthProvider

const messages = {
    Components: {
        Search: 'Search'
    },
    HomePage: {
        title: 'Home'
    }
};

export function renderWithIntl(ui: ReactNode) {
    return render(
        <NextIntlClientProvider locale="en" messages={messages}>
            <AuthProvider> {/* Ajoutez le AuthProvider */}
                {ui}
            </AuthProvider>
        </NextIntlClientProvider>
    );
}