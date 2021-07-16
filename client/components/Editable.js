import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Editable({ value, placeholder, onChange, style, className, ref, ...rest }) {

    const state = useRef({ value, prevValue: null, key: null })

    // reset prevState on route change
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            state.current.prevValue = null
        }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [])

    if (state.current.prevValue !== value) {
        state.current.value = value
        state.current.key = Date.now()
    }

    const onInput = (event) => {
        let value = event.target.innerText

        if(!value.replace(/\s/g, '').length) {
            value = event.target.innerText = ''
        }

        state.current.prevValue = value
        onChange(value)
    }

    const onPaste = e => {
        e.preventDefault()
        const text = e.clipboardData.getData("text")
        document.execCommand("insertText", false, text)
    }

    const editableStyle = { ...style, position:'relative', zIndex: 1, cursor: 'text', minWidth: '100%' }

    const placeholderStyle = { ...style, position:'absolute', top:'0', left:'0', zIndex: 0, opacity: .3 }

    return (
        <div
            style={{position:'relative'}}
            ref={ref}
            className={`editable-wrapper ${!(value || '').trim() ? 'empty' : ''}`}
        >
            <div
                key={state.current.key}
                role="textbox"
                contentEditable={true}
                dangerouslySetInnerHTML={{ __html: state.current.value }}
                onInput={onInput}
                onPaste={onPaste}
                style={editableStyle}
                className={`editable ${className}`}
                {...rest}
            />
            {!value && <div children={placeholder} className={className} {...rest} style={placeholderStyle} />}
        </div>
    )
}