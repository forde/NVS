import { useEffect, useState } from 'react'

import { getSlugsForTypes, getBySlug, getPosts } from '~/api'

export default function Slug ({ post }) {

    console.log('[slug].js',post);

    const [data, setData] = useState(post)

    useEffect(() => {
        setData(post)
    }, [post])

    return (
        <div>
            See console for page data
        </div>
    )
}

export async function getStaticPaths() {
    const slugs = await getSlugsForTypes(['post','page'])

    const paths = slugs.map(slug => ({
        params: { slug: slug.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

    const post = await getBySlug(params.slug)
    console.log('API', post);

    // attach blog posts to "blogPosts" section if it't there
    const sectionsRequireBlogPosts = (post.sections || []).reduce((acc, s) => s._type === 'blogPosts' ? true : acc, false)
    if(sectionsRequireBlogPosts) {
        const posts = await getPosts()
        post.sections = post.sections.map(s => s._type === 'blogPosts' ? {...s, posts} : s)
    }

    return { props: { post } }
}