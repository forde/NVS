import { useState, useEffect } from 'react'
import { MdWysiwyg } from 'react-icons/md'
import { useRouter } from 'next/router'

import { PageContext } from '/context'
import ui from '/front/ui'
import { classes } from '/front/lib/helpers'
import GeneralSettings from './GeneralSettings'
import SeoSettings from './SeoSettings'

import styles from '/front/styles/AdminBar/PageSettings/PageSettings.module.scss'

export default function PageSettings () {

    const _tabs = [
        { name: 'General', value: 'general' },
        { name: 'SEO', value: 'seo' },
        { name: 'Misc', value: 'misc' },
    ]

    const [ modalVisible, setModalVisible ] = useState(false)
    const [ tab, setTab ] = useState(_tabs[0].value)

    const { Modal, Tabs } = ui()

    const router = useRouter()

    const close = () => {
        setTab(_tabs[0].value)
        setModalVisible(false)
    }

    useEffect(() => {
        if(router.route === '/new' && !modalVisible) setModalVisible(true)
    }, [router.route])

    return (
        <PageContext.Consumer>
            {({ page, changePage }) => !page ? null : (
                <div>
                    <div className={styles.toggle} onClick={() => setModalVisible(true)}>
                        <MdWysiwyg className="icon"/>Page settings
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={close}
                            className="p-16"
                            style={{ minHeight: '400px' }}
                        >
                            <Tabs
                                tabs={_tabs}
                                active={tab}
                                onChange={setTab}
                                {...classes([styles.tabs, `mb-16`])}
                            />
                            {tab === 'general' && <GeneralSettings page={page} onChange={changePage} />}
                            {tab === 'seo' && <SeoSettings page={page} onChange={changePage} />}
                        </Modal>
                    }
                </div>
            )}
        </PageContext.Consumer>
    )
}