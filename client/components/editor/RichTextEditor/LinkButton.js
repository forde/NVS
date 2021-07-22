import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { MdLink } from 'react-icons/md'

import LinkPicker from './../LinkPicker'

export default function LinkButton ({ onChange, currentState }) {

    const [ linkPickerVisible, setLinkPickerVisible ] = useState(false)

    const InsertLink = ({ title, url, target }) => {
        onChange('link', title, url, target)
        setLinkPickerVisible(false)
    }

    return (
        <>
            <div className="rdw-option-wrapper" onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setLinkPickerVisible(true)
            }}>
                <MdLink style={{width:'16px',height:'16px'}}/>
            </div>
            {linkPickerVisible &&
                <LinkPicker
                    url={currentState?.link?.target}
                    title={currentState?.link?.title || currentState?.selectionText}
                    target={currentState?.link?.targetOption}
                    onClose={() => setLinkPickerVisible(false)}
                    onLink={InsertLink}
                />
            }
        </>
    )
}