import { useContext } from 'react'
import { useUser } from '@auth0/nextjs-auth0'

import { PageContext } from '/context'
import { getPage } from '/api'

import imageUrlBuilder from '@sanity/image-url'
import { client } from '/api'

const config = {
    useUser: useUser, // when called should return { user: {} } or { user: null }
    usePage: () => useContext(PageContext),
    pageUrl: page => {
        return {
            href: `/[slug]`,
            as: `/${page?.slug?.current || page?.slug}`
        }
    },
    imageUrl: source => imageUrlBuilder(client).image(source),
    ui: {
        ColorPicker: {
            options: ['#182B3E', '#EE402F', '#558CF0', '#F1A42F', '#EE6B20']
        }
    },
    api: {
        page: {
            get: async ({ id, slug, title, query, type, from, to }) => {
                // return array of pages
                return getPage({ id, slug, title, query, type, from, to })
            },
            post: async page => {
                const resp = await fetch('/api/sanity/page', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(page)
                }).then(resp => resp.json())

                // return error object on error
                //return { error: 'POST error' }

                // return page object on success
                return resp
            },
            patch: async page => {
                const resp = await fetch('/api/sanity/page', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(page)
                }).then(resp => resp.json())

                // return error object on error
                //return { error: 'PATCH error' }

                // return page object on success
                return resp
            },
            delete: async page => {
                const resp = await fetch('/api/sanity/page', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(page)
                }).then(response => response.json())

                if(resp?.results?.find(res => res.id === page._id)) {
                    // return whatever on success
                    return null
                } else {
                    // return error object on error
                    return { error: 'DELETE error' }
                }
            }
        },
        media: {
            get: async ({ id }) => null,
            put: async ({ file, data }) => null,
            patch: async ({ id, data }) => null,
            delete: async ({ id }) => null
        }
    }
}

module.exports = config