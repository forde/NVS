import { useState } from 'react'
import { curry } from 'ramda'

import { Row, Col } from '~/styles'
import Layout from '~/components/Layout'
import { success, error } from '~/components/form/Toast'
import Switch from '~/components/form/Switch'

export default function Home() {

    const [ demo, setDemo ] = useState({
        switch: false,
    })

    const change = curry((key, val) => {
        setDemo({...demo, [key]: val })
    })

    return(
        <Layout>
            <div className="container">
                <h1 className="mb-24">Heading 1</h1>
                <h2 className="mb-24">Heading 2</h2>
                <h3 className="mb-24">Heading 3</h3>
                <Row>
                    <Col width={[6,6,12]}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea</p>
                    </Col>
                    <Col width={[6,6,12]}>
                        <p>Ommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim</p>
                    </Col>
                </Row>
                <div className="mb-24">
                    <button onClick={() => success('message')} style={{background:'#4caf50', color: 'black'}}>success message</button>
                    <button onClick={() => error('message')} style={{background:'#f44336', color: '#fff'}}>error message</button>
                </div>
                <div className="mb-24">
                    <Switch on={demo.switch} onChange={change('switch')} />
                </div>

            </div>
        </Layout>
    )
}