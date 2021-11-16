import { useState, useEffect } from 'react'
import { styled } from 'linaria/react'
import { MdWysiwyg } from 'react-icons/md'
import { nanoid } from 'nanoid'

import { colors, Row, Col } from '~/styles'
import { PageContext } from '~/context'
import editor from '~/editor'

export default function PageSettings () {

    const [ modalVisible, setModalVisible ] = useState(false)
    const [ tab, setTab ] = useState('General')

    const { Modal, Tabs } = editor()

    return (
        <PageContext.Consumer>
            {pageContext => (
                <Wrapper>
                    <div className="toggle" onClick={() => setModalVisible(true)}>
                        <MdWysiwyg className="icon"/>Page settings
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={() => setModalVisible(false)}
                            className="p-16"
                        >
                            <Tabs
                                tabs={['General','SEO','Misc'].map(t => ({ name:t, value:t }))}
                                active={tab}
                                onChange={setTab}
                                className="tabs"
                            />
                            <Row>

                            </Row>
                        </Modal>
                    }
                </Wrapper>
            )}
        </PageContext.Consumer>
    )
}

const Wrapper = styled.div`
    .toggle {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 10px;
    }
    .tabs {
        width: calc(100% - 38px - 16px);
        display: flex;
        button {
            flex: 1;
        }
    }
`