import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import formidable from 'formidable'
import sanityClient from '@sanity/client'

const fs = require('fs')

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
        // useCdn == true gives fast, cheap responses using a globally distributed cache.
        // Set this to false if your application require the freshest possible
        // data always (potentially slightly slower and a bit more expensive).
    })

    const formData = req => {
        return new Promise((resolve, reject) => {
            const form = new formidable()
            form.parse(req, (err, fields, files) => err ? reject({ err }) : resolve({ err, fields, files }))
        })
    }

    if(req.method === 'PUT') {
        const { fields, files } = await formData(req)
        const fileBuffer = fs.readFileSync(files.file.path)
        const resp = await client.assets.upload('image', fileBuffer, { filename: fields.filename })
        res.status(200).json(resp)
    }

    if(req.method === 'DELETE') {
        const { fields } = await formData(req)
        const resp = await client.delete(fields.id)
        res.status(200).json(resp)
    }

    res.end()
})