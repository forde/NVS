import { useState } from 'react'
import { styled } from 'linaria/react'

import { colors } from '~/styles'
import { PageContext } from '~/context'
import editor from '~/editor'

export default function PageInfo () {

    const [ modalVisible, setModalVisible ] = useState(false)

    const { Modal } = editor()

    return (
        <PageContext.Consumer>
            {({ page={} }) => (
                <>
                    <Wrapper onClick={() => setModalVisible(true)}>
                        <div className="primary">{page.title}</div>
                        <div className="secondary">/{page.slug}</div>
                    </Wrapper>
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

const Wrapper = styled.div`
    background: ${colors.black};
    color: white;
    height: 42px;
    min-width: 130px;
    padding: 0 10px;
    background: ${colors.main};
    display: flex;
    flex-direction: column;
    cursor: pointer;
    align-items: flex-start;
    justify-content: center;
    .primary {
        font-size: 14px;
    }
    .secondary {
        font-size: 12px;
        opacity: .8;
    }
`