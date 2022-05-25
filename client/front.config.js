import { useUser } from '@auth0/nextjs-auth0'

const config = {
    userExtractor: useUser, // when called should return { user: {} } or { user: null }
}

module.exports = config