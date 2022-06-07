const sanityClient = require('@sanity/client')

const sanityClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank to be anonymous user
    useCdn: process.env.NODE_ENV === 'production'
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
}

export const client = sanityClient(sanityClientConfig)


/*
|--------------------------------------------------------------------------
|  PAGES
|--------------------------------------------------------------------------
*/
const pageFields = `
    _id,
    _type,
    title,
    "slug": slug.current,
    "publishedAt": meta.publishedAt,
    "categories": meta.categories[]->{
        "slug": slug.current,
        title
    },
    "mainImage": meta.mainImage{
        ...,
        "meta": asset->metadata{ dimensions, lqip },
    },
    "modules": modules[]{
        ...,
        _type == "content" => {
            ...,
            content[]{
                ...,
                markDefs[]{
                    ...,
                    _type == "internalLink" => {
                        "document": {
                            "slug": @.reference->slug.current,
                            "type": @.reference->_type
                        }
                    }
                }
            }
        }
    },
    "seo": seo{
        title,
        description,
        keywords
    }
`

export const getPage = ({ id, slug, title, type, from, to }) => {

    const rangeQuery = (from && to) ? `[${from}..${to}]` : ``

    const slugQuery = slug ? `[slug.current == "${slug}"]` : ``

    const types = (Array.isArray(type) ? type : [type]).map(t=>`"${t}"`).join(',')
    const typeQuery = type ? `[_type in [${types}]]` : ``

    const titleQuery = title ? `[[title] match ["*${title}*"]]` : ``

    const orderQuery = `| order(_createdAt desc)`

    const idQuery = id ? `[_id == "${id}"]` : ``

    return client.fetch(`*
        ${typeQuery}
        ${slugQuery}
        ${titleQuery}
        ${idQuery}
        ${rangeQuery}
        ${orderQuery}
        {
            ${pageFields}
        }
    `)
}

/*
|--------------------------------------------------------------------------
|  MEDIA
|--------------------------------------------------------------------------
*/
export const getImage = ({ id, search, from=0, to=12 }) => {

    const searchQuery = search ? `[[originalFilename] match ["*${search}*"]]` : ``

    const idQuery = id ?  `[_id == "${id}"]` : ``

    const query = `*[_type == 'sanity.imageAsset']
    ${searchQuery}
    ${idQuery}
    [${from}..${to}]
    | order(_createdAt desc) {
        _id,
        assetId,
        size,
        originalFilename,
        url,
        mimeType,
        metadata{
            dimensions,
            lqip
        }
    }`
    return client.fetch(query)
}