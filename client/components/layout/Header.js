import { css } from 'linaria'

import { colors } from './../../styles'

export default function Header () {
    return(
        <div className={`${header} flex-center-y`}>
            <div className="container">Header</div>
        </div>
    )
}

const header = css`
    height: 64px;
    background: ${colors.lightGray};
`