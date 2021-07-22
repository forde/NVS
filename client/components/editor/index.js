import dynamic from 'next/dynamic'
import { useUser } from '@auth0/nextjs-auth0'

export default function importer () {

    const { user } = useUser()

    if(!user) return {
        editMode: false
    }

    return {
        editMode: true,
        Input: dynamic(() => import('./Input'), { ssr: false })
    }
}