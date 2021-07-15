import React from 'react'

export default {
    title: 'Slider',
    name: 'slider',
    type: 'object',
    fields: [
        {
            title: 'Slides',
            name: 'slides',
            type: 'array',
            of: [{
                name: 'slide',
                title: 'Slide',
                type: 'object',
                fields: [
                    {
                        name: 'image',
                        title: 'Image',
                        type: 'image',
                        options: {
                            hotspot: true
                        },
                        fields: [
                            {
                                title: 'Title',
                                name: 'title',
                                type: 'string'
                            },
                            {
                                title: 'Alternative Text',
                                name: 'alt',
                                type: 'string'
                            }
                        ]
                    }
                ],
                preview: {
                    select: {
                        title: 'image',
                    },
                    prepare(selection) {
                        const {title} = selection
                        return {
                            title: title.title || 'Image',
                            media: <Images asset={title.asset} />
                        }
                    }
                }
            }]
        }
    ],
    preview: {
        select: {
            slides: 'slides',
        },
        prepare(selection) {
            const {slides} = selection
            return {
                title: `Slider (${slides.length} images)`,
                media: <Images slides={slides} />
            }
        }
    }
}

const Images = ({ slides, asset }) => {
    const id = 'g328ey6g'
    const dataset = 'production'
    let k = 0
    const renderImage = (asset, i) => {
        if(!asset) return null
        const ref = asset._ref.split('image-')[1].replace('-jpg','.jpg').replace('-jpeg','.jpeg').replace('-png','.png')
        const left = k*10
        const src = `https://cdn.sanity.io/images/${id}/${dataset}/${ref}?w=80&h=80&fit=crop&q=85`
        const styles = {position:'absolute', left: left+'px', top: 0, boxShadow: '-4px 0px 8px #333'}
        if(!ref || k > 2) return null
        k++
        return <img key={k} style={styles} src={src} />
    }
    return(
        <div>
            {slides && slides.filter(s => s.image).map((s,i) => renderImage(s.image.asset, i))}
            {asset && renderImage(asset, 0)}
        </div>
    )
}