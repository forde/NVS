import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'

import { goTo } from '~/lib/helpers'
import editor from '~/editor'

export default function Layout({ style={}, children }) {

    const { editMode, ..._ } = editor()

    return (
        <>
            <div style={{ flex: 1, ...style }}>
                <Header/>
                {children}
                {editMode && <_.Actions
                    fixed
                    offset="30"
                    align="left"
                    onAddPage={() => goTo('/new')}
                    onPreview={_=>null}
                />}
            </div>
            <Footer/>
        </>
    )
}