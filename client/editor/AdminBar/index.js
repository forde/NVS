import { useState, useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { styled } from 'linaria/react'
import { MdVpnKey, MdHandyman, MdSettings, MdCreate, MdInsights, MdWysiwyg, MdMoreVert, MdTranslate } from 'react-icons/md'

import { colors } from '~/styles'
import PageInfo from './PageInfo'
import ModuleBrowser from './ModuleBrowser'
import PublishButton from './PublishButton'
import { onClickOutside, goTo } from '~/lib/helpers'

export default function AdminBar () {

    const [ siteControllsVisible, setSiteControllsVisible ] = useState(false)

    const { user } = useUser()

    const siteControllsRef = useRef(null)

    onClickOutside(siteControllsRef, () => {
        setSiteControllsVisible(false)
    })

    if(!user) return null

    return (
        <Wrapper>
            <ul>
                <li
                    onClick={() => setSiteControllsVisible(!siteControllsVisible)}
                    ref={siteControllsRef}
                    className="h-pad-10"
                >
                    <MdMoreVert className="xl" />
                    {siteControllsVisible &&
                        <ul className="site-controlls">
                            <li onClick={() => goTo('/new')}><MdCreate/>New page</li>
                            <li><MdVpnKey/>Users</li>
                            <li><MdHandyman/>Tools</li>
                            <li><MdTranslate/>Languages</li>
                            <li><MdInsights/>SEO</li>
                            <li><MdSettings/>Settings</li>
                        </ul>
                    }
                </li>
                <li><PageInfo /></li>
                <li><ModuleBrowser/></li>
                <li className="h-pad-10"><MdWysiwyg />Page settings</li>
                <ul className="right">
                    <li><PublishButton/></li>
                </ul>
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
    > ul {
        width: 100%;
    }
    ul {
        display: flex;
        &.right {
            margin-left: auto;
        }
        li {
            cursor: pointer;
            height: 42px;
            font-weight: 400;
            font-size: 16px;
            display: flex;
            align-items: center;
            > svg, .icon {
                margin-right: 6px;
                &.xl {
                    width:22px;
                    height: 22px;
                    margin: 0 0 -1px;
                }
            }
            @media (pointer: fine) { &:hover {
                background: rgba(255,255,255,.15);
            }}
            &.h-pad-10 {
                padding: 0 10px;
            }
        }
    }
    ul.site-controlls{
        background: ${colors.black};
        position: absolute;
        left: 0;
        bottom: 42px;
        flex-wrap: wrap;
        width:200px;
        li {
            width: 100%;
            padding: 0 10px;
        }
    }
`