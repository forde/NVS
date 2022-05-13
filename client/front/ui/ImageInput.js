import { useState } from 'react'

import ui from '/front/ui'
import imageUrlBuilder from '@sanity/image-url'

import { client } from '/api'

const imageUrl = source => imageUrlBuilder(client).image(source)

export default function ImageInput ({ id: _id, alt='', title='', hotspot=null, crop=null, placeholder, onChange }) {

    const [ mediaBrowserVisible, setMediaBrowserVisible ] = useState(false)

    const { MediaBrowser, Actions } = ui()

    const src = _id ? imageUrl({
        _type: 'reference',
        _ref: _id,
        crop, hotspot
    }).auto('format').url() : placeholder

    const onUse = usedImage => {
        setMediaBrowserVisible(false)
        onChange(usedImage)
    }

    return (
        <div className="has-actions">
            <img
                className="block"
                src={src}
            />
            <Actions
                align="center"
                onEdit={() => setMediaBrowserVisible(true)}
                onDelete={!_id ? null : () => onChange(null)}
            />
            {mediaBrowserVisible &&
                <MediaBrowser
                    onClose={() => setMediaBrowserVisible(false)}
                    selectedImage={!_id ? null : { _id, alt, title, hotspot, crop }}
                    withSizeSettings
                    onUse={onUse}
                />
            }
        </div>
    )
}