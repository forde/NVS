import { useState } from 'react'
import { EditorState, AtomicBlockUtils } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { styled } from 'linaria/react'
import { MdPlayCircleFilled } from 'react-icons/md'

import Button from './../Button'
import Input from './../Input'
import Modal from '~/components/Modal'

export default function LinkButton ({ editorState, onChange }) {

    const [ embedPopupVisible, setEmbedPopupVisible ] = useState(false)
    const [ url, setUrl ] = useState('')

    const InsertVideo = () => {

        const contentState = editorState.getCurrentContent()
        const contentStateWithEntity = contentState.createEntity('_VIDEO', 'MUTABLE', {
            url: url,
        })
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
        const _newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(_newEditorState, entityKey, ' ')

        onChange(newEditorState)

        setUrl('')
        setEmbedPopupVisible(false)
    }

    return (
        <>
            <div className="rdw-option-wrapper" onClick={() => setEmbedPopupVisible(true)}>
                <MdPlayCircleFilled style={{width:'16px',height:'16px'}}/>
            </div>
            {embedPopupVisible &&
                <Modal
                    className="modal"
                    onClose={() => setEmbedPopupVisible(false)}
                    width="500px"
                >
                    <h3>Insert video</h3>
                    <Input placeholder="Video URL" value={url} onChange={setUrl} className="mb-24"/>
                    <Button small onClick={InsertVideo} >Insert video</Button>
                </Modal>
            }
        </>
    )
}

export const VideoBlock = ({ data }) => {

    return(
        <Wrapper>
            <iframe
                width="853"
                height="480"
                src={data.url.replace("watch?v=","embed/").replace("/watch/", "/embed/").replace("youtu.be/","youtube.com/embed/")}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded video"
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
    iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
    }
`