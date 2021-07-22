import { css } from 'linaria'
import { darken } from 'polished'
import { styled } from 'linaria/react'
// test = css`color: tomato;` => classname={test}
//const H1 = styled.h1`color: tomato;` => <H1>...</H1>

import { fonts, colors } from './../../styles'
import Loader from './Loader'

export default function Button ({
    children,
    small,
    secondary,
    tertiary,
    disabled,
    width,
    busy,
    icon: Icon,
    onClick,
    className,
    ...rest
}) {

    return(
        <ButtonComponent
            width={width}
            padding={(Icon && !children && small) ? '0 8px' : '0 16px'}
            onClick={e => (!onClick || disabled || busy) ? null : onClick(e)}
            className={[
                className,
                small && 'small',
                secondary && 'secondary',
                tertiary && 'tertiary',
                (disabled || busy) && 'disabled',
            ].filter(c=>c).join(' ')}
            {...rest}
        >

            {(() => {
                if(busy) return <Loader
                    color={tertiary ? 'black' : 'white'}
                    style={{ transform: `scale(${small ? .8 : 1})`}}
                />
                if(Icon && !children) {
                    return <Icon style={{transform: `scale(${small ? 1.2 : 1.4})`}}/>
                }
                if(Icon && children) {
                    return <>
                        <Icon style={{transform: `scale(${small ? 1.2 : 1.4})`, marginRight: '8px'}}/>
                        {children}
                    </>
                }
                return children
            })()}
        </ButtonComponent>
    )
}

const ButtonComponent = styled.button`
    padding:0;
    outline: 0;
    box-shadow: none;
    background: transparent;
    line-height: 1;
    cursor: pointer;
    opacity: 1;
    position: relative;
    display: inline-flex;
    border-radius: 10px;
    font-family: ${fonts.main};
    text-align:center;
    align-items: center;
    justify-content:center;
    width: ${props => props.width ? `${props.width}` : `auto`};
    white-space: nowrap;
    transition: all .2s ease-in-out;
    line-height: 1;
    color: #fff;
    background: ${colors.ui};
    border: 3px solid transparent;
    height: 50px;
    min-height: 50px;
    font-size: 18px;
    padding: ${props => props.padding};
    @supports (-moz-appearance:none) { padding: ${props => props.padding}; }
    @media(pointer: fine) { &:hover, &:active {

    }}

    &.secondary {
        background: ${colors.black};
    }

    &.tertiary {
        color: ${colors.black};
        border-color: ${colors.gray};
        background: #fff;
        &:hover {
            border-color: ${colors.ui};
            z-index: 20;
        }
    }

    &.small {
        height: 36px;
        min-height: 36px;
        font-size: 16px;
    }

    &.disabled {
        cursor: default;
        pointer-events: none;
        opacity: .6;
    }

    .badge {
        position: absolute;
        top:-10px;
        right:-10px;
        background: ${colors.red};
        color: white;
        width: 20px;
        height:20px;
        border-radius: 20px;
        font-size: 12px;
        line-height: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 2px;
    }
`