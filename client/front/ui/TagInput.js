import { useState } from 'react'
import { MdCancel } from 'react-icons/md'

import Label from './Label'
import Button from './Button'

import styles from '/front/styles/ui/TagInput.module.scss'

export default function TagInput ({
    value,
    small,
    disabled,
    onChange,
    className,
    placeholder,
    label,
    style,
    ...rest
}) {

    const [ newItem, setNewItem ] = useState('')
    const [ focused, setFocused ] = useState(false)

    const addItem = () => {
        onChange([ ...value, newItem.trim() ])
        setNewItem('')
    }

    const removeItem = (e, item) => {
        if(disabled) return
        e.stopPropagation()
        onChange(value.filter(option => option !== item))
    }

    return(
        <>
            {label && <Label style={{marginBottom: '4px'}}>{label}</Label>}
            <div
                style={style}
                className={[
                    className,
                    styles.wrapper,
                    small && styles.small,
                    disabled && styles.disabled,
                    focused && styles.focused,
                ].filter(c=>c).join(' ')}
            >


                {(value || []).map((item, i) => (
                    <div key={i} className={[
                        styles.valueItem,
                        small && styles.smallValueItem,
                    ].filter(c=>c).join(' ')}>
                        <span> {item}</span>
                        <MdCancel onClick={e => removeItem(e, item)} />
                    </div>
                ))}

                <div className={[
                        styles.newItem,
                        small && styles.smallNewItem
                    ].filter(c=>c).join(' ')}>
                    {!disabled && <input
                        type={'text'}
                        value={newItem}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        onChange={e => setNewItem(e.target.value)}
                        {...rest}
                    />}
                    {newItem && <Button
                        onClick={addItem}
                        secondary
                        small
                        children="Add item"
                    />}
                </div>

            </div>
        </>
    )
}