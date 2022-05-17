import { useState, useRef } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { MdVpnKey, MdHandyman, MdSettings, MdCreate, MdList, MdInsights, MdMoreVert, MdTranslate } from 'react-icons/md'

import ModuleBrowser from './ModuleBrowser'
import PublishButton from './PublishButton'
import PageSettings from './PageSettings'
import { onClickOutside, goTo } from '/front/lib/helpers'
import HorisontalScroller from '/front/ui/HorisontalScroller'

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
            <HorisontalScroller WrapperTag="ul">
                <li
                    onClick={() => setSiteControllsVisible(!siteControllsVisible)}
                    ref={siteControllsRef}
                >
                    <div className={styles.dotToggle}>
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
                <li><PageSettings/></li>
                <li><ModuleBrowser/></li>
                <li style={{ marginLeft: 'auto'}}><PublishButton/></li>
            </HorisontalScroller>
        </div>
    )
}