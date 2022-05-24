import { useUser } from '@auth0/nextjs-auth0'

const config = {
    userExtractor: useUser
}

module.exports = config