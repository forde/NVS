import { useUser } from '@auth0/nextjs-auth0'
import { styled } from 'linaria/react'
import { MdArrowBack, MdOutlineAddBox, MdSettings } from 'react-icons/md'

import { colors } from '~/styles'
import PageInfo from './PageInfo'

export default function AdminBar () {

    const { user } = useUser()

    if(!user) return null

    return (
        <Wrapper>
            <ul>
                <li className="back"><MdArrowBack /></li>
                <PageInfo />
                <li><MdOutlineAddBox />Add module</li>
                <li><MdSettings />Page settings</li>
            </ul>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: ${colors.black};
    color: white;
    height: 42px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    ul {
        display: flex;
        li {
            cursor: pointer;
            height: 42px;
            font-weight: 400;
            font-size: 16px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            svg {
                margin-right: 6px;
            }
            @media (pointer: fine) { &:hover {
                background: rgba(255,255,255,.15);
            }}
            &.back {
                background: rgba(255,255,255,.15);
                svg {
                    width:22px;
                    height: 22px;
                    margin: 0 0 -1px;
                }
            }
        }
    }
`