import { useState, useRef, useEffect } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { compose } from 'ramda'

import 'draft-js/dist/Draft.css'
import dynamic from 'next/dynamic'
import { styled } from 'linaria/react'
import debounce from 'lodash.debounce'

import { colors } from '/styles'
//import ImageButton, { ImageBlock } from './ImageButton'
import LinkButton from './LinkButton'
//import VideoButton, { VideoBlock } from './VideoButton'
import useFirstRender from '/editor/lib/hooks/useFirstRender'
import blockContentToDraft from '/editor/lib/blockContentToDraft'
import draftToBlockContent from '/editor/lib/draftToBlockContent'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

export default function RichTextEditor({ content, onChange }) {

    const stateInit = () => {

        if(content) return compose(
            EditorState.createWithContent,
            convertFromRaw,
            blockContentToDraft
        )(content)

        return EditorState.createEmpty()

    }

    // temp for debuging
    blockContentToDraft(content)

    const [ editorState, setEditorState ] = useState(stateInit)

    const wrapperRef = useRef(null)

    const firstRender = useFirstRender()

    useEffect(() => {
        if(!firstRender) compose(
            onChange,
            draftToBlockContent,
            convertToRaw,
        )(editorState.getCurrentContent())
    }, [editorState])

    useEffect(() => {
        window.addEventListener('scroll', debounce(onScroll, 10))
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const onScroll = () => {
        if(wrapperRef.current) {
            const toolbar = wrapperRef.current.querySelector('.draft-toolbar')
            const toolbarBCR = toolbar.getBoundingClientRect()
            const wrapperBCR = wrapperRef.current.getBoundingClientRect()
            const isFixed = toolbar.classList.contains('fixed')
            const offset = toolbarBCR.height*3
            //console.log(toolbarBCR.top, toolbarBCR.height, wrapperBCR.top, wrapperBCR.height)

            if(!isFixed && wrapperBCR.top < 0 && Math.abs(wrapperBCR.top - offset) < wrapperBCR.height) {
                toolbar.classList.add('fixed')
            }
            if(isFixed && wrapperBCR.top > toolbarBCR.height) {
                toolbar.classList.remove('fixed')
            }
            if(isFixed && Math.abs(wrapperBCR.top - offset) > wrapperBCR.height) {
                toolbar.classList.remove('fixed')
            }
        }
    }

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
        <Wrapper ref={wrapperRef}>
            <Editor
                editorState={editorState}
                toolbarClassName="draft-toolbar"
                wrapperClassName="draft-wrapper"
                editorClassName="draft-editor content"
                onEditorStateChange={setEditorState}
                //toolbarOnFocus
                toolbar={{
                    options: ['blockType', 'inline', 'list', 'emoji', 'remove'],
                    blockType: { options: ['Normal', 'H2', 'H3', 'H4', 'Blockquote'] },
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    list: { options: ['unordered', 'ordered'] },
                }}
                toolbarCustomButtons={[
                    //<ImageButton />,
                    //<VideoButton />,
                    <LinkButton />
                ]}
                blockRendererFn={customBlockRenderer}
            />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .draft-wrapper {
        padding-top:36px;
        .draft-toolbar  {
            border: none;
            padding: 0;
            margin-left: -3px;
            top: 3px;
            position: absolute;
            .rdw-option-wrapper, .rdw-dropdown-wrapper {
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
            .rdw-dropdown-wrapper {
                min-width:50px;
                .rdw-dropdown-carettoopen {
                    top: 42%;
                }
            }
            &.fixed {
                visibility: visible;
                position: fixed;
                background: rgba(255,255,255,.8);
                z-index: 100;
            }
        }
        .draft-editor {
            .public-DraftStyleDefault-block {
                margin: 0;
            }
        }
    }
`