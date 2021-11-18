import Heading, { Settings } from './Heading'
import Image from './Image'
import RichText from './RichText'

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
    richText: {
        _key: '',
        _type: 'richText',
        title: 'Rich text',
        component: RichText,
        content: ''
    }
}