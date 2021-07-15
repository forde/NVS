export default {
    title: 'Content sections',
    name: 'sections',
    type: 'array',
    of: [
        {
            type: 'title',
        },
        {
            type: 'wysiwyg',
        },
        {
            type: 'blogPosts',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
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
        },
        {
            type: 'slider',
        },
    ]
}