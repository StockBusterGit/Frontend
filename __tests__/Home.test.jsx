import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
    it('should render', () => {
        render(<Home />)
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
})