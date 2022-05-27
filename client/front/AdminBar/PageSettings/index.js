import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import ui from '/front/ui'
import { truncate } from '/front/lib/helpers'
import GeneralSettings from './GeneralSettings'
import SeoSettings from './SeoSettings'

import styles from '/front/styles/AdminBar/PageSettings/PageSettings.module.scss'

import config from '/front.config'

const DynamicReactJsonWithNoSSR = dynamic(
    () => import('react-json-view'),
    { ssr: false }
)

export default function PageSettings () {

    const { page, changePage } = config.usePage()

    const _tabs = [
        { name: 'General', value: 'general' },
        { name: 'SEO', value: 'seo' },
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

    return !page ? null :
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
                    {tab === 'data' && <DynamicReactJsonWithNoSSR collapsed={1} displayDataTypes={false} name={null} src={page} theme="chalk" iconStyle="square" style={{fontSize: '15px', background: '#20201F'}} /> }
                </Modal>
            }
        </>
}