import { useEffect } from 'react'
import { styled } from 'linaria/react'
import { MdCancel } from 'react-icons/md'

import Button from './Button'
import Portal from '/front/lib/Portal'
import { classes } from '/front/lib/helpers'

import styles from '/front/styles/ui/Modal.module.scss'

export default function Modal ({
    children,
    onClose,
    width,
    height,
    usePortal=false,
    className,
    style,
    title='',
    toolbarChildren=null,
}) {

    useEffect(() => {
        const onKeyup = e => e.key === 'Escape' ? onClose() : null
        window.addEventListener('keyup', onKeyup)
        document.getElementsByTagName('html')[0].classList.add('ft-oh')
        return () => {
            window.removeEventListener('keyup', onKeyup)
            document.getElementsByTagName('html')[0].classList.remove('ft-oh')
        }
    }, [])

    const Wrapper = usePortal ? Portal : 'div'

    return (
        <Wrapper className="front">
            <div id="modal" className={styles.overlay} onClick={e => onClose && e.target.id === 'modal' ? onClose() : null}>
                <div>
                    <div
                        {...classes([styles.modal, className])}
                        id="modal-window"
                        style={{
                            width: width || '660px',
                            height: height || 'auto',
                            ...(style || {})
                        }}
                    >
                        <div className={styles.toolbar}>
                            {title}
                            <div className={styles.toolbarChildren}>
                                {toolbarChildren}
                            </div>
                            <div role="button" className={styles.close} onClick={onClose} />
                        </div>
                        <div className={styles.children} style={{ height: height || 'auto',  maxHeight: `calc(${height || '90vh'} - 48px)`}} >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}
