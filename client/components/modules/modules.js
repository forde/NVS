import Heading, { Settings } from './Heading'
import Image from './Image'
import Content from './Content'

export default {
    heading: {
        _key: '',
        _type: 'heading',
        title: 'Heading',
        component: Heading,
        settings: Settings,
        content: '',
    },
    image: {
        _key: '',
        _type: 'image',
        title: 'Image',
        component: Image,
        asset: null,
    },
    content: {
        _key: '',
        _type: 'content',
        title: 'Content',
        component: Content,
        content: ''
    }
}