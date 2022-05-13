import { curry } from 'ramda'

import id from '/editor/lib/id'

const draftTypeToBlockStyle = type => {
    const types = {
        'unstyled': 'normal',
        'paragraph': 'normal',
        'header-one': 'h1',
        'header-two': 'h2',
        'header-three': 'h3',
        'header-four': 'h4',
        'header-five': 'h5',
        'header-six': 'h6',
        'unordered-list-item': 'normal',
        'ordered-list-item': 'normal',
        'blockquote': 'blockquote',
        'code-block': '',
        'atomic': '',
    }
    return types[type]
}

const marksMap = {
    'BOLD': 'strong',
    'ITALIC': 'em',
    'UNDERLINE': 'underline',
    'STRIKETHROUGH': 'strike-through',
}

const markTypes = [
    'strong',
    'em',
    'underline',
    'strike-through'
]

const isSameArray = (a,b) => a && b && JSON.stringify(a) === JSON.stringify(b)

const isEmptyArray = array => Array.isArray(array) && array.length === 0

const isInt = x => Number.isInteger(x)

const removeObjectKeys = curry((keysToRemove, object) => {
    return Object.keys(object)
        .filter(key => !keysToRemove.includes(key))
        .reduce((acc, key) => ({...acc, [key]: object[key] }), {})
})

const newBlockChild = ({ start, end, marks=[], text='' }) => ({
    _key: id(),
    _type: 'span',
    text: text.substring(start, end),
    marks: marks,
    _temp: {
        position: { start, end }
    }
})

const childrenFromRangesReducer = curry((text, acc, range) => {

    const position = { start: range.offset, end: range.offset+range.length }
    const rangeMark = marksMap[range.style] || range.key
    const existingChild = acc.find(r => isSameArray(r._temp.position, position))
    const marks = [...(existingChild?.marks || []), rangeMark]

    return [...acc, newBlockChild({ ...position, marks, text })].filter(r => r._key !== existingChild?._key)
})

const childrenWithoutRangesreducer = curry((text, acc, child, i, initial) => {

    const { start, end } = child._temp.position
    // maybe add before (at the begining)
    if(!i) acc = !start ? [] : [newBlockChild({ start:0, end:start, text })]
    // maybe add after (in the middle)
    const nextStart = initial[i+1]?._temp?.position?.start
    if(nextStart && nextStart > end) return [...acc, child, newBlockChild({ start:end, end:nextStart, text })]
    // maybe add after (at the end)
    if(!nextStart && end < text.length) return [...acc, child, newBlockChild({ start: end, end: text.length, text })]

    return [...acc, child]
})

const addMarkDefKeys = curry((markDefs, child) => {
    return { ...child, marks: child.marks.map(m => isInt(m) ? markDefs[m]?._key : m )}
})

const blockChildren = ({ ranges, text, markDefs }) => {

    if(isEmptyArray(ranges)) return [newBlockChild({ start: 0, end: text.length, text })]

    return ranges
        .reduce(childrenFromRangesReducer(text), [])
        .reduce(childrenWithoutRangesreducer(text), [])
        .map(addMarkDefKeys(markDefs))
}

const markDefFromEntity = entity => {

    const _key = id()

    const _type = (entity => {
        if(entity?.type === 'LINK' && entity?.data?.id) return 'internalLink'
        if(entity?.type === 'LINK') return 'link'
    })(entity)

    const rest = ((type, entity) => {
        switch(type) {
            case 'link' : return {
                href: entity?.data?.url,
                blank: entity?.data?.target === '_blank'
            }
            case 'internalLink' : return {
                reference: { _ref: entity?.data?.id, _type: 'reference' },
                blank: entity?.data?.target === '_blank'
            }
            default : return {}
        }
    })(_type, entity)

    return { _key, _type, ...rest }
}

const collectChildrenMarkKeys = (acc,ch) => ([...acc, ...ch.marks.filter(m => !markTypes.includes(m))])

export default function draftToBlockContent (rawDraftContent) {

    const { blocks, entityMap } = rawDraftContent

    return blocks.map(block => {

        const { inlineStyleRanges, entityRanges, text } = block

        const ranges = [...inlineStyleRanges, ...entityRanges]

        const markDefs = Object.keys(entityMap)
            .map(key => entityMap[key])
            .map(markDefFromEntity)

        const children =  blockChildren({ ranges, text, markDefs })

        const usedByChildren = def => children
            .reduce(collectChildrenMarkKeys, [])
            .includes(def._key)

        let listItemDetails = {}
        if(block.type === 'unordered-list-item') listItemDetails = { level: 1, listItem: 'bullet' }
        if(block.type === 'ordered-list-item') listItemDetails = { level: 1, listItem: 'number' }

        return {
            _type: 'block',
            _key: block.key.length < 12 ? id() : block.key,
            style: draftTypeToBlockStyle(block.type),
            children: children.map(removeObjectKeys('_temp')),
            markDefs: markDefs.filter(usedByChildren),
            ...listItemDetails,
        }
    })
}