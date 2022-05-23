import { memo } from 'react'

import ui from '/front/ui'

export default memo(function Heading ({ module, onChange }) {

    const {
        editMode,
        Editable,
    } = ui()

    const { _key, content, tag: Tag='h1' } = module

    const sizes = {
        h1: 'large',
        h2: 'medium',
        h3: 'small'
    }

    //console.log('Module', module)

    return(
        <div className="container mb-60">
            {editMode ? <Editable
                value={content || ''}
                onChange={val => onChange(_key, { content: val })}
                placeholder="Heading"
                className={`h-${sizes[Tag]}`}
            /> : <Tag>{content || ''}</Tag>}
        </div>
    )
})

export const Settings = ({ module, onChange }) => {

    const {
        Select,
    } = ui()

    const { tag, _key } = module

    return (
        <div>
            <Select
                value={tag || 'h1'}
                onChange={val => onChange(_key, { tag: val })}
                options={['h1','h2','h3']}
            />
        </div>
    )
}