import { useState, useRef, useEffect } from 'react'
import { MdVpnKey, MdHandyman, MdSettings, MdCreate, MdList, MdInsights, MdMoreVert, MdTranslate } from 'react-icons/md'

import ModuleBrowser from './ModuleBrowser'
import PublishButton from './PublishButton'
import PageSettings from './PageSettings'
import { onClickOutside, goTo } from '/front/lib/helpers'
import HorisontalScroller from '/front/ui/HorisontalScroller'

import styles from '/front/styles/AdminBar/AdminBar.module.scss'
import globalStyles from '/front/styles/globalStyles'

import config from '/front.config'

export default function AdminBar () {

    const [ siteControllsVisible, setSiteControllsVisible ] = useState(false)

    const { user } = config.useUser()

    const siteControllsRef = useRef(null)

    useEffect(() => {
        const bodyClass = document.body.classList
        if(user && !bodyClass.contains('ft-admin-bar')) bodyClass.add('ft-admin-bar')
        if(!user && bodyClass.contains('ft-admin-bar')) bodyClass.remove('ft-admin-bar')
    }, [user])

    onClickOutside(siteControllsRef, () => {
        setSiteControllsVisible(false)
    })

    if(!user) return null

    return (
        <div className={[styles.wrapper].filter(c=>c).join(' ')}>

            <style global jsx>{globalStyles}</style>

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