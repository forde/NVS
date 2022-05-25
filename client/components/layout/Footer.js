import { css } from 'linaria'

export default function Footer () {

    return(
        <div className={`${footer}`} >
            <div className="container">Footer</div>
        </div>
    )
}

const footer = css`
    height: 64px;
    background: #F1F1F3;
    display: flex;
    align-items: center;
`