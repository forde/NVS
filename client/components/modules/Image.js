import { memo } from 'react'

import editor from '~/editor'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '~/api'
const imageUrl = source => imageUrlBuilder(client).image(source)

export default memo(function Image ({ module, onChange, Actions }) {

    const { editMode } = editor()

    const { asset } = (module || {})

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
                    className="block"
                    src={imageUrl(asset).auto('format').url()}
                />
            </>}
            <Actions
                onEdit={() => null}
            />
        </div>
    )
})