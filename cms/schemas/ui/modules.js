export default {
    title: 'Modules',
    name: 'modules',
    type: 'array',
    of: [
        {
            type: 'object',
            name: 'heading',
            title: 'Heading',
            fields: [
                { name: 'content', type: 'string' },
                { name: 'tag', type: 'string' },
            ]
        },
        {
            type: 'image',
            name: 'image',
            title: 'Image',
        },
    ]
}