import { useState } from 'react'
import { EditorState, convertFromRaw, convertToRaw, AtomicBlockUtils } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
import { styled } from 'linaria/react'
import { MdImage } from 'react-icons/md'

import MediaBrowser from '~/components/form/MediaBrowser'
import { colors } from '~/styles'
import { imageUrl } from '~/lib/helpers'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

const ImageButton = ({ editorState, onChange }) => {

    const [ mediaBrowser, setMediaBrowser ] = useState(false)

    const insertImage = image => {

        setMediaBrowser(false)

        const entityData = {
            src: imageUrl(image).width(image.preferredWidth || 800).auto('format').url(),
            //height: '',
            //width: '',
            alt: image.alt,
            title: image.title,
        }

        const entityKey = editorState
            .getCurrentContent()
            .createEntity('IMAGE', 'MUTABLE', entityData)
            .getLastCreatedEntityKey()

        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            ' '
        )
        onChange(newEditorState)
    }

    return(
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


export default function RichTextEditor() {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )

    return(
        <Wrapper>
            <Editor
                editorState={editorState}
                toolbarClassName="draft-toolbar"
                wrapperClassName="draft-wrapper"
                editorClassName="draft-editor content"
                onEditorStateChange={setEditorState}
                //toolbarOnFocus
                toolbar={{
                    options: ['blockType', 'inline', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'remove', 'history'],
                    blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    list: { options: ['unordered', 'ordered'] },
                    textAlign: { options: ['left', 'center', 'right'] },
                    link: {  },
                    history: {  },
                }}
                toolbarCustomButtons={[
                    <ImageButton />
                ]}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .draft-toolbar .rdw-option-wrapper,
    .draft-toolbar .rdw-dropdown-wrapper,
    .rdw-image-alignment-options-popup .rdw-image-alignment-option {
        height: 30px;
        min-width: 30px;
        border: 2px solid ${colors.gray};
        border-radius: 5px;
        box-shadow: none;
        &:hover, &.rdw-option-active {
            box-shadow: none;
            border: 2px solid ${colors.ui};
        }
    }
    .draft-toolbar .rdw-dropdown-wrapper {
        min-width:50px;
        .rdw-dropdown-carettoopen {
            top: 42%;
        }
    }
    .rdw-image-alignment-options-popup {
        background: transparent;
        padding: 0;
        border: none;
        width: 116px;
        > div {
            color: transparent;
            &:nth-child(1) {
                background: white url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNOC40OTMgMTQuODg3SC4zMjZhLjMyNi4zMjYgMCAwIDEgMC0uNjUyaDguMTY3YS4zMjYuMzI2IDAgMCAxIDAgLjY1MnpNMTQuNjE4IDEwLjE2MkguMzI2YS4zMjYuMzI2IDAgMCAxIDAtLjY1M2gxNC4yOTJhLjMyNi4zMjYgMCAwIDEgMCAuNjUzek04LjQ5MyA1LjQzNUguMzI2YS4zMjYuMzI2IDAgMCAxIDAtLjY1Mmg4LjE2N2EuMzI2LjMyNiAwIDAgMSAwIC42NTJ6TTE0LjYxOC43MDlILjMyNmEuMzI2LjMyNiAwIDAgMSAwLS42NTJoMTQuMjkyYS4zMjYuMzI2IDAgMCAxIDAgLjY1MnoiLz48L2c+PC9zdmc+') center center no-repeat;
            }
            &:nth-child(2) {
                background: white url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTEuNTU2IDE0Ljg4N0gzLjM4OGEuMzI2LjMyNiAwIDAgMSAwLS42NTJoOC4xNjdhLjMyNi4zMjYgMCAwIDEgMCAuNjUyek0xNC42MTggMTAuMTYySC4zMjZhLjMyNi4zMjYgMCAwIDEgMC0uNjUzaDE0LjI5MmEuMzI2LjMyNiAwIDAgMSAwIC42NTN6TTExLjU1NiA1LjQzNUgzLjM4OGEuMzI2LjMyNiAwIDAgMSAwLS42NTJoOC4xNjdhLjMyNi4zMjYgMCAwIDEgMCAuNjUyek0xNC42MTguNzA5SC4zMjZhLjMyNi4zMjYgMCAwIDEgMC0uNjUyaDE0LjI5MmEuMzI2LjMyNiAwIDAgMSAwIC42NTJ6Ii8+PC9nPjwvc3ZnPg==') center center no-repeat;
            }
            &:nth-child(3) {
                background: white url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwMCIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQuNjE4IDE0Ljg4N0g2LjQ1YS4zMjYuMzI2IDAgMCAxIDAtLjY1Mmg4LjE2N2EuMzI2LjMyNiAwIDAgMSAwIC42NTJ6TTE0LjYxOCAxMC4xNjJILjMyNmEuMzI2LjMyNiAwIDAgMSAwLS42NTNoMTQuMjkyYS4zMjYuMzI2IDAgMCAxIDAgLjY1M3pNMTQuNjE4IDUuNDM1SDYuNDVhLjMyNi4zMjYgMCAwIDEgMC0uNjUyaDguMTY3YS4zMjYuMzI2IDAgMCAxIDAgLjY1MnpNMTQuNjE4LjcwOUguMzI2YS4zMjYuMzI2IDAgMCAxIDAtLjY1MmgxNC4yOTJhLjMyNi4zMjYgMCAwIDEgMCAuNjUyeiIvPjwvZz48L3N2Zz4=') center center no-repeat;
            }
        }
    }
    .draft-editor {
        .public-DraftStyleDefault-block {
            margin: 0;
        }
    }
`