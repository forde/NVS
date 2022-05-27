import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MdSearch } from 'react-icons/md'
import Link from 'next/link'

import ui from '/front/ui'
import { Row, Col } from '/front/styles'
import { success, error } from '/front/lib/message'
import { goTo } from '/front/lib/helpers'

import styles from '/front/styles/AdminBar/tools/PageList.module.scss'

import config from '/front.config'

export default function PageList ({ onClose }) {

    const [ search, setSearch ] = useState('')
    const [ type, setType ] = useState('page')
    const [ pages, setpages ] = useState([])
    const [ deletingPage, setDeletingPage ] = useState('')

    const { Modal, Input, Select, ConfirmButton } = ui()

    const router = useRouter()

    useEffect(() => {
        fetchPages()
    }, [type])

    const fetchPages = async () => {
        const resp = await config.api.page.get({ type })
        setpages(resp)
    }

    const searchFilter = page => [page.title]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())

    const deletePage = async page => {

        if(deletingPage === page._id) return

        setDeletingPage(page._id)

        const resp = await config.api.page.delete(page)
        setDeletingPage('')

        if(resp?.error) return error(resp.error)

        success('Page deleted')

        const { as } = config.pageUrl(page)
        if(router.asPath === as) return goTo('/')

        fetchPages()
    }

    return <Modal
        onClose={onClose}
        title="Page list"
        width="60vw"
        height="60vh"
    >
        <Row>
            <Col width={8}>
                <Input
                    value={search}
                    onChange={setSearch}
                    placeholder="Search"
                    icon={MdSearch}
                    medium
                    className="ft-mb-24"
                />
            </Col>
            <Col width={4}>
                <Select
                    value={type}
                    onChange={setType}
                    options={['page','post']}
                    style={{ minWidth:'100%'}}
                    small
                />
            </Col>
        </Row>
        {pages.filter(searchFilter).map(p => {
            const { href, as } = config.pageUrl(p)
            return (
                <div className={styles.pageItem} key={p._id}>
                    <Link href={href} as={as}>
                        <a onClick={onClose}>{p.title}</a>
                    </Link>
                    <ConfirmButton
                        children="Delete"
                        style={{ width:' 160px'}}
                        buttonSpacing={'12px'}
                        small
                        onConfirm={() => deletePage(p)}
                        busy={deletingPage === p._id}
                    />
                </div>
            )
        })}
    </Modal>
}