import { css } from 'linaria'
import Link from 'next/link'

import AuthStatus from '/components/AuthStatus'
import Menu from './Menu'

export default function Header () {
    return(
        <div className={`${header}`}>
            <div className="container">
                <div className="">
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    > div {
        display: flex;
        justify-content: space-between;
        display: flex;
        align-items: center;
        > div {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
`