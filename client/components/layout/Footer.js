import { useUser } from '@auth0/nextjs-auth0'

import { css } from 'linaria'
import { colors } from '/styles'

export default function Footer () {

    const { user } = useUser()

    return(
        <div className={`${footer} flex-center-y`} style={user ? { marginBottom: '42px' } : null}>
            <div className="container">Footer</div>
        </div>
    )
}

const footer = css`
    height: 64px;
    background: ${colors.lightGray};
`