import { useState } from 'react'
import { curry } from 'ramda'
import { MdAddCircle, MdSearch } from 'react-icons/md'
import imageUrlBuilder from '@sanity/image-url'
import xor from 'lodash.xor'

import Layout from '/components/Layout'
import { success, error } from '/front/lib/message'
import { client } from '/api'
import ui from '/front/ui'

import { colors, Row, Col } from '/front/styles'

const imageUrl = source => imageUrlBuilder(client).image(source)

export default function Home() {

    const {
        editMode,
        RichTextEditor,
        Actions,
        Button,
        Checkbox,
        ConfirmButton,
        Editable,
        Input,
        LinkPicker,
        Loader,
        MediaBrowser,
        Modal,
        OverlayLock,
        Bars,
        Radio,
        Select,
        Switch,
        Tabs,
        TagInput,
    } = ui()

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
        editedImage: null,
        tab: 'one',
        radio: 'one',
        checkbox: [],
        pickerVisible: false,
        link: {},
        tags: [],
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
            <div className="container ft-pt-24">
                <Row>
                    <Col width={6}>col 6</Col>
                    <Col width={[3,6]}>col 3,6</Col>
                    <Col width={[3,6,12]}>col 3,6,12</Col>
                </Row>
                <h1 className="ft-mb-24">Heading 1</h1>
                <h2 className="ft-mb-24">Heading 2</h2>
                <h3 className="ft-mb-24">Heading 3</h3>
                <div className="ft-mb-24">
                    <Button small onClick={() => change('modal')(true)}>Open modal</Button>
                    {demo.modal && <Modal onClose={() => change('modal')(false)} title="Modal">Modal content...</Modal>}
                </div>
                <Row>
                    <Col width={[6,6,12]}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
                    </Col>
                    <Col width={[6,6,12]}>
                        <p>Ommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim</p>
                    </Col>
                </Row>
                <div className="ft-p-16 ft-mb-24" style={{background: '#20201F'}}>
                    <div className="ft-mb-24">
                        <Select {...selectProps} />
                        <Select {...selectProps} small />
                    </div>
                    <div className="ft-mb-24 ft-flex">
                        <div><Select {...selectProps} disabled label="Label"/></div>
                        <div><Select {...selectProps} disabled small label="Label"/></div>
                    </div>
                    <div className="ft-mb-24">
                        <Select {...multiselectProps} multiple />
                        <Select {...multiselectProps} small multiple />
                    </div>
                    <div className="ft-mb-24">
                        <Select {...selectProps} searchable />
                        <Select {...selectProps} small searchable />
                    </div>
                    <div className="ft-mb-24">
                        <Select {...selectProps} invalid />
                        <Select {...selectProps} small invalid />
                    </div>
                    <div className="ft-mb-24">
                        <button onClick={() => success('Success mssage')} style={{background: colors.green, color: 'black', border: 'none'}}>toast</button>
                        <button onClick={() => error('Error mssage')} style={{background: colors.red, color: '#fff', border: 'none'}}>toast</button>
                    </div>
                    <div className="ft-mb-24">
                        <Switch on={demo.switch} onChange={change('switch')} />
                    </div>
                    <div className="ft-mb-24">
                        <TagInput
                            placeholder="Add tag"
                            label="Tag input"
                            value={demo.tags}
                            style={{width: '600px'}}
                            onChange={change('tags')}
                        />
                    </div>
                    <div className="ft-mb-24">
                        <TagInput
                            placeholder="Add tag"
                            label="Tag input disabled"
                            value={demo.tags}
                            disabled
                            style={{width: '600px'}}
                            onChange={change('tags')}
                        />
                    </div>
                    <div className="ft-mb-24">
                        <TagInput
                            placeholder="Add tag"
                            label="Tag input small"
                            value={demo.tags}
                            small
                            style={{width: '600px'}}
                            onChange={change('tags')}
                        />
                    </div>
                    <div className="ft-mb-24">
                        <Button className="ft-mr-16" onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" tertiary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" medium onClick={() => console.log('click')}>medium</Button>
                        <Button className="ft-mr-16" medium secondary onClick={() => console.log('click')}>medium</Button>
                        <Button className="ft-mr-16" medium tertiary onClick={() => console.log('click')}>medium</Button>
                        <Button className="ft-mr-16" small onClick={() => console.log('click')}>small</Button>
                        <Button className="ft-mr-16" small secondary onClick={() => console.log('click')}>small</Button>
                        <Button className="ft-mr-16" small tertiary onClick={() => console.log('click')}>small</Button>
                    </div>
                    <div className="ft-mb-24">
                        <Button className="ft-mr-16" busy width="88px" onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" tertiary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" medium onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" medium secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" medium tertiary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" small onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" small secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" busy width="88px" small tertiary onClick={() => console.log('click')}>button</Button>
                    </div>
                    <div className="ft-mb-24">
                        <Button className="ft-mr-16" disabled onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" disabled secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" disabled tertiary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" disabled small onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" disabled small secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" disabled small tertiary onClick={() => console.log('click')}>button</Button>
                    </div>
                    <div className="ft-mb-24">
                        <Button className="ft-mr-16" icon={MdAddCircle} onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} tertiary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} medium onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} medium secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} medium tertiary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} small onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} small secondary onClick={() => console.log('click')}>button</Button>
                        <Button className="ft-mr-16" icon={MdAddCircle} small tertiary onClick={() => console.log('click')}>button</Button>
                    </div>
                    <div className="ft-mb-24">
                        <Button className="ft-mr-16" icon={MdAddCircle} onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} secondary onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} tertiary onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} medium onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} medium secondary onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} medium tertiary onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} small onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} small secondary onClick={() => console.log('click')}/>
                        <Button className="ft-mr-16" icon={MdAddCircle} small tertiary onClick={() => console.log('click')}/>
                    </div>
                    <div className="ft-mb-24">
                        <Tabs
                            tabs={[
                                { name: 'One', value: 'one' },
                                { name: 'Two', value: 'two' },
                                { name: 'Three', value: 'three' },
                            ]}
                            className="ft-mb-24"
                            active={demo.tab}
                            onChange={change('tab')}
                        />
                    </div>
                    <Row className="ft-mb-24">
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} placeholder="Type something" onChange={change('input')} />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} placeholder="Type something" medium onChange={change('input')} />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} placeholder="Type something" onChange={change('input')} small />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} onChange={change('input')} disabled label="Label" placeholder="Disabled" />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} medium placeholder="Type something" label="Label" onChange={change('input')} />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} onChange={change('input')} small disabled label="Label" placeholder="Disabled" />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} onChange={change('input')} icon={MdSearch} placeholder="Search"/>
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} onChange={change('input')} medium icon={MdSearch} placeholder="Search"/>
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} onChange={change('input')} small icon={MdSearch} placeholder="Search" />
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} placeholder="Type something" onChange={change('input')} multiline/>
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} placeholder="Type something" medium onChange={change('input')} multiline/>
                        </Col>
                        <Col width={4} className="ft-mb-24">
                            <Input value={demo.input} placeholder="Type something" onChange={change('input')} small multiline/>
                        </Col>
                    </Row>
                    <div className="ft-mb-24 ft-flex">
                        <Radio
                            value="one"
                            onChange={change('radio')}
                            checked={demo.radio === 'one'}
                            label="One"
                            description="First choice"
                            style={{width: '200px', marginRight: '16px'}}
                        />
                        <Radio
                            value="two"
                            onChange={change('radio')}
                            checked={demo.radio === 'two'}
                            label="Two"
                            description="Second choice"
                            style={{width: '200px', marginRight: '16px'}}
                        />
                        <Radio
                            value="three"
                            onChange={change('radio')}
                            checked={demo.radio === 'three'}
                            label="Three"
                            style={{width: '200px', marginRight: '16px'}}
                        />
                        <Radio
                            value="four"
                            onChange={change('radio')}
                            checked={demo.radio === 'four'}
                            label="Four"
                            disabled
                            description="I'm disabled"
                            style={{width: '200px'}}
                        />
                    </div>
                    <div className="ft-mb-24 ft-flex">
                        <Checkbox
                            value="one"
                            onChange={val => change('checkbox')(xor(demo.checkbox, [val]))}
                            checked={demo.checkbox.includes('one')}
                            label="One"
                            description="First choice"
                            style={{width: '200px', marginRight: '16px'}}
                        />
                        <Checkbox
                            value="two"
                            onChange={val => change('checkbox')(xor(demo.checkbox, [val]))}
                            checked={demo.checkbox.includes('two')}
                            label="Two"
                            description="Second choice"
                            style={{width: '200px', marginRight: '16px'}}
                        />
                        <Checkbox
                            value="three"
                            onChange={val => change('checkbox')(xor(demo.checkbox, [val]))}
                            checked={demo.checkbox.includes('three')}
                            label="Three"
                            style={{width: '200px', marginRight: '16px'}}
                        />
                        <Checkbox
                            value="four"
                            onChange={val => change('checkbox')(xor(demo.checkbox, [val]))}
                            checked={demo.checkbox.includes('four')}
                            label="Four"
                            disabled
                            description="I'm disabled"
                            style={{width: '200px'}}
                        />
                    </div>
                    <div className="container ft-flex">
                        <ConfirmButton children="confirm button" style={{ width:' 400px', marginRight: '20px'}} />
                        <ConfirmButton children="confirm button"  style={{ width:' 400px'}} small  />
                    </div>
                </div>
                <div className="ft-mb-24">
                    <Editable
                        value={demo.editable}
                        onChange={change('editable')}
                        placeholder="Editable text"
                    />
                </div>
                <div className="ft-mb-24">
                    <RichTextEditor />
                </div>
                <div className="ft-mb-24">
                    <Button
                        secondary
                        small
                        onClick={() => {
                            setDemo({...demo, mediaBrowser: true })
                    }}>Media browser</Button>
                    {demo.mediaBrowser && <MediaBrowser
                        onClose={() => {
                            setDemo({...demo, mediaBrowser: false, editedImage: null })
                        }}
                        selectedImage={demo.editedImage}
                        onUse={image => {
                            setDemo({...demo, usedImage: image, mediaBrowser: false })
                            // image url builder docs: https://www.sanity.io/docs/image-url
                        }
                    } />}
                    {demo.usedImage && <img
                        className="block ft-mt-24 ft-clickable"
                        onClick={() => setDemo({...demo, editedImage: demo.usedImage, mediaBrowser: true })}
                        src={imageUrl(demo.usedImage).width(400).auto('format').url()}
                        title={demo.usedImage.title}
                        alt={demo.usedImage.alt}
                    />}
                </div>
                <div className="ft-mb-24">
                    <Button small secondary onClick={() => setDemo({...demo, pickerVisible: true})}>Link picker</Button>
                    {demo.pickerVisible && <LinkPicker
                        onLink={l => {
                            console.log(l)
                            setDemo({...demo, pickerVisible: false, link: l })
                        }}
                        onClose={() => setDemo({...demo, pickerVisible: false })}
                        {...demo.link}
                    />}
                </div>
                <div className="ft-mb-24 ft-flex ft-mt-48">
                    <div className="ft-flex-center ft-p-24" style={{background: '#EFEFF1', width: '100%'}}>
                        Actions preview on hover
                    </div>
                    <Actions
                        onrefresh={_=>null}
                        onBild={_=>null}
                        onDelete={_=>null}
                        onHelp={_=>null}
                        onClear={_=>null}
                        onExternal={_=>null}
                        onEdit={_=>null}
                        onSearch={_=>null}
                        onList={_=>null}
                        onPreview={_=>null}
                        onAdd={_=>null}
                        onCopy={_=>null}
                        onAtach={_=>null}
                        onLink={_=>null}
                        onPhone={_=>null}
                        onDesktop={_=>null}
                        onColor={_=>null}
                        onAddPage={_=>null}
                        onMoveLeft={_=>null}
                        onMoveRight={_=>null}
                        onMoveUp={_=>null}
                        onMoveDown={_=>null}
                    />
                </div>
            </div>
            <div className="ft-mb-24 container ft-flex ft-wrap ft-mt-48">
                {Object.keys(colors).map(k => <div
                    key={k}
                    style={{ background: colors[k], padding: '20px 40px' }}
                    children={k}
                />)}
            </div>
            <div className="container">
                <div className="ft-flex-center ft-p-24 ft-mb-24" style={{background: colors.primary, width: '25%'}}><Bars/></div>
                <div className="ft-flex-center ft-p-24 ft-mb-24" style={{background: colors.primary, width: '50%'}}><Bars/></div>
                <div className="ft-flex-center ft-p-24 ft-mb-24" style={{background: colors.primary, width: '75%'}}><Bars/></div>
                <div className="ft-flex-center ft-p-24 ft-mb-24" style={{background: colors.primary, width: '100%'}}><Bars/></div>
            </div>
        </Layout>
    )
}