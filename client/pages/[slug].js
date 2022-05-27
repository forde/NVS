import { useState, useCallback, useEffect } from 'react'

import Layout from '/components/Layout'
import Modules from '/front/presentation/Modules'
import { PageContext } from '/context'

import moduleMap from '/components/modules/modules'

import config from '/front.config'

export default function Slug ({ page }) {

    const changePage = page => setPageContext(prevPageContext => ({
        ...prevPageContext,
        page: { ...prevPageContext.page, ...page },
        changed: true
    }))

    const [ pageContext, setPageContext ] = useState({
        page,
        changePage,
        changed: false,
        refresh: () => null,
    })

    useEffect(() => {
        setPageContext({
            page,
            changePage,
            changed: false,
            refresh: () => null,
        })
    }, [page])

    const onModulesChange = useCallback(modules => {
        setPageContext(prevPageContext => ({
            ...prevPageContext,
            page: { ...prevPageContext.page, modules },
            changed: true
        }))
    }, [])

    return (
        <PageContext.Provider value={pageContext}>
            <Layout>
                <Modules
                    modules={pageContext.page.modules || []}
                    moduleMap={moduleMap}
                    onChange={onModulesChange}
                />
            </Layout>
        </PageContext.Provider>
    )
}

export async function getStaticPaths() {

    const slugs = await config.api.page.get({ type: ['page'] })

    const paths = slugs.map(slug => ({
        params: { slug: slug.slug },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

    const page = (await config.api.page.get({ slug: params.slug }))[0]

    return { props: { page } }
}