// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import seo from './ui/seo'
import category from './documents/category'
import post from './documents/post'
import sections from './ui/sections'
import modules from './ui/modules'
import wysiwyg from './sections/wysiwyg'
import blogPosts from './sections/blogPosts'
import title from './sections/title'
import slider from './sections/slider'
import page from './documents/page'
import Settings from './documents/Settings'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    name: 'default',
    types: schemaTypes.concat([
        post,
        page,
        category,
        seo,
        sections,
        modules,
        wysiwyg,
        title,
        Settings,
        blogPosts,
        slider,
    ])
})
