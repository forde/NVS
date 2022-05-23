import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { MdLink } from 'react-icons/md'
import { EditorState, Modifier } from 'draft-js'

import LinkPicker from './../LinkPicker'

export default function LinkButton ({ onChange, currentState, editorState }) {

    const defaultLinkPickerData = {
        title: '', url: '', target: '_self', type: '', id: ''
    }

    const [ linkPickerVisible, setLinkPickerVisible ] = useState(false)
    const [ linkPickerData, setLinkPickerData ] = useState(defaultLinkPickerData)

    const initializeLinkPicker = e => {
        e.preventDefault()
        e.stopPropagation()

        const selectionState = editorState.getSelection()
        const anchorKey = selectionState.getAnchorKey()
        const currentContent = editorState.getCurrentContent()
        const currentContentBlock = currentContent.getBlockForKey(anchorKey)
        const start = selectionState.getStartOffset()
        const end = selectionState.getEndOffset()
        const selectedText = currentContentBlock.getText().slice(start, end)

        if(selectedText) {
            const contentState = editorState.getCurrentContent()
            const startKey = selectionState.getStartKey()
            const startOffset = selectionState.getStartOffset()
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
            if(linkKey) {
                const linkInstance = contentState.getEntity(linkKey)
                const linkInstanceData = linkInstance.getData()
                setLinkPickerData({...defaultLinkPickerData, ...linkInstanceData})
            } else {
                setLinkPickerData({...defaultLinkPickerData, title: selectedText})
            }
        } else {
            setLinkPickerData(defaultLinkPickerData)
        }

        setLinkPickerVisible(true)
    }

    const InsertLink = ({ title, url, target, type, id }) => {

        const currentContent = editorState.getCurrentContent()

        currentContent.createEntity('LINK', 'MUTABLE', {
            title, url, target, type, id
        })

        const entityKey = currentContent.getLastCreatedEntityKey()
        const selection = editorState.getSelection()

        const textWithEntity = Modifier.replaceText(
            currentContent,
            selection,
            title,
            editorState.getCurrentInlineStyle(),
            entityKey
        )

        const newState = EditorState.createWithContent(textWithEntity)

        onChange(newState)

        setLinkPickerVisible(false)
        setLinkPickerData(defaultLinkPickerData)
    }

    return (
        <>
            <div className="rdw-option-wrapper" onClick={initializeLinkPicker}>
                <MdLink style={{width:'16px',height:'16px'}}/>
            </div>
            {linkPickerVisible &&
                <LinkPicker
                    {...linkPickerData}
                    onClose={() => setLinkPickerVisible(false)}
                    onLink={InsertLink}
                />
            }
        </>
    )
}