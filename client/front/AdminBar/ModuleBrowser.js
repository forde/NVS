import { useState, useEffect } from 'react'
import { MdOutlineAddBox } from 'react-icons/md'

import { Row, Col } from '/styles'
import { PageContext } from '/context'
import ui from '/front/ui'
import id from '/front/lib/id'

import styles from '/front/styles/AdminBar/ModuleBrowser.module.scss'

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
                <div>
                    <div className={styles.toggle} onClick={() => setModalVisible(true)}>
                        <MdOutlineAddBox className="icon"/>Add module
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={() => setModalVisible(false)}
                            width="80vw"
                            height="80vh"
                            className={`p-16 ${styles.moduleBrowser}`}
                        >
                            <Row>
                                {Object.keys(availableModules).map(key => {
                                    const { title, component, ...module } = availableModules[key]
                                    return (
                                        <Col
                                            width={3}
                                            className={`${styles.module} square`}
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
                </div>
            )}
        </PageContext.Consumer>
    )
}