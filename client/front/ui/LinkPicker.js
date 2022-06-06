import { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md'

import Modal from './Modal'
import Button from './Button'
import Input from './Input'
import Switch from './Switch'
import config from '/front.config'

import styles from '/front/styles/ui/LinkPicker.module.scss'

export default function LinkPicker ({
    onLink,
    onClose,
    url:_url,
    title:_title,
    target:_target,
    type:_type,
    id:_id,
    serchableTypes=['page'],
    children=null,
}) {

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
            const resp = await config.api.page.get({ title: query, type: serchableTypes })
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
        <div className="ft-relative ft-mb-24">
            <Input
                placeholder="Link to existing page"
                icon={MdSearch}
                medium
                value={query}
                onChange={setQuery}
                style={{zIndex:'40'}}
            />
            <div className={styles.results}>
                {results.map(res => (
                    <div className={styles.result} key={res._id} onClick={() => onResultClick(res)}>
                        <span>{res._type}</span>
                        {res.title}
                    </div>
                ))}
            </div>
        </div>
        <Input
            placeholder="Link title"
            value={title}
            onChange={setTitle}
            className="ft-mb-24"
            medium
        />
        <Input
            placeholder="Link URL"
            value={url}
            onChange={setUrl}
            className="ft-mb-24"
            medium
        />
        <div className="ft-flex-center-y-row ft-mb-24 ft-fs-16" >
            <Switch on={target==='_blank'} onChange={val => val ? setTarget('_blank') : setTarget('_self')} style={{marginRight: '8px'}}/> Open link in new tab
        </div>
        {children && <div className="ft-mb-24">{children}</div>}
        <Button
            medium
            disabled={!title || !url}
            onClick={() => onLink({ url, title, target, type, id })}
        >Insert link</Button>
    </Modal>
}