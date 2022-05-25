import { useState, useEffect } from 'react'
import { MdOutlineAddBox } from 'react-icons/md'

import { PageContext } from '/context'
import ui from '/front/ui'
import id from '/front/lib/id'

import styles from '/front/styles/AdminBar/ModuleBrowser.module.scss'
import { Row, Col } from '/front/styles'

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
                <>
                    <div onClick={() => setModalVisible(true)}>
                        Add module
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={() => setModalVisible(false)}
                            width="80vw"
                            height="80vh"
                            className={`${styles.moduleBrowser}`}
                            title="Add module"
                        >
                            <Row>
                                {Object.keys(availableModules).map(key => {
                                    const { title, component, ...module } = availableModules[key]
                                    return (
                                        <Col
                                            width={3}
                                            className={`${styles.module} ft-square`}
                                            key={key}
                                        >
                                            <div
                                                className="ft-flex-center"
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
                </>
            )}
        </PageContext.Consumer>
    )
}