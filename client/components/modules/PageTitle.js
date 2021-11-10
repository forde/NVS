import { memo } from 'react'

import editor from '~/editor'

export default memo(function PageTitle ({ module, onChange, onMove, onRemove }) {

    const {
        editMode,
        Editable,
        Actions,
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
            <Actions
                onMoveUp={() => onMove(_key, -1)}
                onMoveDown={() => onMove(_key, 1)}
                onDelete={() => onRemove(_key)}
            />
        </div>
    )
})