import React from 'react'
import { styled } from 'linaria/react'
import shortid from 'shortid'

import { colors } from '~/styles'

const Checkmark = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" >
    <polygon fill="#1F1A22" points="6.05975342 9.93658447 10.0007629 13.8756714 17.9388733 5.93614197 20.0621185 8.05975342 10.0007629 18.1184998 3.93916321 12.0574646"></polygon>
</svg>

export default function Radio ({
    type='radio',
    className,
    name,
    onChange,
    value,
    checked,
    label,
    description,
    style,
    disabled,
    zIndex
}) {

    const id = type+'-'+shortid()

    return (
        <Wrapper className={[
            `radio-button`,
            `type-${type || 'radio'}`,
            checked && `checked`,
            disabled && `disabled`,
            className
        ].filter(c=>c).join(' ')} style={style} zIndex={zIndex}>
            <input
                type={type || 'radio'}
                id={id}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
                checked={checked}
                disabled={disabled}
            />
            <label htmlFor={id}>
                <i className={`icon ${type} ${checked ? 'checked' : ''}`}>
                    {type === 'checkbox' && <Checkmark/>}
                </i>
                <div>
                    <div className="label">{label}</div>
                    {description && <div className="description">{description}</div>}
                </div>
            </label>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    min-height:28px;
    position: relative;
    z-index: ${props => props.zIndex ? `${props.zIndex};` : `1`};
    input {
        position:absolute;
        z-index:-1;
        opacity: 0;
        visibility: hidden;
        -webkit-appearance: none;
    }
    label {
        cursor: pointer;
        display:flex;
        align-items: center;
        width: 100%;
        position:relative;
        .icon {
            width: 28px;
            min-width: 28px;
            margin-right: 8px;
            height: 28px;
            border: 3px solid ${colors.gray};
            border-radius: 32px;
            position: relative;
            transition: all .1s ease-in-out;
            &.radio {
                &:before {
                    content: '';
                    width: 14px;
                    height: 14px;
                    border-radius: 14px;
                    background: ${colors.ui};
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transition: all .2s ease-in-out;
                    transform: translateY(-50%) translateX(-50%);
                    opacity: 0;
                }
                &.checked:before {
                    opacity: 1;
                }
            }
            &.checkbox {
                border-radius: 6px;
                svg {
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateY(-50%) translateX(-50%);
                    transition: all .2s ease-in-out;
                    polygon {
                        fill: ${colors.ui};
                    }
                    opacity: 0;
                }
                &.checked svg {
                    opacity: 1;
                }
            }
        }
        > div {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
            @media(max-width: 767px) {
                padding-right:26px;
            }
            .label {
                font-size: 18px;
                display: block;
                line-height: 1;
            }
            .description {
                font-size: 16px;
                line-height: 1;
                padding-top: 6px;
                color: ${colors.darkGray};
            }

        }
        &:hover {

        }
    }

    input:checked + label .icon {
        border-color: ${colors.ui};
    }

    input:disabled + label {
        opacity: .6;
        pointer-events: none;
    }
`