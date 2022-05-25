import { memo } from 'react'

import ui from '/front/ui'
import RichText from '/front/presentation/RichText'

export default memo(function Content ({ module, onChange }) {

    const { editMode, RichTextEditor } = ui()

    return(
        <div className="container ft-mb-60">
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