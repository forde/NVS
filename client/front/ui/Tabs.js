import { styled } from 'linaria/react'

import Button from './Button'
import { colors } from '/styles'

export default function Tabs ({ tabs=[], active='', onChange, ...rest }) {

    return(
        <Wrapper {...rest}>
            {tabs.map((tab,i) => <Button
                key={i}
                tertiary
                small
                className={tab.value === active ? 'active' : null}
                onClick={() => onChange(tab.value)}
            >{tab.name}</Button>)}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-left: 3px;
    button {
        border-radius: 0;
        margin-left:-3px;
        transition: none;
        &:first-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        &:last-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        @media(pointer: fine) { &:hover {
            border-color: ${colors.gray}!important;
            z-index: 10!important;
        }}
        &.active {
            border-color: ${colors.black}!important;
            position: relative;
            z-index: 20!important;
        }
    }
`