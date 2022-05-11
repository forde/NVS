import { Row, Col } from '/styles'
import ui from '/editor/ui'

export default function SeoSettings ({ page, onChange }) {

    const { Input, TagInput } = ui()

    return (
        <Row>
            <Col width={12}>
                <Input
                    placeholder="Title"
                    label="Title"
                    value={page.seo.title}
                    onChange={val => onChange({ seo: { ...page.seo, title: val } })}
                />
            </Col>
            <Col width={12}>
                <Input
                    placeholder="Description"
                    label="Description"
                    multiline
                    value={page.seo.description}
                    onChange={val => onChange({ seo: { ...page.seo, description: val } })}
                />
            </Col>
            <Col width={12}>
                <TagInput
                    placeholder="Add keyword"
                    label="Keywords"
                    value={(page.seo.keywords || [])}
                    onChange={val => onChange({ seo: { ...page.seo, keywords: val } })}
                />
            </Col>
        </Row>
    )
}