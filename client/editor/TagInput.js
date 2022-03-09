import { useState } from 'react'
import { styled } from 'linaria/react'
import { MdCancel } from 'react-icons/md'

import { shadow, colors } from '~/styles'
import Label from './Label'
import Button from './Button'

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
            <InputWrapper
                style={style}
                className={[
                    className,
                    small && 'small',
                    disabled && 'disabled',
                    focused && 'focused',
                ].filter(c=>c).join(' ')}
            >


                {(value || []).map((item, i) => (
                    <div key={i} className="value-item">
                        <span> {item}</span>
                        <MdCancel className="empty" onClick={e => removeItem(e, item)} />
                    </div>
                ))}

                <div className="new-item">
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
                        className="add-item-btn"
                        secondary
                        small
                        children="Add item"
                    />}
                </div>

            </InputWrapper>
        </>
    )
}

const InputWrapper = styled.div`
    min-height: 50px;
    font-size: 18px;
    width: 100%;
    outline: none;
    line-height:1;
    padding: 6px 6px 0;
    box-shadow: none;
    border: 3px solid transparent;
    border-radius: 10px;
    transition: all .2s ease-in-out;
    -webkit-font-smoothing: antialiased;
    ${shadow};
    display: flex;
    flex-wrap: wrap;

    .value-item {
        padding: 2px 10px 2px 12px;
        margin: 0 6px 6px 0;
        height: 32px;
        border-radius: 8px;
        background: ${colors.lightGray};
        color: ${colors.black};
        font-size: 16px;
        line-height:1;
        display: inline-flex;
        align-items: center;
        span {
            position:relative;
            top:-1px;
        }
        .empty {
            cursor:pointer;
            margin-left: 8px;
            &:hover {
                @media(pointer: fine) {
                    path:last-child {
                        fill: ${colors.red};
                    }
                }
            }
        }
    }

    .new-item{
        display: flex;
        height: 32px;
        margin-bottom: 6px;
        flex: 1;
        input {
            height: 32px;
            min-height: 32px;
            max-height: 32px;
            min-width: 120px;
            width: 120px;
            font-size: 17px;
            flex: 1;
            outline: none;
            line-height:1;
            padding: 0;
            box-shadow: none;
            border: none;
            background: transparent;
            margin-right: 6px;
            &::placeholder {
                color: ${colors.darkGray};
                opacity: 1;
            }
            &:read-only { opacity: .6; }
            &:focus {

            }
            &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill, &:-webkit-autofill-strong-password, &:-webkit-autofill-strong-password-viewable {
                box-shadow: 0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06), 0 0 0 50px white inset!important;
                background-image:-webkit-linear-gradient(hsla(0,0%,100%,0), hsla(0,0%,100%,0))!important;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }
        .add-item-btn {
            height: 32px;
            min-height: 32px;
            border-radius: 8px;
        }
    }

    &.focused {
        border: 3px solid ${colors.black};
        box-shadow: none;
    }

    &.small {
        font-size: 16px;
        min-height: 36px;
        padding: 4px 4px 0;
        .value-item {
            margin: 0 4px 4px 0;
            height: 24px;
            font-size: 14px;
        }
        .new-item{
            height: 24px;
            margin-bottom: 4px;
            input {
                font-size: 16px;
                height: 24px;
                min-height: 24px;
            }
            .add-item-btn {
                height: 24px;
                min-height: 24px;
                font-size: 14px;
            }
        }
    }

    &.disabled {
        opacity: .6;
        pointer-events: none;
    }
`