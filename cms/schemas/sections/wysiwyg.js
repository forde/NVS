export default {
    title: 'Text content',
    name: 'wysiwyg',
    type: 'object',
    fields: [
        {
            name: 'content',
            type: 'array',
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [
                        {title: 'Normal', value: 'normal'},
                        {title: 'H2', value: 'h2'},
                        {title: 'H3', value: 'h3'},
                        {title: 'H4', value: 'h4'},
                    ],
                    lists: [{title: 'Bullet', value: 'bullet'}],
                    // Marks let you mark up inline text in the block editor.
                    marks: {
                        // Decorators usually describe a single property – e.g. a typographic
                        // preference or highlighting by editors.
                        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
                        // Annotations can be any object structure – e.g. a link or a footnote.
                        annotations: [
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal link',
                                fields: [
                                    {
                                        title: 'Show link as button',
                                        name: 'button',
                                        type: 'boolean'
                                    },
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [
                                            { type: 'post' },
                                        ]
                                    }
                                ]
                            },
                            {
                                title: 'URL',
                                name: 'link',
                                type: 'object',
                                fields: [
                                {
                                    title: 'URL',
                                    name: 'href',
                                    type: 'url'
                                }
                                ]
                            }
                        ]
                    }
                },
            ]
        }
    ],
    preview: {
        select: {
            title: 'content',
        }
    }
}