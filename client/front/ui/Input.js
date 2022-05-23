import { styled } from 'linaria/react'

import { shadow, colors } from '/styles'
import Label from './Label'

export default function Input ({
    value,
    type,
    small,
    medium,
    disabled,
    icon: Icon,
    onChange,
    className,
    placeholder,
    label,
    multiline,
    suffix,
    style,
    ...rest
}) {

    const InputTag = multiline ? 'textarea' : 'input'

    return(
        <>
            {label && <Label style={{marginBottom: '4px'}}>{label}</Label>}
            <InputWrapper
                style={style}
                className={[
                    className,
                    small && 'small',
                    medium && 'medium',
                    disabled && 'disabled',
                    Icon && 'with-icon'
                ].filter(c=>c).join(' ')}
            >
                <InputTag
                    type={type || 'text'}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    {...rest}
                />

                {suffix && <span className="suffix">{suffix}</span>}

                {Icon && <Icon className="icon" />}

            </InputWrapper>
        </>
    )
}

const InputWrapper = styled.div`
    input, textarea {
        height: 50px;
        min-height: 50px;
        font-size: 18px;
        width: 100%;
        outline: none;
        line-height:1;
        padding: 0 16px 2px;
        box-shadow: none;
        border: 3px solid transparent;
        border-radius: 10px;
        transition: all .2s ease-in-out;
        -webkit-font-smoothing: antialiased;
        background-color: #404040;
        color: #EAEBEB;
        ${shadow};
        &::placeholder {
            color: ${colors.darkGray};
            opacity: 1;
        }
        &:read-only { opacity: .6; }
        &:focus {
            //border: 3px solid ${colors.black};
            box-shadow: none;
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

    input[type=number] {
        -moz-appearance: textfield;
    }

    textarea {
        min-height: 100px;
        padding-top: 12px;
        padding-bottom: 12px;
    }

    &.with-icon {
        input, textarea {
            padding-left: 42px;
        }
        .icon {
            position: absolute;
            width:28px;
            height:28px;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
        }
    }

    &.medium {
        input, textarea {
            padding: 0 10px 2px;
            height: 36px;
            min-height: 36px;
            font-size: 16px;
            border-radius: 8px;
            &:focus {
                background: #5D5E5E;
            }
        }
        textarea {
            min-height: 100px;
            padding-top: 6px;
            padding-bottom: 6px;
        }
        &.with-icon {
            input, textarea {
                padding-left: 30px;
            }
            .icon {
                width:20px;
                height:20px;
                left: 8px;
            }
        }
    }

    &.small {
        input, textarea {
            padding: 2px 8px 0;
            height: 28px;
            min-height: 28px;
            font-size: 15px;
            line-height: 1;
            border-radius: 6px;
            box-shadow: none;
            background: #404040;
            color: #EAEBEB;
            &:focus {
                background: #5D5E5E;
            }
        }
        input {
            padding-bottom: 2px;
        }
        textarea {
            min-height: 100px;
            padding-top: 6px;
            padding-bottom: 6px;
        }
        &.with-icon {
            input, textarea {
                padding-left: 30px;
            }
            .icon {
                width:20px;
                height:20px;
                left: 8px;
            }
        }
    }

    &.disabled {
        opacity: .6;
        pointer-events: none;
        input, textarea {

        }
    }

    .suffix {
        position: absolute;
        top: 50%;
        right: 10px;
        color: ${colors.black};
        font-size:16px;
        line-height: 1;
        transform: translateY(-50%);
        -webkit-font-smoothing: antialiased;
    }

`