import { Row, Col } from '/styles'
import ui from '/front/ui'
import SlugSettings from './SlugSettings'

export default function GeneralSettings ({ page, onChange }) {

    const { Input, Select } = ui()

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
            <Col width={12}>
                ...
            </Col>
        </Row>
    )
}