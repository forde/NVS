import reactToast from 'react-hot-toast'

import { truncate } from '~/lib/helpers'

export function success(message, config={}) {

    if(!message) return null

    return reactToast.success(truncate(message, 500))
}

export function error(message, config={}) {

    if(!message) return null

    return reactToast.error(truncate(message, 500))
}