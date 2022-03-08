import { useState, useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { styled } from 'linaria/react'
import { MdVpnKey, MdHandyman, MdSettings, MdCreate, MdList, MdInsights, MdWysiwyg, MdMoreVert, MdTranslate } from 'react-icons/md'

import { colors } from '~/styles'
import PageInfo from './PageInfo'
import ModuleBrowser from './ModuleBrowser'
import PublishButton from './PublishButton'
import PageSettings from './PageSettings'
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
                >
                    <div className="h-pad-10">
                        <MdMoreVert className="xl" />
                    </div>
                    {siteControllsVisible &&
                        <ul className="site-controlls">
                            <li onClick={() => goTo('/new')}><MdCreate/>New page</li>
                            <li><MdList/>Page list</li>
                            <li><MdVpnKey/>Users</li>
                            <li><MdHandyman/>Tools</li>
                            <li><MdTranslate/>Languages</li>
                            <li><MdInsights/>SEO</li>
                            <li><MdSettings/>Settings</li>
                        </ul>
                    }
                </li>
                <li><div><PageInfo /></div></li>
                <li><div><ModuleBrowser/></div></li>
                <li><div><PageSettings/></div></li>
                <ul className="right">
                    <li><PublishButton/></li>
                </ul>
            </ul>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: ${colors.black};
    height: 42px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    > ul {
        width: 100%;
        li {
            color: white;
        }
    }
    ul {
        display: flex;
        &.right {
            margin-left: auto;
        }
        li {
            height: 42px;
            display: flex;
            align-items: center;
        }
        li > div, li ul li {
            cursor: pointer;
            height: 42px;
            display: flex;
            align-items: center;
            -webkit-font-smoothing: antialiased;
            font-weight: 400;
            font-size: 16px;
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