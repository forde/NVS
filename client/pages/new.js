import { useState, useCallback } from 'react'

import Layout from '/components/Layout'
import { PageContext } from '/context'
import Modules from '/front/presentation/Modules'

export default function New () {

    const [ pageContext, setPageContext ] = useState({
        page: {
            _type: 'page',
            title: '',
            slug: '',
            modules: [],
            seo: {
                title: '',
                description: '',
                keywords: []
            }
        },
        changePage: page => setPageContext(prevPageContext => ({
            ...prevPageContext,
            page: { ...prevPageContext.page, ...page },
            changed: true
        })),
        changed: false,
        refresh: () => null,
    })

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
                    onChange={onModulesChange}
                />
            </Layout>
        </PageContext.Provider>
    )
}