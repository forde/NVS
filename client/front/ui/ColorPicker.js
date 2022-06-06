import { useState, useRef, useEffect } from 'react'

import styles from '/front/styles/ui/ColorPicker.module.scss'

import { onClickOutside } from '/front/lib/helpers'
import Input from './Input'

import config from '/front.config'

export default function ColorPicker ({
    colors = config?.ui?.ColorPicker?.options || ['red','green','blue'],
    value = '',
    onChange = val=>null,
    style,
    className,
    medium,
    small,
    allowCustomColors = false
}) {

    const wrapperRef = useRef(null)

    const [ colorOptionsVisible, setColorOptionsVisible ] = useState(false)

    onClickOutside(wrapperRef, () => {
        setColorOptionsVisible(false)
    })

    useEffect(() => {
        const inputEl = wrapperRef.current.querySelector('input')
        colorOptionsVisible ? inputEl?.focus() : inputEl?.blur()
    }, [colorOptionsVisible])

    return (
        <div ref={wrapperRef} style={style} className={[
            className,
            styles.wrapper,
            medium && styles.medium,
            small && styles.small
        ].filter(c=>c).join(' ')}>
            <Input
                placeholder="#"
                value={value}
                onChange={onChange}
                medium={medium}
                small={small}
                readOnly={!allowCustomColors}
            />
            <div
                className={styles.color}
                style={{ backgroundColor: value || 'tranmsparent' }}
                onClick={() => setColorOptionsVisible(!colorOptionsVisible)}
            />
            {colorOptionsVisible &&
                <div>
                    {(colors || []).map((c,i) => <div
                        key={i}
                        className="ft-square"
                        style={{ backgroundColor: c || 'tranmsparent' }}
                        onClick={_ => {
                            onChange(c)
                            setColorOptionsVisible(false)
                        }}
                    />)}
                </div>
            }
        </div>
    )
}