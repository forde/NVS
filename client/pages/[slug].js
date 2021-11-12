import { useState, useCallback } from 'react'

import { getSlugsForTypes, getBySlug, getPosts } from '~/api'
import Layout from '~/components/Layout'
import Modules from '~/components/modules'
import { PageContext } from '~/context'

export default function Slug ({ page }) {

    const [ pageContext, setPageContext ] = useState({
        page,
        deletePage: () => null,
        changePage: page => setPageContext({ ...pageContext, page }),
        savePage: () => null,
        refresh: () => null,
    })

    const onModulesChange = useCallback(modules => {
        setPageContext(prevPageContext => ({
            ...prevPageContext,
            page: { ...page, modules }
        }))
    }, [])

    return (
        <PageContext.Provider value={pageContext}>
            <Layout>
                <Modules
                    modules={pageContext.page.modules || []}
                    onChange={onModulesChange}
                />
            </Layout>
        </PageContext.Provider>
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