import { css } from 'linaria'
import Link from 'next/link'

import AuthStatus from '/components/AuthStatus'
import Menu from './Menu'

export default function Header () {
    return(
        <div className={`${header} flex-center-y`}>
            <div className="container flex-spread-x align-center">
                <div className="flex-center-y-row">
                    <Link href="/">
                        <a>
                            <img src="/logo.svg" alt="logo" style={{height: '24px', display: 'block', marginRight: '24px'}}/>
                        </a>
                    </Link>
                    <Menu />
                </div>
                <div>
                    <AuthStatus />
                </div>
            </div>
        </div>
    )
}

const header = css`
    height: 64px;
    background: #F1F1F3;
`