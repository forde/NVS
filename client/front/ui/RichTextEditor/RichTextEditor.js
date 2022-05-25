import { useState, useRef, useEffect } from 'react'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { compose } from 'ramda'

import 'draft-js/dist/Draft.css'
import dynamic from 'next/dynamic'
import debounce from 'lodash.debounce'

import LinkButton from './LinkButton'
import useFirstRender from '/front/lib/hooks/useFirstRender'
import blockContentToDraft from '/front/lib/blockContentToDraft'
import draftToBlockContent from '/front/lib/draftToBlockContent'

import styles from '/front/styles/ui/RichTextEditor.module.scss'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

export default function RichTextEditor({
    content,
    onChange=s=>null,
    stickyToolbar=true,
}) {

    const stateInit = () => {

        if(content) return compose(
            EditorState.createWithContent,
            convertFromRaw,
            blockContentToDraft
        )(content)

        return EditorState.createEmpty()
    }

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
        if(stickyToolbar) {
            window.addEventListener('scroll', debounce(onScroll, 10))
            return () => window.removeEventListener('scroll', onScroll)
        }
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
        <div ref={wrapperRef} className={styles.wrapper}>
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
                    <LinkButton />
                ]}
                blockRendererFn={customBlockRenderer}
            />
        </div>
    )
}