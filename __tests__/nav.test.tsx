/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Nav from '../components/nav'
import * as nextRouter from 'next/router';

 describe('Posts', () => {

    beforeAll(() => {
        nextRouter.useRouter = jest.fn();
    })
    it('Home link does not appear when route is homepage', () => {
        nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));
        render(<Nav />)
        const allNavLinks = screen.getAllByRole('link')
        allNavLinks.forEach((link) => {
            expect(link.getAttribute('href') === '/').toBeFalsy()
        })
    })

    it('Home link appears when route is not homepage', () => {
        nextRouter.useRouter.mockImplementation(() => ({ route: '/uses' }));
        render(<Nav />)
        expect(screen.getByTestId('home-link')).toBeInTheDocument()

        const allNavLinks = screen.getAllByRole('link');
        expect(allNavLinks.length).toBeGreaterThan(1)
        allNavLinks.forEach((link) => {
            expect(link.getAttribute('href').length).toBeGreaterThan(0)
        })
    })
 })