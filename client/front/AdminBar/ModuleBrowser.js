import { useState, useEffect } from 'react'

import ui from '/front/ui'
import id from '/front/lib/id'

import styles from '/front/styles/AdminBar/ModuleBrowser.module.scss'
import { Row, Col } from '/front/styles'

import config from '/front.config'

export default function ModuleBrowser () {

    const [ modalVisible, setModalVisible ] = useState(false)
    const [ availableModules, setAvailableModules ] = useState({})

    const { page, changePage } = config.usePage()

    useEffect(() => {
        (async () => {
            setAvailableModules((await import(process.env.NEXT_PUBLIC_MODULES_LOCATION)).default)
        })()
    })

    const { Modal } = ui()

    const addModule = module => {

        const _key = id()

        changePage({
            ...page,
            modules: [ ...page.modules, { ...module, _key }]
        })

        setTimeout(() => {
            document.querySelector('.ft-modules')?.lastChild?.scrollIntoView({ behavior: 'smooth', block: 'start'})
        }, 300)

        setModalVisible(false)
    }

    return !page ? null :
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
                                        onClick={() => addModule(module)}
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
}