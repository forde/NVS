export default {
    name: 'seo',
    type: 'object',
    fieldsets: [
        {name: 'seo', }
    ],
    options: {
        collapsible: true,
        collapsed: false,
        columns: 1
    },
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            fieldset: 'seo'
        },
        {
            name: 'description',
            type: 'text',
            rows: 3,
            title: 'Description',
            fieldset: 'seo'
        },
        {
            name: 'keywords',
            type: 'array',
            title: 'Keywords',
            of: [{type: 'string'}],
            options: {
                layout: 'tags'
            },
            fieldset: 'seo'
        }
    ]
}