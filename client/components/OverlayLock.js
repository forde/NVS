import { css } from 'linaria'

const overlay = css`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(255,255,255,.5);
    z-index: 500;
`

export default function OverlayLock () {
    return <div className={overlay} />
}
