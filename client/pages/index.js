import { useState } from 'react'
import { curry } from 'ramda'
import { MdAddCircle, MdSearch } from 'react-icons/md'
import imageUrlBuilder from '@sanity/image-url'

import { Row, Col, colors } from '~/styles'
import Layout from '~/components/Layout'
import { success, error } from '~/components/form/Toast'
import Switch from '~/components/form/Switch'
import Button from '~/components/form/Button'
import Editable from '~/components/form/Editable'
import Select from '~/components/form/Select'
import RichTextEditor from '~/components/form/RichTextEditor'
import MediaBrowser from '~/components/form/MediaBrowser'
import Input from '~/components/form/Input'
import Modal from '~/components/Modal'
import { client } from '~/api'

const imageUrl = source => imageUrlBuilder(client).image(source)

export default function Home() {

    const [ demo, setDemo ] = useState({
        switch: false,
        modal: false,
        editable: '',
        select: '',
        multiSelect: [],
        richText: '',
        mediaBrowser: false,
        input: '',
        usedImage: null,
    })

    const change = curry((key, val) => {
        setDemo({...demo, [key]: val })
    })

    const selectProps = {
        value: demo.select,
        onChange: change('select'),
        placeholder: "Select value",
        options: ['One','Two','Three'],
        style: {width:'180px', minWidth:'180px',marginRight:'16px'}
    }

    const multiselectProps = {
        value: demo.multiSelect,
        onChange: change('multiSelect'),
        placeholder: "Select values",
        options: ['One','Two','Three'],
        style: {width:'240px',marginRight:'16px'}
    }

    return(
        <Layout>
            <div className="container">
                <h1 className="mb-24">Heading 1</h1>
                <h2 className="mb-24">Heading 2</h2>
                <h3 className="mb-24">Heading 3</h3>
                <div className="mb-24">
                    <Button tertiary small onClick={() => change('modal')(true)}>Open modal</Button>
                    {demo.modal && <Modal onClose={() => change('modal')(false)} className="p-32">Modal content...</Modal>}
                </div>
                <Row>
                    <Col width={[6,6,12]}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
                    </Col>
                    <Col width={[6,6,12]}>
                        <p>Ommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim</p>
                    </Col>
                </Row>
                <div className="mb-24">
                    <Select {...selectProps} />
                    <Select {...selectProps} small />
                    <Select {...selectProps} disabled label="Label"/>
                    <Select {...selectProps} disabled small label="Label"/>
                </div>
                <div className="mb-24">
                    <Select {...multiselectProps} multiple />
                    <Select {...multiselectProps} small multiple />
                </div>
                <div className="mb-24">
                    <Select {...selectProps} searchable />
                    <Select {...selectProps} small searchable />
                </div>
                <div className="mb-24">
                    <Select {...selectProps} invalid />
                    <Select {...selectProps} small invalid />
                </div>
                <div className="mb-24">
                    <button onClick={() => success('Success mssage')} style={{background:colors.green, color: 'black', border: 'none'}}>toast</button>
                    <button onClick={() => error('Error mssage')} style={{background:colors.red, color: '#fff', border: 'none'}}>toast</button>
                </div>
                <div className="mb-24">
                    <Switch on={demo.switch} onChange={change('switch')} />
                </div>
                <div className="mb-24">
                    <Button className="mr-16" onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" tertiary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" small onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" small secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" small tertiary onClick={() => console.log('click')}>button</Button>
                </div>
                <div className="mb-24">
                    <Button className="mr-16" busy width="88px" onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" busy width="88px" secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" busy width="88px" tertiary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" busy width="88px" small onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" busy width="88px" small secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" busy width="88px" small tertiary onClick={() => console.log('click')}>button</Button>
                </div>
                <div className="mb-24">
                    <Button className="mr-16" disabled onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" disabled secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" disabled tertiary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" disabled small onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" disabled small secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" disabled small tertiary onClick={() => console.log('click')}>button</Button>
                </div>
                <div className="mb-24">
                    <Button className="mr-16" icon={MdAddCircle} onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" icon={MdAddCircle} secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" icon={MdAddCircle} tertiary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" icon={MdAddCircle} small onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" icon={MdAddCircle} small secondary onClick={() => console.log('click')}>button</Button>
                    <Button className="mr-16" icon={MdAddCircle} small tertiary onClick={() => console.log('click')}>button</Button>
                </div>
                <div className="mb-24">
                    <Button className="mr-16" icon={MdAddCircle} onClick={() => console.log('click')}/>
                    <Button className="mr-16" icon={MdAddCircle} secondary onClick={() => console.log('click')}/>
                    <Button className="mr-16" icon={MdAddCircle} tertiary onClick={() => console.log('click')}/>
                    <Button className="mr-16" icon={MdAddCircle} small onClick={() => console.log('click')}/>
                    <Button className="mr-16" icon={MdAddCircle} small secondary onClick={() => console.log('click')}/>
                    <Button className="mr-16" icon={MdAddCircle} small tertiary onClick={() => console.log('click')}/>
                </div>
                <div className="mb-24">
                    <Editable
                        value={demo.editable}
                        onChange={change('editable')}
                        placeholder="Editable text"
                        className="h-medium"
                    />
                </div>
                <div className="mb-24">
                    <RichTextEditor />
                </div>
                <div className="mb-24">
                    <Button secondary small onClick={() => change('mediaBrowser')(!demo.mediaBrowser)}>Media browser</Button>
                    {demo.mediaBrowser && <MediaBrowser
                        onClose={() => change('mediaBrowser')(false)}
                        onUse={image => {
                            setDemo({...demo, usedImage: image, mediaBrowser: false })
                            // image url builder docs: https://www.sanity.io/docs/image-url
                        }
                    } />}
                    {demo.usedImage && <img src={imageUrl(demo.usedImage).width(400).auto('format').url()} title={demo.usedImage.title} alt={demo.usedImage.alt} />}
                </div>
                <Row className="mb-24">
                    <Col width={3}>
                        <Input value={demo.input} placeholder="Type something" onChange={change('input')} />
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} placeholder="Type something" onChange={change('input')} small />
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} onChange={change('input')} disabled label="Label" placeholder="Disabled" />
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} onChange={change('input')} small disabled label="Label" placeholder="Disabled" />
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} onChange={change('input')} icon={MdSearch} placeholder="Search"/>
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} onChange={change('input')} small icon={MdSearch} placeholder="Search" />
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} placeholder="Type something" onChange={change('input')} multiline/>
                    </Col>
                    <Col width={3}>
                        <Input value={demo.input} placeholder="Type something" onChange={change('input')} small multiline/>
                    </Col>
                </Row>
            </div>
        </Layout>
    )
}