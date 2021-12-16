/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { getAllPosts } from '../lib/api'
import { parseISO, format } from 'date-fns'
import DateFormatter from '../components/date-formatter'

 describe('Posts', () => {
    it('All posts contain a correctly formatted date time stamp', () => {
        const allPosts = getAllPosts([
            'date'
        ])

        allPosts.forEach(({date}) => {
            const parsedDate = parseISO(date)
            render(<DateFormatter dateString={date}/>)
            const text = screen.getAllByText(format(parsedDate, 'LLLL d, yyyy'))
            expect(text.length).toBeGreaterThan(0)
        })
   })
 })