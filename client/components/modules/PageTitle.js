import { memo } from 'react'

import editor from '~/editor'

export default memo(function PageTitle ({ module, onChange, Actions }) {

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
                placeholder="Page title"
                className="h-large"
            /> : <h1>{content || ''}</h1>}
            <Actions />
        </div>
    )
})