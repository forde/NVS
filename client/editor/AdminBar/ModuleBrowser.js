import { useState, useEffect } from 'react'
import { styled } from 'linaria/react'
import { MdOutlineAddBox } from 'react-icons/md'

import { colors, Row, Col } from '/styles'
import { PageContext } from '/context'
import ui from '/editor/ui'
import id from '/editor/lib/id'

export default function ModuleBrowser () {

    const [ modalVisible, setModalVisible ] = useState(false)
    const [ availableModules, setAvailableModules ] = useState({})

    useEffect(() => {
        (async () => {
            setAvailableModules((await import(process.env.NEXT_PUBLIC_MODULES_LOCATION)).default)
        })()
    })

    const { Modal } = ui()

    const addModule = (module, pageContext) => {

        const _key = id()

        pageContext.changePage({
            ...pageContext.page,
            modules: [ ...pageContext.page.modules, { ...module, _key }]
        })

        setModalVisible(false)
    }

    return (
        <PageContext.Consumer>
            {pageContext => !pageContext.page ? null : (
                <Wrapper>
                    <div className="toggle" onClick={() => setModalVisible(true)}>
                        <MdOutlineAddBox className="icon"/>Add module
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={() => setModalVisible(false)}
                            width="80vw"
                            height="80vh"
                            className="p-16 module-browser"
                        >
                            <Row>
                                {Object.keys(availableModules).map(key => {
                                    const { title, component, ...module } = availableModules[key]
                                    return (
                                        <Col
                                            width={3}
                                            className="module square"
                                            key={key}
                                        >
                                            <div
                                                className="card flex-center"
                                                onClick={() => addModule(module, pageContext)}
                                            >
                                                {title}
                                            </div>
                                        </Col>
                                    )
                                })}
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
    .module-browser {
        color: ${colors.black};
        position: relative;
        .module {
            position: relative;
            > div {
                border: 3px solid ${colors.gray};
                cursor: pointer;
                font-weight: 600;
                font-size: 1.6em;
                @media (pointer: fine) { &:hover {
                    border-color: ${colors.black};
                }}
            }
        }
    }
`