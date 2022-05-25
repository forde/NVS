import { Row, Col } from '/front/styles'
import ui from '/front/ui'

export default function SeoSettings ({ page, onChange }) {

    const { Input, TagInput } = ui()

    return (
        <Row>
            <Col width={12} className="mb-24">
                <Input
                    placeholder="Title"
                    label="Title"
                    medium
                    value={page.seo.title}
                    onChange={val => onChange({ seo: { ...page.seo, title: val } })}
                />
            </Col>
            <Col width={12} className="mb-24">
                <Input
                    placeholder="Description"
                    label="Description"
                    multiline
                    medium
                    value={page.seo.description}
                    onChange={val => onChange({ seo: { ...page.seo, description: val } })}
                />
            </Col>
            <Col width={12} className="mb-24">
                <TagInput
                    placeholder="Add keyword"
                    label="Keywords"
                    small
                    value={(page.seo.keywords || [])}
                    onChange={val => onChange({ seo: { ...page.seo, keywords: val } })}
                />
            </Col>
        </Row>
    )
}