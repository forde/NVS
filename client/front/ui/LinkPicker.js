import { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md'
import { styled } from 'linaria/react'

import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import Switch from './Switch'
import { findPageByTitle } from '/api'
import { shadow, colors } from '/styles'

export default function LinkPicker ({ onLink, onClose, url:_url, title:_title, target:_target, type:_type, id:_id }) {

    const [ query, setQuery ] = useState('')
    const [ results, setResults ] = useState([])
    const [ url, setUrl ] = useState(_url || '')
    const [ title, setTitle ] = useState(_title || '')
    const [ target, setTarget ] = useState(_target || '_self')
    const [ type, setType ] = useState(_type || '')
    const [ id, setId ] = useState(_id || '')

    useEffect(() => {
        if(!query) {
            if(results.length) setResults([])
            return
        }
        (async () => {
            const resp = await findPageByTitle(query)
            setResults(resp)
        })()
    }, [query])

    const onResultClick = result => {
        setQuery('')
        setType(result._type)
        setId(result._id)
        setUrl(`/${result.slug}`)
        if(!title) setTitle(result.title)
    }

    return <Modal
        onClose={onClose}
        width="500px"
        title="Link editor"
    >
        <div className="relative mb-24">
            <Input
                placeholder="Link to existing page"
                icon={MdSearch}
                medium
                value={query}
                onChange={setQuery}
                style={{zIndex:'40'}}
            />
            <Results>
                {results.map(res => (
                    <div className="result" key={res._id} onClick={() => onResultClick(res)}>
                        <span>{res._type}</span>
                        {res.title}
                    </div>
                ))}
            </Results>
        </div>
        <Input
            placeholder="Link title"
            value={title}
            onChange={setTitle}
            className="mb-24"
            medium
        />
        <Input
            placeholder="Link URL"
            value={url}
            onChange={setUrl}
            className="mb-24"
            medium
        />
        <div className="flex-center-y-row mb-24">
            <Switch on={target==='_blank'} onChange={val => val ? setTarget('_blank') : setTarget('_self')} style={{marginRight: '8px'}}/> Open link in new tab
        </div>
        <Button
            medium
            disabled={!title || !url}
            onClick={() => onLink({ url, title, target, type, id })}
        >Insert link</Button>
    </Modal>
}
const Results = styled.div`
    position: absolute;
    top: calc(100% - 10px);
    width:100%;
    z-index: 30;
    background: #5D5E5E;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 10px;
    overflow: hidden;
    .result {
        padding: 8px 12px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        span {
            text-transform: uppercase;
            color: ${colors.darkGray};
            font-size: 14px;
            margin-right: 14px;
        }
        &:hover {
            @media(pointer: fine) {
                background: #7A7B7C;
            }
        }
    }
`