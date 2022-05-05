import { memo } from 'react'

import editor from '/editor'
import draftToBlockContent from '/editor/RichTextEditor/converters/draftToBlockContent'


export default memo(function RichText ({ module, onChange }) {

    const { editMode, RichTextEditor } = editor()

    return(
        <div className="container mb-60">
            <RichTextEditor
                content={module.content}
                onChange={state => {
                    onChange(module._key, { content: draftToBlockContent(state) })
                    //console.log('===> Draft to Sanity. D:', state, ' S: ', module.content,' Res: ',draftToBlockContent(state))
                }}
            />
        </div>
    )
})