import { useState } from 'react'
import { styled } from 'linaria/react'
import { MdCheckCircleOutline } from 'react-icons/md'

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

        fetch('/api/sanity/page', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: page._id,
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
            })
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