import { useState } from 'react'

import ui from '/front/ui'
import SlugSettings from './SlugSettings'
import { Row, Col } from '/front/styles'
import { success, error } from '/front/lib/message'
import { goTo } from '/front/lib/helpers'

import config from '/front.config'

export default function GeneralSettings ({ page, onChange }) {

    const { Input, Select, ConfirmButton, Label } = ui()

    const [ deletingPage, setDeletingPage ] = useState(false)

    const deletePage = async () => {
        if(deletingPage) return

        setDeletingPage(true)

        const resp = await config.api.page.delete(page)
        setDeletingPage(false)

        if(resp?.error) return error(resp.error)

        success('Page deleted')
        goTo('/')
    }

    return (
        <Row>
            <Col width={8}>
                <Input
                    placeholder="Title"
                    label="Title"
                    medium
                    value={page.title}
                    onChange={val => onChange({ title: val })}
                />
                <SlugSettings
                    slug={page.slug}
                    title={page.title}
                    id={page._id}
                    onChange={val => onChange({ slug: val })}
                />
            </Col>
            <Col width={4}>
                <Select
                    label="Type"
                    value={page._type}
                    onChange={val => onChange({ _type: val })}
                    options={['page','post']}
                    style={{ minWidth:'100%'}}
                    small
                />
            </Col>
            <Col width={12} className="ft-pt-24">
                <ConfirmButton
                    children="Delete page"
                    buttonSpacing={'16px'}
                    medium
                    onConfirm={deletePage}
                    busy={deletingPage}
                />
            </Col>
        </Row>
    )
}