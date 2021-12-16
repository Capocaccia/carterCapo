/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import DateFormatter from '../components/date-formatter'
 describe('Date Formatter', () => {
    it('Ensures dates are formatted correctly', () => {
        render(<DateFormatter dateString={'2021-11-18T05:35:07.322Z'}/>)
        const date = screen.getByText('November 17, 2021')
        expect(date).toBeInTheDocument();
   })
 })