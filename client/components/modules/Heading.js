import { memo } from 'react'

import editor from '~/editor'

export default memo(function Heading ({ module, onChange }) {

    const {
        editMode,
        Editable,
    } = editor()

    const { _key, content } = (module || {})

    console.log('Module', module)

    return(
        <div className="container has-actions mb-60">
            {editMode ? <Editable
                value={content || ''}
                onChange={val => onChange(_key, { content: val })}
                placeholder="Heading"
                className="h-large"
            /> : <h1>{content || ''}</h1>}
        </div>
    )
})

export const Settings = ({ module, onChange }) => {

    const {
        editMode,
        Editable,
    } = editor()

    return (
        <div>Some settings here</div>
    )
}