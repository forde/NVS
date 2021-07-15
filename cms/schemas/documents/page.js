export default {
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            title: 'Sections',
            name: 'sections',
            type: 'sections',
        },
        {
            title: 'SEO',
            name: 'seo',
            type: 'seo',
        }
    ]
}
