import { useRef } from 'react'

import { wrapper } from '/front/styles/ui/HorisontalScroller.module.scss'

export default function HorisontalScroller({ children, WrapperTag='div', ...rest }) {

    const InnerWrapperRef = useRef(null)

    return (
        <div style={{ position:'relative' }} >
            <WrapperTag className={wrapper} ref={InnerWrapperRef} {...rest} >
                {children}
            </WrapperTag>
        </div>
    )
}