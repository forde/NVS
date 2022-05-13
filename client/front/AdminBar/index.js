import { useState, useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { MdVpnKey, MdHandyman, MdSettings, MdCreate, MdList, MdInsights, MdMoreVert, MdTranslate } from 'react-icons/md'

import PageInfo from './PageInfo'
import ModuleBrowser from './ModuleBrowser'
import PublishButton from './PublishButton'
import PageSettings from './PageSettings'
import { onClickOutside, goTo } from '/front/lib/helpers'

import styles from '/front/styles/AdminBar/AdminBar.module.scss'

export default function AdminBar () {

    const [ siteControllsVisible, setSiteControllsVisible ] = useState(false)

    const { user } = useUser()

    const siteControllsRef = useRef(null)

    onClickOutside(siteControllsRef, () => {
        setSiteControllsVisible(false)
    })

    if(!user) return null

    return (
        <div className={styles.wrapper}>
            <ul>
                <li
                    onClick={() => setSiteControllsVisible(!siteControllsVisible)}
                    ref={siteControllsRef}
                >
                    <div className={styles.submenuToggle}>
                        <MdMoreVert />
                    </div>
                    {siteControllsVisible &&
                        <ul className={styles.submenu}>
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
            </ul>
            <div className={styles.right}>
                <ul>
                    <li><PublishButton/></li>
                </ul>
            </div>
        </div>
    )
}