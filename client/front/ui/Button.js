import { css } from 'linaria'
import { darken } from 'polished'
import { styled } from 'linaria/react'
// test = css`color: tomato;` => classname={test}
//const H1 = styled.h1`color: tomato;` => <H1>...</H1>

import { fonts, colors } from '/styles'
import Loader from './Loader'

export default function Button ({
    children,
    small,
    medium,
    sharp,
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
                medium && 'medium',
                secondary && 'secondary',
                tertiary && 'tertiary',
                sharp && 'sharp',
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
                        <Icon style={{transform: `scale(${small ? 1.2 : 1.4})`, marginRight: '6px'}}/>
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
    background: ${colors.primary};
    border: 3px solid transparent;
    height: 50px;
    min-height: 50px;
    font-size: 18px;
    padding: ${props => props.padding};
    @supports (-moz-appearance:none) { padding: ${props => props.padding}; }
    @media(pointer: fine) { &:hover, &:active {

    }}

    &.secondary {
        background: #404040;//${colors.black};
        color: #EAEBEB;
        @media(pointer: fine) { &:hover, &:active {
            background: #5D5E5E;//#373737;
        }}
    }

    &.tertiary {
        color: ${colors.black};
        border-color: ${colors.gray};
        background: #fff;
        @media(pointer: fine) { &:hover {
            border-color: ${colors.black};
            z-index: 20;
        }}
    }

    &.medium {
        height: 36px;
        min-height: 36px;
        font-size: 16px;
    }

    &.small {
        height: 28px;
        min-height: 28px;
        font-size: 15px;
        line-height: 1;
        border-radius: 6px;
    }

    &.sharp {
        border-radius: 0;
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