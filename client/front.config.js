import { useContext } from 'react'
import { useUser } from '@auth0/nextjs-auth0'

import { PageContext } from '/context'

const config = {
    useUser: useUser, // when called should return { user: {} } or { user: null }
    usePage: () => useContext(PageContext),
    pageUrl: page => {
        return {
            href: `/[slug]`,
            as: `/${page?.slug?.current || page?.slug}`
        }
    },
}

module.exports = config