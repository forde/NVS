import { useState } from 'react'

import ui from '/front/ui'

import config from '/front.config'

export default function ImageInput ({ id: _id, alt='', title='', hotspot=null, crop=null, placeholder, onChange }) {

    const [ mediaBrowserVisible, setMediaBrowserVisible ] = useState(false)

    const { MediaBrowser, Actions } = ui()

    const src = _id ? config.imageUrl({
        _type: 'reference',
        _ref: _id,
        crop, hotspot
    }).auto('format').url() : placeholder

    const onUse = usedImage => {
        setMediaBrowserVisible(false)
        onChange(usedImage)
    }

    return (
        <div className="">
            <img
                className="ft-block"
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
                    onUse={onUse}
                />
            }
        </div>
    )
}