import { useEffect } from 'react'
import { styled } from 'linaria/react'
import { MdCancel } from 'react-icons/md'

import Button from './Button'
import Portal from '/front/lib/Portal'

export default function Modal ({
    children,
    onClose,
    width,
    height,
    usePortal=false,
    className,
    white,
    style
}) {

    useEffect(() => {
        const onKeyup = e => e.key === 'Escape' ? onClose() : null
        window.addEventListener('keyup', onKeyup)
        document.getElementsByTagName('html')[0].classList.add('oh')
        return () => {
            window.removeEventListener('keyup', onKeyup)
            document.getElementsByTagName('html')[0].classList.remove('oh')
        }
    }, [])

    const Wrapper = usePortal ? Portal : 'div'

    return (
        <Wrapper>
            <Overlay id="modal" onClick={e => onClose && e.target.id === 'modal' ? onClose() : null} white={white}>
                <div>
                    <ModalEl className={className} id="modal-window" width={width} height={height} white={white} style={style} >
                        {children}
                    </ModalEl>
                    <Button className="close-icon" tertiary small icon={MdCancel} onClick={onClose} />
                </div>
            </Overlay>
        </Wrapper>
    )
}

const Overlay = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: ${props => props.white ? `rgba(255,255,255,.9)` : `rgba(0,0,0,.48)`};
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAQBJREFUSA2tldENgjAQQIkJI8AejuAE/jML/25jHMT45QYO4AIm+K56eiS00F4vuVwJ6XttaWnTfGOapp22a1TlBSgPR6BXal8JPsI5w2sbMZE3UuJOuiT0HwVEvMhDGDCNnhS4RLGEvhY+zFaDly5JEq6mUskmeKkkC54rKYJvlbjga5Iq8ITkhEBC9vl8K2qn3ArIbuG6cB0MVB25CB6k68QrN1Rg9oQKXKL4xKfgA2C7XD4JMDvy3wetIonBdXouyRo8Ien0XbRuhStgYSZxSS48S1IKN5IOhr20/jPxwpMS4HInX8gq/xY4ek6etPdBTqMlPxe0DsdRYclyBfgbXpalja44wn4AAAAASUVORK5CYII='), auto;
    > div {
        position:relative;
    }
    .close-icon {
        position: absolute;
        top: 16px;
        right: 16px;
        cursor: pointer;
        z-index: 900;
    }
`

const ModalEl = styled.div`
    background: #fff;
    width:${props => props.width || '660px'};
    max-width: ${props => props.width || '90vw'};
    height:${props => props.height || 'auto'};
    max-height:90vh;
    min-height: 200px;
    cursor:default;
    position:relative;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    &::-webkit-scrollbar { display: none; }
    border-radius: 10px;
    box-shadow: ${props => props.white ? '0 6px 24px rgba(0,0,0,.12), 0 2px 6px rgba(31,26,34,.06)' : 'none'};
    border: ${props => props.white ? '1px solid #F5F5F7' : 'none'};
`
