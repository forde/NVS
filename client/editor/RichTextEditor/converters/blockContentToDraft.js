const getBlockType = block => {

    if(block.listItem) {
        return block.listItem === 'bullet' ? 'unordered-list-item' : 'ordered-list-item'
    }

    return ({
        'normal': 'unstyled',
        'h1': 'header-one',
        'h2': 'header-two',
        'h3': 'header-three',
        'h4': 'header-four',
        'h5': 'header-five',
        'h6': 'header-six',
    })[block?.style]
}

const getInlineStyleRanges = block => (block?.children || []).reduce((acc, child) => {

    const textStart = acc.pos
    const textLength = child.text.length

    if(!child.marks.length) return { ...acc, pos: textStart + textLength }

    const marksMap = {
        'strong': 'BOLD',
        'em': 'ITALIC',
        'underline': 'UNDERLINE',
        'strike-through': 'STRIKETHROUGH',
    }

    return {
        pos: textStart + textLength,
        ranges: [
            ...acc.ranges,
            ...child.marks.map(mark => ({
                offset: textStart,
                length: textLength,
                style: marksMap[mark],
            })).filter(m => m.style)
        ]
    }
}, { pos: 0, ranges: []}).ranges

const getBlockText = block => block.children
    .map(child => child.text || '')
    .join('')



const entityFromMarkDef = (def, text) => {

    if(def._type === 'internalLink') {
        return {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
                title: text,
                url: `/${def?.document?.slug}`,
                target: def.blank ? '_blank' : '_self',
                type: def?.document?.type,
                id: def.reference._ref
            }
        }
    }

    if(def._type === 'link') {
        return {
            type: 'LINK',
            mutability: 'MUTABLE',
            data: {
                title: text,
                url: def.href,
                target: def.blank ? '_blank' : '_self',
            }
        }
    }

    return {}
}

const getEntities = blockContent => {

    let entityMap = []

    let blocks = (blockContent || []).map(block => {
        if(!block.markDefs.length) return []

        let pos = 0
        let blockEntityRanges = []

        block.children.forEach(child => {
            const textStart = pos
            const textLength = child.text.length

            child.marks.forEach(mark => {
                const markDef = block.markDefs.find(def => def._key === mark)
                if(markDef) {

                    blockEntityRanges.push({
                        offset: textStart,
                        length: textLength,
                        key: entityMap.length
                    })

                    const entity = entityFromMarkDef(markDef, child.text)

                    entityMap.push(entity)
                }
            })

            pos = textStart + textLength
        })

        return blockEntityRanges


    })

    return { entityMap, blocks }
}

export default function blockContentToDraft (blockContent) {

    const entities = getEntities(blockContent)

    const blocks = (blockContent || []).map((block, i) => {

        return {
            data: {},
            depth: 0,
            entityRanges: entities.blocks[i],
            inlineStyleRanges: getInlineStyleRanges(block),
            key: block._key,
            text: getBlockText(block),
            type: getBlockType(block),
        }
    })

    console.log('block to draft => ', blocks, entities.entityMap);

    return {
        blocks: blocks,
        entityMap: entities.entityMap
    }
}