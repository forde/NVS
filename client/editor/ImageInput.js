import { useState } from 'react'

import editor from '~/editor'
import imageUrlBuilder from '@sanity/image-url'

import { client } from '~/api'

const imageUrl = source => imageUrlBuilder(client).image(source)

export default function ImageInput ({ image, placeholder, onChange }) {

    const [ mediaBrowserVisible, setMediaBrowserVisible ] = useState(false)

    const { MediaBrowser, Actions } = editor()

    const editImage = () => {
        setMediaBrowserVisible(true)
    }

    const removeImage = () => {
        const { crop, hotspot, title, alt, asset, ...rest } = image
        onChange({
            ...rest,
            asset: null
        })
    }

    const src = image?.asset ? imageUrl(image).auto('format').url() : placeholder

    const selectedImage = {
        _id: image?._id || image?.asset?._ref,
        crop: image?.crop,
        hotspot: image?.hotspot,
        title: image?.title || '',
        alt: image?.alt || ''
    }

    const onUse = usedImage => {
        console.log('Image out', usedImage);
        setMediaBrowserVisible(false)
        const { _id, crop, hotspot, title, alt } = usedImage
        const changedImage = {
            ...image,
            crop, hotspot, title, alt,
            asset: {
                _type: 'reference',
                _ref: _id,
            }
        }
        onChange(changedImage)
        console.log('Changed image', changedImage);
    }

    console.log('Image in', selectedImage);

    return (
        <div className="has-actions">
            <img
                className="block"
                src={src}
            />
            <Actions
                align="center"
                onEdit={editImage}
                onDelete={!selectedImage._id ? null : removeImage}
            />
            {mediaBrowserVisible &&
                <MediaBrowser
                    onClose={() => setMediaBrowserVisible(false)}
                    selectedImage={selectedImage._id ? selectedImage : null}
                    withSizeSettings
                    onUse={onUse}
                />
            }
        </div>
    )
}