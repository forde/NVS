import { memo } from 'react'

import editor from '/editor'
import RichText from '/editor/RichText'

export default memo(function Content ({ module, onChange }) {

    const { editMode, RichTextEditor } = editor()

    return(
        <div className="container mb-60">
            {editMode ?
                <RichTextEditor
                    content={module.content}
                    onChange={content => {
                        onChange(module._key, { content })
                        //console.log('===> Draft to Sanity. S:', content)
                    }}
                />
            :
                <RichText content={module?.content} />
            }
        </div>
    )
})