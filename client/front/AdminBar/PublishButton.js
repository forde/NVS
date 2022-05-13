import { useState } from 'react'
import { nanoid } from 'nanoid'
import { MdSave } from 'react-icons/md'

import { PageContext } from '/context'
import ui from '/front/ui'
import { success, error } from '/front/lib/message'

import { publishButton } from '/front/styles/AdminBar/PublishButton.module.scss'

export default function PublishButton  () {

    const [ publishing, setPublishing ] = useState(false)

    const { Bars } = ui()

    const publish = async page => {

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
            data.title = key
            data.slug.current = key
            method = 'POST'
        }


        fetch('/api/sanity/page', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('data',data);
                setPublishing(false)
                success('Page published')
            })
    }

    return (
        <PageContext.Consumer>
            {({ page, changed }) => !changed ? null : <div
                className={publishButton}
                onClick={() => publish(page)}
            >
                {publishing && <Bars /> }
                <MdSave className="icon"/>
                Publish
            </div>}
        </PageContext.Consumer>
    )
}