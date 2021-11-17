import { memo } from 'react'

import editor from '~/editor'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '~/api'
const imageUrl = source => imageUrlBuilder(client).image(source)

export default memo(function Image ({ module, onChange }) {

    const { editMode, ImageInput } = editor()

    const { _key, ...image } = (module || {})

    console.log('Module', module)

    const src = image.asset ? imageUrl(image.asset).auto('format').url() : 'https://via.placeholder.com/1600x900'

    return(
        <div className="container has-actions mb-60">
            {editMode ?
            <>
                <ImageInput
                    image={image}
                    onChange={image => onChange(_key, { ...image })}
                    placeholder="https://via.placeholder.com/1600x900"
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