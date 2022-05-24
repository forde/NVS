import { useState } from 'react'

import Button from './Button'

import styles from '/front/styles/ui/ConfirmButton.module.scss'

export default function ConfirmButton({ className, style, small, children, onConfirm = () => {}, fullWidth=true, busy }) {

    const [ step, setStep ] = useState(1)

    return(
        <div
            className={[
                styles.wrapper,
                small && styles.smallWrapper,
                className
            ].filter(c=>c).join(' ')}
            style={style}
        >
            <div className={[step === 2 && styles.step2In, styles.stepWrapper].filter(c=>c).join(' ')}>
                <div className={styles.step}>
                    <Button tertiary small={small} onClick={() => setStep(2)} className={`${fullWidth ? 'w-100' : ''}`}>{children}</Button>
                </div>
                <div className={[styles.step, styles.step2].join(' ')}>
                    <Button tertiary small={small} disabled={busy} className="mr-24" onClick={() => setStep(1)}>Cancel</Button>
                    <Button small={small} busy={busy} onClick={async () => {
                        await onConfirm()
                        if(step) setStep(1)
                        }} className={styles.delete} style={{ flex: 1 }}>{children}</Button>
                </div>
            </div>
        </div>
    )
}