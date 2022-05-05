import { Row, Col } from '/styles'
import editor from '/editor'
import SlugSettings from './SlugSettings'

export default function GeneralSettings ({ page, onChange }) {

    const { Input } = editor()

    return (
        <Row>
            <Col width={12}>
                <Input
                    placeholder="Title"
                    label="Title"
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
            <Col width={12}>
                ...
            </Col>
        </Row>
    )
}