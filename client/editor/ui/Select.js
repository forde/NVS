import { useState, useRef, useEffect } from 'react'
import { styled } from 'linaria/react'
import { MdCancel, MdArrowDropDown } from 'react-icons/md'

import { colors, shadow, shadowHover } from '/styles'
import { onClickOutside, isObject } from '/editor/lib/helpers'
import Label from './Label'

export default function Select ({
    value,
    placeholder,
    label,
    options, // array of objects ({name:'', value: ''}) OR strings
    onChange,
    small,
    multiple,
    disabled,
    invalid,
    searchable,
    className,
    ...rest
}) {

    const isEmpty = x => (!x || (Array.isArray(x) && !x.length)) ? true : false

    const [ optionsVisible, setOptionsVisible ] = useState(false)
    const [ searchQuery, setSearchQuery ] = useState('')

    const selectWrapperRef = useRef()
    const searchInputRef = useRef()

    useEffect(() => {
        if(optionsVisible && searchInputRef?.current) searchInputRef.current.focus()
        if(!optionsVisible) setSearchQuery('')
    }, [optionsVisible])

    const onSelect = option => {

        if(disabled) return

        if(multiple) {
            // dont add items that are already sellected
            if((value || []).some(val => JSON.stringify(val) === JSON.stringify(option))) return

            onChange([...(value || []), option])
        } else {
            onChange(isObject(option) ? option.value : option)
        }
        setOptionsVisible(false)
    }

    const removeFromSelected = (e, item) => {
        if(disabled) return
        e.stopPropagation()
        setOptionsVisible(false)
        onChange(value.filter(option => {
            if(isObject(option)) return option.value !== item.value
            return option !== item
        }))
    }

    const isSelected = option => {
        const val = isObject(option) ? option.value : option

        if(multiple) {
            return ~(value || []).map(option => isObject(option) ? option.value : option).indexOf(val)
        } else {
            return val === value
        }
    }

    const selectedValue = () => {

        if(searchable && optionsVisible) {
            return <input
                placeholder="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search"
                ref={searchInputRef}
            />
        }

        if(isEmpty(value) && placeholder) return placeholder

        if(Array.isArray(value) && multiple) {
            return value.map((item, i) => {
                return(
                    <div key={i} className="value-item">
                        <span>
                            {item.name || item.label || item}
                        </span>
                        <MdCancel className="empty" onClick={e => removeFromSelected(e, item)} />
                    </div>
                )
            })
        }

        return (options.map(o => typeof o === 'string' ? { name: o, value: o } : o).filter(o => o.value === value)[0] || {}).name
    }

    onClickOutside(selectWrapperRef, () => {
        setOptionsVisible(false)
    })

    const search = option => {
        const needle = searchQuery.trim().toLowerCase()
        const haystack = (isObject(option) ? `${option.value} ${option.name}` : option).toLowerCase()

        if(!needle) return true

        return ~haystack.indexOf(needle)
    }

    return (
        <>
            {label && <Label style={{marginBottom: '4px'}}>{label}</Label>}

            <Wrapper
                ref={selectWrapperRef}
                className={[
                    className,
                    invalid && 'invalid',
                    disabled && 'disabled',
                    small && 'small',
                    optionsVisible && 'options-visible'
                ].filter(c=>c).join(' ')}
                {...rest}
            >

                <div
                    className={[`select`, `value-${value}`, (!isEmpty(value) && multiple) ? 'multiple' : null].join(' ')}
                    value={value}
                    onClick={() => !disabled ? setOptionsVisible(!optionsVisible) : null}
                >
                    <MdArrowDropDown className="arrow-icon" fill={disabled ? colors.gray : null} />
                    {selectedValue()}
                </div>

                {optionsVisible &&
                    <div className="options">
                        {options && options.filter(search).map((option, i) => <div
                            key={i}
                            value={isObject(option) ? option.value : option}
                            className={['option', isSelected(option) ? 'selected' : null].join(' ')}
                            onClick={() => onSelect(option)}
                            >{isObject(option) ? option.name : option}</div>
                        )}
                    </div>
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    position:relative;
    min-width: 240px;
    max-width: 100%;
    display: inline-block;

    .select {
        min-height: 50px;
        border: 3px solid transparent;
        ${shadow};
        background: #fff;
        outline:none;
        border-radius: 10px;
        padding: 12px 34px 14px 16px;
        font-size: 18px;
        line-height: 1;
        color: ${colors.black};
        transition: border .2s ease-in-out, box-shadow .2s ease-in-out;
        position: relative;
        background-image: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        opacity: 1;
        @media(pointer: fine) { &:hover {
            box-shadow: none;
            border: 3px solid ${colors.black};
        }}

        .arrow-icon {
            position: absolute;
            top: 50%;
            z-index: 1;
            width:30px;
            height:30px;
            transform: translateY(-50%);
            right: 6px;
            pointer-events: none;
        }

        &.multiple {
            padding-left: 6px;
            padding-bottom: 0px;
            padding-top: 6px;
            flex-wrap:wrap;
        }

        .value-item {
            border-radius: 10px;
            padding: 2px 10px 2px 12px;
            margin: 0 6px 6px 0;
            height: 32px;
            border-radius: 10px;
            background: ${colors.lightGray};
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

        .search {
            padding:0;
            font-size:16px;
            line-height: 1;
            height:auto;
            border: 0;
            background: transparent;
        }
    }
    .options {
        position: absolute;
        top: calc(100% + 8px);
        width:100%;
        min-width:240px;
        left:0;
        z-index: 120;
        background: #fff;
        ${shadow};
        border-radius: 12px;
        transition:all .2s ease-in-out;
        max-height: 396px;
        overflow: auto;
        &:hover {
            @media(pointer: fine) {
                ${shadowHover};
            }
        }
        > .option {
            font-size: 17px;
            min-height: 36px;
            padding: 6px 16px 7px;
            cursor:pointer;
            transition:all .2s ease-in-out;
            text-align: left;
            &:hover {
                @media(pointer: fine) {
                    background: ${colors.lightGray};
                }
            }
            &.selected {
                color: ${colors.ui}!important;
            }
        }
    }

    &.invalid {
        .select{
            border: 3px solid ${colors.red};
            box-shadow: none;
        }
    }

    &.small {
        .select {
            min-height: 36px;
            padding: 3px 34px 5px 12px;
            font-size: 16px;
            &.multiple {
                padding-left: 4px;
                padding-top: 4px;
                padding-bottom: 0px;
            }
            .value-item {
                margin: 0 4px 4px 0;
                height: 24px;
                font-size: 14px;
            }
        }
    }

    &.disabled {
        .select {
            cursor: default;
            opacity: .6;
            @media(pointer: fine) { &:hover {
                ${shadow};
                border: 3px solid transparent;
            }}
        }
    }

    &.optionsVisible {
        .select {
            .arrow-icon {
                transform: translateY(-50%) rotate(180deg);
            }
        }
    }
`