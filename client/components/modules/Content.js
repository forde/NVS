import { memo } from 'react'

import editor from '~/editor'

//import PortableTextEditor from '@sanity/portable-text-editor'

export default memo(function RichText ({ module, onChange }) {

    const { editMode, RichTextEditor } = editor()

    return(
        <div className="container mb-60">
            <RichTextEditor
                onChange={state => {
                    console.log(state);
                }}
            />
        </div>
    )
})