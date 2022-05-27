import { useState } from 'react'
import { useRouter } from 'next/router'

import ui from '/front/ui'
import { success, error } from '/front/lib/message'
import { goTo } from '/front/lib/helpers'
import id from '/front/lib/id'

import { publishButton } from '/front/styles/AdminBar/PublishButton.module.scss'

import config from '/front.config'

export default function PublishButton  () {

    const [ publishing, setPublishing ] = useState(false)

    const router = useRouter()

    const { page, changed } = config.usePage()

    const { Bars } = ui()

    const publish = async () => {

        if(!page.title) return error('Page title is required')

        if(publishing) return

        setPublishing(true)

        // update page
        if(page._id) {
            const resp = await config.api.page.patch(page)
            setPublishing(false)

            if(resp?.error) return error(resp.error)

            success('Page updated')

            const { href, as } = config.pageUrl(resp)
            if(router.asPath !== as) goTo(href, as)
        }

        // create new page
        if(!page._id) {
            const resp = await config.api.page.post({
                ...page,
                _id: id(36)
            })
            setPublishing(false)

            if(resp?.error) return error(resp.error)

            success('Page created')

            const { href, as } = config.pageUrl(resp)
            goTo(href, as)
        }
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