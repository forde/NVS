import { useState } from 'react'
import { styled } from 'linaria/react'

import Button from './Button'

export default function ConfirmButton({ className, style, small, children, onConfirm = () => {}, fullWidth=true, busy }) {

    const [ step, setStep ] = useState(1)

    return(
        <Wrapper className={className} style={style}>
            <div className={['step-wrapper', step === 2 && 'step-2-in step-1-out'].filter(c=>c).join(' ')}>
                <div className="step step-1">
                    <Button tertiary small={small} onClick={() => setStep(2)} className={`pre-delete ${fullWidth ? 'w-100' : ''}`}>{children}</Button>
                </div>
                <div className="step step-2">
                    <Button tertiary small={small} disabled={busy} className="mr-24" onClick={() => setStep(1)}>Cancel</Button>
                    <Button small={small} busy={busy} onClick={async () => {
                        await onConfirm()
                        if(step) setStep(1)
                        }} className="delete" style={{ flex: 1 }}>{children}</Button>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    width:100%;
    border-radius: 10px;
    overflow: hidden;
    .step-wrapper {
        position:relative;
        display: flex;
        align-items: flex-start;
        width:200%;
        transition: all .4s ease-in-out;
        &.step-2-in {
            transform: translateX(-50%);
            .step-2 {
                opacity:1;
                visibility: visible;
            }
            .step-1 {
                opacity:0;
                visibility: hidden;
            }
        }
    }

    .step {
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        align-items: flex-end;
        position: relative;
        transition: all .4s ease-in-out;
        width:50%;

        &.step-2 {
            opacity:0;
            visibility: hidden;
            flex-wrap: initial;
        }
    }

    .delete {
        color: #fff;
        background: #f03434!important;
    }
`