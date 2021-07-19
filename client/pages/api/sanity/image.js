import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import formidable from 'formidable'
import sanityClient from '@sanity/client'
import { createReadStream } from 'fs'

export const config = {
    api: {
        bodyParser: false,
    }
}

export default withApiAuthRequired(async function image(req, res) {

    const client = sanityClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: 'production',
        apiVersion: '2021-03-25',
        token: process.env.SANITY_TOKEN,
        useCdn: process.env.NODE_ENV === 'production'
    })

    const formData = req => {
        return new Promise((resolve, reject) => {
            const form = new formidable()
            form.parse(req, (err, fields, files) => err ? reject({ err }) : resolve({ err, fields, files }))
        })
    }

    const { fields, files } = await formData(req)

    if(req.method === 'PUT') {
        const resp = await client.assets.upload('image', createReadStream(files.file.path), { filename: fields.filename })
        res.status(200).json(resp)
    }

    if(req.method === 'DELETE') {
        const resp = await client.delete(fields.id)
        res.status(200).json(resp)
    }

    if(req.method === 'PATCH') {
        const { id, ...rest } = fields
        const resp = await client.patch(id).set(rest).commit()
        res.status(200).json(resp)
    }

    res.end()
})