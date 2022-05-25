import { useState, useEffect } from 'react'
import { MdWysiwyg } from 'react-icons/md'
import { useRouter } from 'next/router'

import { PageContext } from '/context'
import ui from '/front/ui'
import { truncate } from '/front/lib/helpers'
import GeneralSettings from './GeneralSettings'
import SeoSettings from './SeoSettings'

import styles from '/front/styles/AdminBar/PageSettings/PageSettings.module.scss'

export default function PageSettings () {

    const _tabs = [
        { name: 'General', value: 'general' },
        { name: 'SEO', value: 'seo' },
        { name: 'Misc', value: 'misc' },
        { name: 'Data', value: 'data' },
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
                <>
                    <div className={styles.pageInfo} onClick={setModalVisible}>
                        <div className="primary">{truncate(page.title, 30)}</div>
                        <div className="secondary">{truncate(page._type, 30)}</div>
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={close}
                            title="Page settings"
                            width="60vw"
                            height="60vh"
                            toolbarChildren={<Tabs
                                tabs={_tabs}
                                active={tab}
                                onChange={setTab}
                            />}
                        >
                            {tab === 'general' && <GeneralSettings page={page} onChange={changePage} />}
                            {tab === 'seo' && <SeoSettings page={page} onChange={changePage} />}
                            {tab === 'data' && <pre className={styles.pre}>{JSON.stringify(page, null, 4)}</pre>}
                        </Modal>
                    }
                </>
            )}
        </PageContext.Consumer>
    )
}