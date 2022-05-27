import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import sanityClient from '@sanity/client'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    }
}

export default withApiAuthRequired(async function page(req, res) {

    const client = sanityClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: 'production',
        apiVersion: '2021-03-25',
        token: process.env.SANITY_TOKEN,
        useCdn: process.env.NODE_ENV === 'production'
    })

    const formatData = _data => {
        const data = {
            ..._data,
            slug: {
                _type: 'slug',
                current: _data.slug?.current || _data.slug
            }
        }
        return data
    }

    if(req.method === 'POST') {
        const resp = await client.createIfNotExists(formatData(req.body))
        res.status(200).json(resp)
    }

    if(req.method === 'DELETE') {
        const resp = await client.delete(req.body._id)
        res.status(200).json(resp)
    }

    if(req.method === 'PATCH') {
        const resp = await client.patch(req.body._id).set(formatData(req.body)).commit()
        res.status(200).json(resp)
    }

    res.end()
})