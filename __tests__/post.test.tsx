/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen, within } from '@testing-library/react'
 import { getAllPosts } from '../lib/api'
 import Post from '../pages/posts/[slug]'
 import * as nextRouter from 'next/router';

  describe('Posts', () => {
    const aPost = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
        'ogImage',
        'content'
    ])[0]

    it('Individual post page renders correctly', () => {
        nextRouter.useRouter = jest.fn();
        nextRouter.useRouter.mockImplementation(() => ({ route: '/posts/uses', isFallback: false }));
        
        render(<Post post={aPost} preview={false}/>)
        expect(screen.getByTestId('home-link')).toBeInTheDocument()

        expect(screen.getByRole('heading', {level: 1}).textContent).toEqual(aPost.title);
        screen.getAllByTestId('avatar-author').forEach((author: any) => {
            expect(author.textContent).toEqual(aPost.author.name)
        })
        screen.getAllByTestId('avatar-image').forEach((image) => {
            expect(image.getAttribute('src')).toBeTruthy();
        })
        expect(screen.getByTestId('post-cover-image').getAttribute('src')).toBeTruthy();
        expect(screen.getByTestId('post-body').innerHTML.length).toBeGreaterThan(0)
    })
  })