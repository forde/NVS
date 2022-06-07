import { memo } from 'react'

import ui from '/front/ui'

import config from '/front.config'

export default memo(function Image ({ module, onChange }) {

    const { editMode, ImageInput } = ui()

    const { _key, ...image } = (module || {})

    //console.log('Module', module)

    const src = image.asset ? config.imageUrl(image.asset).auto('format').url() : 'https://via.placeholder.com/1600x900'

    return(
        <div className="container ft-mb-60">
            {editMode ?
            <>
                <ImageInput
                    id={image?.asset?._ref}
                    title={image?.title}
                    alt={image?.alt}
                    crop={image?.crop}
                    hotspot={image?.hotspot}
                    onChange={data => {

                        if(!data) {
                            const { alt, title, hotspot, crop, ...rest } = image
                            return onChange(_key, { ...rest, asset: null })
                        }

                        const { _id, alt, title, hotspot, crop } = data
                        onChange(_key, {
                            ...image,
                            alt, title, hotspot, crop,
                            asset: { _type: 'reference', _ref: _id }
                        })

                    }}
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