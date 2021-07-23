import { css } from 'linaria'

import { colors } from '~/styles'

export default function Footer () {
    return(
        <div className={`${footer} flex-center-y`}>
            <div className="container">Footer</div>
        </div>
    )
}

const footer = css`
    height: 64px;
    background: ${colors.lightGray};
`