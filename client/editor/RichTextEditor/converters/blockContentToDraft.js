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
        'unordered-list-item': 'bullet',
        'ordered-list-item': '',
        'blockquote': '',
        'code-block': '',
        'atomic': '',
    }
    return types[type]
}

const blockStylesToDraftType = style => {
    const styles = {
        'normal': 'unstyled',
        'h1': 'header-one',
        'h2': 'header-two',
        'h3': 'header-three',
        'h4': 'header-four',
        'h5': 'header-five',
        'h6': 'header-six',
        'bullet': 'unordered-list-item',
    }
    return styles[style]
}

export default function blockContentToDraft (blockContent) {

    const blocks = (blockContent || []).map(block => {
        return {
            data: {},
            depth: 0,
            entityRanges: [],
            inlineStyleRanges: [],
            key: block._key,
            text: block.children.map(child => child.text || '').join(''),
            type: blockStylesToDraftType(block.style),
        }
    })

    console.log('block to draft => ', blocks);

    return {
        blocks: blocks,
        entityMap: {}
    }
}