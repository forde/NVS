export default {
    title: 'Modules',
    name: 'modules',
    type: 'array',
    of: [
        {
            type: 'object',
            name: 'pageTitle',
            title: 'Page title',
            fields: [
                { name: 'content', type: 'string' }
            ]
        },
        {
            type: 'image',
            name: 'image',
            title: 'Image',
        },
    ]
}