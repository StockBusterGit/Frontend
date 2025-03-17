import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import Home from '@/app/page';
import { renderWithIntl } from './test-utils';
import { describe, it } from 'node:test';

describe('Home Component', () => {
    it('renders the Home page correctly', () => {
        renderWithIntl(<Home />);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });
});