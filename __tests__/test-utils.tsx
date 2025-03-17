import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';

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
            {ui}
        </NextIntlClientProvider>
    );
}