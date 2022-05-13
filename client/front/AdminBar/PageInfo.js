import { useState } from 'react'

import { PageContext } from '/context'
import ui from '/front/ui'
import { truncate } from '/front/lib/helpers'

import { pageInfo } from '/front/styles/AdminBar/PageInfo.module.scss'

export default function PageInfo () {

    const [ modalVisible, setModalVisible ] = useState(false)

    const { Modal } = ui()

    return (
        <PageContext.Consumer>
            {({ page }) => !page ? null : (
                <>
                    <div className={pageInfo} onClick={() => setModalVisible(true)}>
                        <div className="primary">{truncate(page.title, 30)}</div>
                        <div className="secondary">/{truncate(page.slug, 30)}</div>
                    </div>
                    {modalVisible &&
                        <Modal
                            onClose={() => setModalVisible(false)}
                            width="80vw"
                            height="80vh"
                            className="pl-16 pr-16"
                        >
                            <pre>{JSON.stringify(page, null, 4)}</pre>
                        </Modal>
                    }
                </>
            )}
        </PageContext.Consumer>
    )
}