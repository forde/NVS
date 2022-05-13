import { useState, memo } from 'react'
import { EditorState, AtomicBlockUtils } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { styled } from 'linaria/react'
import { MdImage, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight } from 'react-icons/md'

import MediaBrowser from './../MediaBrowser'
import Button from './../Button'
import { imageUrl } from '/front/lib/helpers'

export default function ImageButton ({ editorState, onChange }) {

    const [ mediaBrowser, setMediaBrowser ] = useState(false)

    const insertImage = image => {

        setMediaBrowser(false)

        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity('_IMAGE', 'MUTABLE', {
            src: imageUrl(image)/*.width(image.preferredWidth || 800)*/.auto('format').url(),
            alt: image.alt,
            title: image.title,
            align: 'left',
        })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const _newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(_newEditorState, entityKey, ' ')

        onChange(newEditorState)
    }

    return (
        <>
            <div className="rdw-option-wrapper" onClick={() => setMediaBrowser(true)}>
                <MdImage style={{width:'16px',height:'16px'}}/>
            </div>
            {mediaBrowser && <MediaBrowser
                onClose={() => setMediaBrowser(false)}
                image={null}
                withSizeSettings
                onUse={insertImage}
            />}
        </>
    )
}

export const ImageBlock = memo(({ data, ...rest }) => {

    const changeAlignment = (e, dir) => {
        document.activeElement.blur()
        e.preventDefault()
        e.stopPropagation()
        const { block, contentState } = rest
        const entityKey = block.getEntityAt(0)
        contentState.mergeEntityData(entityKey, { align: dir })
    }

    return(
        <Wrapper className={`align-${data.align}`}>
            <div className="inner">
                <img
                    src={data.src}
                    alt={data.alt}
                    title={data.title}
                />
                <div className="controlls">
                    <Button tertiary small icon={MdFormatAlignLeft} onMouseDown={e => changeAlignment(e, 'left')} />
                    <Button tertiary small icon={MdFormatAlignCenter} onMouseDown={e => changeAlignment(e, 'center')} />
                    <Button tertiary small icon={MdFormatAlignRight} onMouseDown={e => changeAlignment(e, 'right')} />
                </div>
            </div>
        </Wrapper>
    )
})

const Wrapper = styled.div`
    position: relative;
    display: flex;
    .inner {
        position: relative;
        .controlls {
            position: absolute;
            visibility: hidden;
            opacity: 0;
            transition: all .2s ease-in-out;
            top: 8px;
            left: 8px;
            z-index: 10;
            button {
                margin-right: 8px;
            }
        }
        &:hover .controlls {
            visibility: visible;
            opacity: 1;
        }
    }
    &.align-left {
        justify-content: flex-start;
    }
    &.align-center {
        justify-content: center;
    }
    &.align-right {
        justify-content: flex-end;
    }
`