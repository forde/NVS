import { useState, useRef, useEffect } from 'react'
import { MdCancel, MdArrowDropDown } from 'react-icons/md'

import { onClickOutside, isObject } from '/front/lib/helpers'
import Label from './Label'

import styles from '/front/styles/ui/Select.module.scss'

import { colors } from '/front/styles'

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
                className={styles.search}
                ref={searchInputRef}
            />
        }

        if(isEmpty(value) && placeholder) return placeholder

        if(Array.isArray(value) && multiple) {
            return value.map((item, i) => {
                return(
                    <div key={i} className={[
                        styles.valueItem,
                        small && styles.smallValueItem,
                        optionsVisible && styles.optionsVisibleValueItem,
                    ].filter(c=>c).join(' ')}>
                        <span>
                            {item.name || item.label || item}
                        </span>
                        <MdCancel className={styles.empty} onClick={e => removeFromSelected(e, item)} />
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

            <div
                ref={selectWrapperRef}
                className={[
                    className,
                    styles.wrapper,
                ].filter(c=>c).join(' ')}
                {...rest}
            >
                <div
                    className={[
                        styles.select,
                        (!isEmpty(value) && multiple) && styles.multiple,
                        invalid && styles.invalid,
                        disabled && styles.disabled,
                        small && styles.small,
                        optionsVisible && styles.optionsVisible,
                        small && multiple && styles.smallMultiple
                    ].filter(c=>c).join(' ')}
                    value={value}
                    onClick={() => !disabled ? setOptionsVisible(!optionsVisible) : null}
                >
                    <MdArrowDropDown fill={colors.uiWhite} />
                    {selectedValue()}
                </div>

                {optionsVisible &&
                    <div className={styles.options}>
                        {options && options.filter(search).map((option, i) => <div
                            key={i}
                            value={isObject(option) ? option.value : option}
                            className={[
                                isSelected(option) && styles.selected
                            ].filter(c=>c).join(' ')}
                            onClick={() => onSelect(option)}
                            >{isObject(option) ? option.name : option}</div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}