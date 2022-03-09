import { useState, useRef, useEffect } from 'react'
import { EditorState, ContentState, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js'
import 'draft-js/dist/Draft.css'
import dynamic from 'next/dynamic'
import { styled } from 'linaria/react'

import { colors } from '~/styles'
import ImageButton, { ImageBlock } from './ImageButton'
import LinkButton from './LinkButton'
import VideoButton, { VideoBlock } from './VideoButton'
import useFirstRender from '~/hooks/useFirstRender'
import blockContentToDraft from './converters/blockContentToDraft'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

export default function RichTextEditor({ content, onChange }) {

    const stateInit = () => {

        if(content) return EditorState.createWithContent(convertFromRaw(blockContentToDraft(content)))

        return EditorState.createEmpty()

    }

    // temp for debuging
    blockContentToDraft(content)

    const [ editorState, setEditorState ] = useState(stateInit)

    const editorRef = useRef(null)

    const firstRender = useFirstRender()

    useEffect(() => {
        if(!firstRender) onChange(convertToRaw(editorState.getCurrentContent()))
    }, [editorState])

    const customBlockRenderer = block => {

        if(block.getType() !== 'atomic') return null

        return {
            component: props => {
                const entity = props.contentState.getEntity(props.block.getEntityAt(0))
                const data = entity.getData()
                const type = entity.getType()
                switch(type) {
                    case '_IMAGE' : return <ImageBlock data={data} {...props} />
                    case '_VIDEO' : return <VideoBlock data={data} />
                    default : return <div>{type} {JSON.stringify(data)}</div>
                }
            },
            editable: true,
        }
    }

    return(
        <Wrapper>
            <Editor
                editorState={editorState}
                toolbarClassName="draft-toolbar"
                wrapperClassName="draft-wrapper"
                editorClassName="draft-editor content"
                onEditorStateChange={setEditorState}
                //toolbarOnFocus
                ref={editorRef}
                toolbar={{
                    options: ['blockType', 'inline', 'list', 'textAlign', 'emoji', 'remove'],
                    blockType: { options: ['Normal', 'H2', 'H3', 'H4', 'Blockquote'] },
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    list: { options: ['unordered', 'ordered'] },
                    textAlign: { options: ['left', 'center', 'right'] },
                }}
                toolbarCustomButtons={[
                    <ImageButton />,
                    <VideoButton />,
                    <LinkButton />
                ]}
                blockRendererFn={customBlockRenderer}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .draft-toolbar .rdw-option-wrapper,
    .draft-toolbar .rdw-dropdown-wrapper {
        height: 30px;
        min-width: 30px;
        border: 2px solid ${colors.gray};
        border-radius: 5px;
        box-shadow: none;
        &:hover, &.rdw-option-active {
            box-shadow: none;
            border: 2px solid ${colors.black};
        }
    }
    .draft-toolbar .rdw-dropdown-wrapper {
        min-width:50px;
        .rdw-dropdown-carettoopen {
            top: 42%;
        }
    }
    .draft-editor {
        .public-DraftStyleDefault-block {
            margin: 0;
        }
    }
`