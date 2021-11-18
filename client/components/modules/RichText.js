import { memo } from 'react'

import editor from '~/editor'

export default memo(function RichText ({ module, onChange }) {

    const { editMode, RichTextEditor } = editor()

    return(
        <div className="container mb-60">
            <RichTextEditor

            />
        </div>
    )
})