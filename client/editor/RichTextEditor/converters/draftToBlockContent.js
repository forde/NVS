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