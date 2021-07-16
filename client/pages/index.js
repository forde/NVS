import { normalize } from 'polished'
import { css } from 'linaria'
import { styled } from 'linaria/react'

import { Row, Col } from '~/styles'
import Layout from '~/components/Layout'

export default function Home() {
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

            </div>
        </Layout>
    )
}