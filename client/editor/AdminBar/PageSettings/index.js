import { useState, useEffect } from 'react'
import { styled } from 'linaria/react'
import { MdWysiwyg } from 'react-icons/md'
import { useRouter } from 'next/router'

import { PageContext } from '/context'
import ui from '/editor/ui'
import GeneralSettings from './GeneralSettings'
import SeoSettings from './SeoSettings'

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
                <Wrapper>
                    <div className="toggle" onClick={() => setModalVisible(true)}>
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
                                className="tabs mb-16"
                            />
                            {tab === 'general' && <GeneralSettings page={page} onChange={changePage} />}
                            {tab === 'seo' && <SeoSettings page={page} onChange={changePage} />}
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