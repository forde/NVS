const sanityClient = require('@sanity/client')

const sanityClientConfig = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-03-25',
    token: '', // or leave blank to be anonymous user
    useCdn: process.env.NODE_ENV === 'production'
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
}

export const client = sanityClient(sanityClientConfig)

export const previewClient = sanityClient({
    ...sanityClientConfig,
    useCdn: false,
    token: process.env.SANITY_TOKEN,
    withCredentials: true
})

export const getSettings = async () => {
    return client.fetch(`
    *[_type == "settings"][0]{
        "menu": menu[]{
            title,
            "page": {
                "title": page->title,
                "slug": page->slug.current
            },
            "children": children[] {
                title,
                "page": {
                    "title": page->title,
                    "slug": page->slug.current
                }
            }
        },
        "seo": seo{
            title,
            description,
            keywords
        }
    }`)
}

export const getPosts = async () => {
    const query = `*[_type == "post"]
    | order(_createdAt asc)
    {
        title,
        _type,
        "publishedAt": meta.publishedAt,
        "categories": meta.categories[]->{
            "slug": slug.current,
            title
        },
        "mainImage": meta.mainImage
    }`

    return client.fetch(query)
}

export const getBySlug = slug => {
    const query = `*[slug.current == "${slug}"][0]{
        _id,
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
        "sections": sections[]{
            ...,
            _type == 'image' => {
                ...,
                "meta": asset->metadata{ dimensions, lqip },
            },
            content[]{
                ...,
                markDefs[]{
                    ...,
                    _type == "internalLink" => {
                        "slug": @.reference->slug.current,
                        "type": @.reference->_type
                    }
                }
            }

        },
        "seo": seo{
            title,
            description,
            keywords
        }
    }`
    return client.fetch(query)
}

export const getSlugsForTypes = types => {
    const query = `*[_type in [${types.map(t => `"${t}"`).join(',')}]]{
        "slug": slug.current
    }`
    return client.fetch(query)
}