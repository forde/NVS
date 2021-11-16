import { useState } from 'react'
import { styled } from 'linaria/react'
import { MdCheckCircleOutline } from 'react-icons/md'
import { nanoid } from 'nanoid'

import { colors } from '~/styles'
import { PageContext } from '~/context'
import editor from '~/editor'
import { success, error } from '~/editor/Toast'

export default function PublishButton  () {

    const [ publishing, setPublishing ] = useState(false)

    const { Bars } = editor()

    const publish = async page => {

        if(publishing) return

        setPublishing(true)


        let method = 'PATCH'
        let data = {}

        data = {
            _id: page._id,
            _type: 'page',
            title: page.title,
            slug: {
                _type: 'slug',
                current: page.slug
            },
            modules: page.modules,
            seo: {
                _type: 'seo',
                ...page.seo
            }
        }

        if(!page._id) {
            const key = nanoid(12)
            data._id = key
            data.title = key
            data.slug.current = key
            method = 'POST'
        }


        fetch('/api/sanity/page', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('data',data);
                setPublishing(false)
                success('Page published')
            })
    }

    return (
        <PageContext.Consumer>
            {({ page, changed }) => !changed ? null : <Wrapper
                onClick={() => publish(page)}
            >
                <MdCheckCircleOutline className="icon"/>
                {publishing && <Bars /> }
                Publish
            </Wrapper>}
        </PageContext.Consumer>
    )
}

const Wrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: ${colors.green};
    height: 100%;
    color: ${colors.black};
    position:relative;
`