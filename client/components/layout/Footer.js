import { css } from 'linaria'

export default function Footer () {

    return(
        <div className={`${footer} flex-center-y`} >
            <div className="container">Footer</div>
        </div>
    )
}

const footer = css`
    height: 64px;
    background: #F1F1F3;
`