import { css } from 'linaria'

import { colors } from '~/styles'
import AuthStatus from '~/components/AuthStatus'

export default function Header () {
    return(
        <div className={`${header} flex-center-y`}>
            <div className="container flex-spread-x align-center">
                <div>
                    Header
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
    background: ${colors.lightGray};
`