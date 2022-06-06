import { useState, useRef } from 'react'

import styles from '/front/styles/ui/ColorPicker.module.scss'

import { onClickOutside } from '/front/lib/helpers'
import Input from './Input'

export default function ColorPicker ({
    colors=['red','green','blue'],
    value='',
    onChange=val=>null,
    style,
    className,
    medium,
    small,
    allowCustomColors=true
}) {

    const wrapperRef = useRef(null)

    const [ colorOptionsVisible, setColorOptionsVisible ] = useState(true)

    onClickOutside(wrapperRef, () => {
        setColorOptionsVisible(false)
    })

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
                        onClick={_ => onChange(c)}
                    />)}
                </div>
            }
        </div>
    )
}