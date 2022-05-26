import { useState } from 'react'
import { nanoid } from 'nanoid'

import ui from '/front/ui'
import { success, error } from '/front/lib/message'
import { goTo } from '/front/lib/helpers'

import { publishButton } from '/front/styles/AdminBar/PublishButton.module.scss'

import config from '/front.config'

export default function PublishButton  () {

    const [ publishing, setPublishing ] = useState(false)

    const { page, changed } = config.usePage()

    const { Bars } = ui()

    const publish = async () => {

        if(!page.title) return error('Page title is required')

        if(publishing) return

        setPublishing(true)

        let method = 'PATCH'
        let data = {}

        data = {
            _id: page._id,
            _type: 'page',
            title: page.title,
            slug: {
                _type: 'slug',
                current: page.slug
            },
            modules: page.modules,
            seo: {
                _type: 'seo',
                ...page.seo
            }
        }

        if(!page._id) {
            const key = nanoid(36)
            data._id = key
            method = 'POST'
        }

        fetch('/api/sanity/page', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                setPublishing(false)
                success('Page published')

                if(method === 'POST') {
                    const { href, as } = config.pageUrl(data)
                    goTo(href, as)
                }
            })
    }

    return !changed ? null :
        <div
            className={publishButton}
            onClick={publish}
        >
            {publishing && <Bars /> }
            Publish
        </div>
}