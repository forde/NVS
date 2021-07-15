export default {
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            title: 'Menu',
            name: 'menu',
            type: 'array',
            of: [
                {
                    title: 'Menu item',
                    name: 'item',
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Title',
                        },
                        {
                            name: 'page',
                            type: 'reference',
                            title: 'Page',
                            to: [{type: 'page'}]
                        },
                        {
                            name: 'children',
                            type: 'array',
                            title:' Children',
                            of: [
                                {
                                    title: 'Menu item',
                                    name: 'item',
                                    type: 'object',
                                    fields: [
                                        {
                                            name: 'title',
                                            type: 'string',
                                            title: 'Title'
                                        },
                                        {
                                            name: 'page',
                                            type: 'reference',
                                            title: 'Page',
                                            to: [{type: 'page'}]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
        },
        {
            title: 'SEO',
            name: 'seo',
            type: 'seo',
        }
    ]
}