export default {
    name: 'post',
    title: 'Posts',
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
            name: 'meta',
            title: 'Meta',
            type: 'object',
            fieldsets: [
                {name: 'meta' }
            ],
            options: {
                collapsible: true,
                collapsed: false,
                columns: 1
            },
            fields: [
                {
                    name: 'mainImage',
                    title: 'Main image',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    fieldset: 'meta'
                },
                {
                    name: 'categories',
                    title: 'Categories',
                    type: 'array',
                    of: [{type: 'reference', to: {type: 'category'}}],
                    fieldset: 'meta'
                },
                {
                    name: 'publishedAt',
                    title: 'Published at',
                    type: 'datetime',
                    fieldset: 'meta'
                },
            ]
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
