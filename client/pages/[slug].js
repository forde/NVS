import { useEffect, useState } from 'react'

import { getSlugsForTypes, getBySlug, getPosts } from '~/api'
import Layout from '~/components/Layout'
import Modules from '~/components/modules'

export default function Slug ({ page }) {
    return (
        <Layout>
            <Modules
                page={page}
                data={[
                    {
                        _key: 'a01c686af67a',
                        _type: 'pageTitle',
                        content: '',
                    },
                ]}
            />
            <div className="container">
                <pre>{JSON.stringify(page, null, 4)}</pre>
            </div>
        </Layout>
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

    const page = await getBySlug(params.slug)
    //console.log('API', page);

    // attach blog posts to "blogPosts" section if it't there
    const sectionsRequireBlogPosts = (page.sections || []).reduce((acc, s) => s._type === 'blogPosts' ? true : acc, false)
    if(sectionsRequireBlogPosts) {
        const posts = await getPosts()
        page.sections = page.sections.map(s => s._type === 'blogPosts' ? {...s, posts} : s)
    }

    return { props: { page } }
}