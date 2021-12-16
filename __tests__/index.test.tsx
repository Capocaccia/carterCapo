/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import {within} from '@testing-library/dom'
 import Index from '../pages/index'
 import { getAllPosts } from '../lib/api'
 import * as nextRouter from 'next/router';
 import { parseISO, format } from 'date-fns'

 describe('Home', () => {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ])

    beforeAll(() => {
        nextRouter.useRouter = jest.fn();
        nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));
    })

    it('Renders the page heading and navigation', () => {
        render(<Index allPosts={allPosts}/>)

        const {title,
        date,
        slug,
        author,
        excerpt } = allPosts[0]

        const restOfThePosts = allPosts.slice(1, allPosts.length);

        const formattedDate = format(parseISO(date), 'LLLL d, yyyy')
        
        //does the nav render and each nav item have an href
        within(screen.getByTestId('nav-container')).getAllByRole('link').forEach((link) => {
            expect(link.getAttribute('href')).toBeTruthy()
        })

        //does the page masthead render with correct content
        expect(screen.getByText('Husband. Father. Developer. QE Automation Manager @ Hilton.')).toBeInTheDocument()
        expect(screen.getByText('Carter Capocaccia.')).toBeInTheDocument()

        //does the hero post render with expected content
        const heroPostWrapper = within(screen.getByTestId('hero-post'))
        expect(heroPostWrapper.getByRole('heading', {level: 3}).textContent).toEqual(title);
        expect(heroPostWrapper.getByText(formattedDate)).toBeInTheDocument();
        expect(within(heroPostWrapper.getByRole('heading', {level: 3})).getByRole('link').getAttribute('href')).toEqual(`/posts/${slug}`);
        expect(heroPostWrapper.getByTestId('avatar-author').textContent).toEqual(author.name)
        expect(heroPostWrapper.getByTestId('avatar-image').getAttribute('src')).toEqual(author.picture)
        expect(heroPostWrapper.getByTestId('post-cover-image').getAttribute('src')).toBeTruthy();
        expect(heroPostWrapper.getByTestId('hero-post-excerpt').textContent).toEqual(excerpt);

        //more stories section
        expect(screen.getByText('More Stories')).toBeInTheDocument();
        const moreStoriesWrapper = within(screen.getByTestId('more-stories'))
        const postPreviews = moreStoriesWrapper.getAllByTestId('post-preview')
        
        postPreviews.forEach((post, idx) => {
            const currentPost = within(post)
            expect(currentPost.getByRole('heading', {level: 3}).textContent).toEqual(restOfThePosts[idx].title);
            expect(within(currentPost.getByRole('heading', {level: 3})).getByRole('link').getAttribute('href')).toEqual(`/posts/${restOfThePosts[idx].slug}`);
            expect(currentPost.getByTestId('avatar-author').textContent).toEqual(restOfThePosts[idx].author.name)
            expect(currentPost.getByTestId('avatar-image').getAttribute('src')).toEqual(restOfThePosts[idx].author.picture)
            expect(currentPost.getByTestId('post-cover-image').getAttribute('src')).toBeTruthy();
            expect(currentPost.getByTestId('post-excerpt').textContent).toEqual(restOfThePosts[idx].excerpt);
        })

        //footer
        const footerContainer = within(screen.getByTestId('footer'))
        footerContainer.getAllByRole('link').forEach((link) => {
            expect(link.getAttribute('href')).toBeTruthy()
        })

        expect(footerContainer.getByText('Contact me.')).toBeTruthy();
    })

 })