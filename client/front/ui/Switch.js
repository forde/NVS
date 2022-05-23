import React from 'react'
import { styled } from 'linaria/react'

import { colors } from '/styles'

export default function Switch ({ on, style, onChange }) {
    return(
        <Wrapper
            className={`switch ${on ? 'on' : ''}`}
            style={style}
            onClick={() => onChange(!on)}
        />
    )
}

const Wrapper = styled.div`
    display: inline-block;
    background: #404040;
    border-radius: 26px;
    height:26px;
    position: relative;
    width: 58px;
    cursor:pointer;
    transition: all .2s ease-in-out;
    @media(max-width: 767px) {
        border-radius: 24px;
        height:26px;
        width: 48px;
    }

    &:after {
        content: '';
        display:block;
        width:14px;
        height:14px;
        position:absolute;
        top: 6px;
        left: 6px;
        background: #fff;
        border-radius: 14px;
        transition: all .2s ease-in-out;
    }

    &.on {
        background: ${colors.primary};
        box-shadow: none;
        &:after {
            left: 38px;
            @media(max-width: 767px) {
                left:28px;
            }
        }
    }
`

