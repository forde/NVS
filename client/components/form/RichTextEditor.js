import { useState } from 'react'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import dynamic from 'next/dynamic'
import { styled } from 'linaria/react'

import { colors } from '~/styles'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)


export default function RichTextEditor() {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )

    const uploadImageCallBack = async (file) => {
        console.log(file);
    }

    return(
        <Wrapper>
            <Editor
                editorState={editorState}
                toolbarClassName="draft-toolbar"
                wrapperClassName="draft-wrapper"
                editorClassName="draft-editor content"
                onEditorStateChange={setEditorState}
                // toolbarOnFocus
                toolbar={{
                    options: ['blockType', 'inline', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    list: { options: ['unordered', 'ordered'] },
                    textAlign: { options: ['left', 'center', 'right'] },
                    link: {  },
                    history: {  },
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        alt: { present: false, mandatory: false }
                    },
                }}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .draft-toolbar {
        .rdw-option-wrapper, .rdw-dropdown-wrapper {
            height: 30px;
            min-width: 30px;
            border: 2px solid ${colors.gray};
            border-radius: 5px;
            box-shadow: none;
            &:hover, &.rdw-option-active {
                box-shadow: none;
                border: 2px solid ${colors.main};
            }
        }
        .rdw-dropdown-wrapper {
            min-width:50px;
            .rdw-dropdown-carettoopen {
                top: 42%;
            }
        }
    }
    .draft-editor {
        .public-DraftStyleDefault-block {
            margin: 0 0
        }
    }
`