import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useUser } from '@auth0/nextjs-auth0'

export default function importer () {

    const { user } = useUser()

    const _ = _ => null

    return useMemo(() => ({
        editMode: user,
        RichTextEditor: !user ? _ : dynamic(() => import('./RichTextEditor'), { ssr: false }),
        Actions:        !user ? _ : dynamic(() => import('./Actions'),        { ssr: false }),
        Button:         !user ? _ : dynamic(() => import('./Button'),         { ssr: false }),
        Checkbox:       !user ? _ : dynamic(() => import('./Checkbox'),       { ssr: false }),
        ConfirmButton:  !user ? _ : dynamic(() => import('./ConfirmButton'),  { ssr: false }),
        Editable:       !user ? _ : dynamic(() => import('./Editable'),       { ssr: false }),
        Input:          !user ? _ : dynamic(() => import('./Input'),          { ssr: false }),
        Label:          !user ? _ : dynamic(() => import('./Label'),          { ssr: false }),
        LinkPicker:     !user ? _ : dynamic(() => import('./LinkPicker'),     { ssr: false }),
        Loader:         !user ? _ : dynamic(() => import('./Loader'),         { ssr: false }),
        MediaBrowser:   !user ? _ : dynamic(() => import('./MediaBrowser'),   { ssr: false }),
        Modal:          !user ? _ : dynamic(() => import('./Modal'),          { ssr: false }),
        OverlayLock:    !user ? _ : dynamic(() => import('./OverlayLock'),    { ssr: false }),
        Radio:          !user ? _ : dynamic(() => import('./Radio'),          { ssr: false }),
        Select:         !user ? _ : dynamic(() => import('./Select'),         { ssr: false }),
        Switch:         !user ? _ : dynamic(() => import('./Switch'),         { ssr: false }),
        Tabs:           !user ? _ : dynamic(() => import('./Tabs'),           { ssr: false }),
        Bars:           !user ? _ : dynamic(() => import('./Bars'),           { ssr: false }),
    }), [user])
}