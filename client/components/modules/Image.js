import { memo } from 'react'

import editor from '~/editor'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '~/api'
const imageUrl = source => imageUrlBuilder(client).image(source)

export default memo(function Image ({ module, onChange }) {

    const { editMode } = editor()

    const { asset } = (module || {})

    console.log('Module', module)

    const src = asset ? imageUrl(asset).auto('format').url() : 'https://via.placeholder.com/1600x900'

    return(
        <div className="container has-actions mb-60">
            {editMode ?
            <>
                <img
                    className="block clickable"
                    src={src}
                />
            </> :
            <>
                <img
                    className="block"
                    src={src}
                />
            </>}
        </div>
    )
})