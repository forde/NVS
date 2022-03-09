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
                        {title: 'Quote', value: 'blockquote'},
                    ],
                    lists: [
                        {title: 'Bullet', value: 'bullet'},
                        {title: 'Numbered', value: 'number'},
                    ],
                    // Marks let you mark up inline text in the block editor.
                    marks: {
                        // Decorators usually describe a single property – e.g. a typographic
                        // preference or highlighting by editors.
                        decorators: [
                            {title: 'Strong', value: 'strong'},
                            {title: 'Emphasis', value: 'em'},
                            {title: "Underline", value: "underline" },
                            {title: "Strike", value: "strike-through" },
                        ],
                        // Annotations can be any object structure – e.g. a link or a footnote.
                        annotations: [
                            {
                                name: 'internalLink',
                                type: 'object',
                                title: 'Internal link',
                                fields: [
                                    {
                                        name: 'reference',
                                        type: 'reference',
                                        title: 'Reference',
                                        to: [
                                            { type: 'post' },
                                        ]
                                    },
                                    {
                                        title: 'Open in new tab',
                                        name: 'blank',
                                        type: 'boolean'
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
                                    },
                                    {
                                        title: 'Open in new tab',
                                        name: 'blank',
                                        type: 'boolean'
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