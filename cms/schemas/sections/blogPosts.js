export default {
    title: 'Blog posts',
    name: 'blogPosts',
    type: 'object',
    fields: [
        {
            title: 'Pots to show',
            name: 'limit',
            type: 'string',
            options: {
                list: [
                    {title: 'Latest 3', value: '3'},
                    {title: 'All', value: '-1'},
                ],
                layout: 'radio',
                direction: 'horizontal'
            },
        }
    ],
    preview: {
        select: {
            title: 'limit',
        },
        prepare(selection) {
            const {title} = selection
            return {
                title: title === '-1' ? 'All posts' : 'Latest 3 posts',
            }
        }
    }
}