import { memo } from 'react'

import editor from '~/editor'

import imageUrlBuilder from '@sanity/image-url'
import { client } from '~/api'
const imageUrl = source => imageUrlBuilder(client).image(source)

export default memo(function Image ({ module, onChange, onMove, onRemove }) {

    const {
        editMode,
        Editable,
        Actions,
    } = editor()

    const { _key, asset } = (module || {})

    console.log('Module', module)

    return(
        <div className="container has-actions mb-60">
            {editMode ?
            <>
                <img
                    className="block clickable"
                    src={imageUrl(asset).auto('format').url()}
                />
            </> :
            <>
                <img
                    className="block clickable"
                    src={imageUrl(asset).auto('format').url()}
                />
            </>}
            <Actions
                onMoveUp={() => onMove(_key, -1)}
                onMoveDown={() => onMove(_key, 1)}
                onDelete={() => onRemove(_key)}
            />
        </div>
    )
})