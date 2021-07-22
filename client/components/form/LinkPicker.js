import { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md'
import { styled } from 'linaria/react'

import Modal from '~/components/form/Modal'
import Button from '~/components/form/Button'
import Input from '~/components/form/Input'
import Switch from '~/components/form/Switch'
import { findPageByTitle } from '~/api'
import { shadow, colors } from '~/styles'

export default function LinkPicker ({ onLink, onClose, url:_url, title:_title, target:_target }) {

    const [ query, setQuery ] = useState('')
    const [ results, setResults ] = useState([])
    const [ url, setUrl ] = useState(_url || '')
    const [ title, setTitle ] = useState(_title || '')
    const [ target, setTarget ] = useState(_target || '_self')

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
        setUrl(`/${result.slug}`)
        if(!title) setTitle(result.title)
    }

    return <Modal
        className="modal"
        onClose={onClose}
        width="500px"
    >
        <h3>Insert link</h3>
        <div className="relative mb-24">
            <Input
                placeholder="Link to existing page"
                icon={MdSearch}
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
        />
        <Input
            placeholder="Link URL"
            value={url}
            onChange={setUrl}
            className="mb-24"
        />
        <div className="flex-center-y-row mb-24">
            <Switch on={target==='_blank'} onChange={val => val ? setTarget('_blank') : setTarget('_self')} style={{marginRight: '8px'}}/> Open link in new tab
        </div>
        <Button
            small
            disabled={!title || !url}
            onClick={() => onLink({ url, title, target })}
        >Insert link</Button>
    </Modal>
}
const Results = styled.div`
    position: absolute;
    top: calc(100% - 10px);
    width:100%;
    z-index: 30;
    background: #fff;
    ${shadow};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding-top: 10px;
    .result {
        padding: 8px 16px;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        span {
            text-transform: uppercase;
            color: ${colors.darkGray};
            font-size: 16px;
            margin-right: 16px;
        }
        &:hover {
            @media(pointer: fine) {
                background: ${colors.lightGray};
                color: ${colors.ui};
            }
        }
    }
`