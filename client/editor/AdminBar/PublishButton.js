import { useState } from 'react'
import { styled } from 'linaria/react'
import { MdCheckCircleOutline } from 'react-icons/md'

import { colors } from '~/styles'
import { PageContext } from '~/context'
import editor from '~/editor'

export default function PublishButton  () {

    const formData = data => {
        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        return formData
    }

    const publish = async page => {

            const { _id: id, ...rest } = page

        fetch('/api/sanity/image', {
            method: 'PATCH',
            body: formData({
                id, ...rest
            })
        })
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(data => {
                console.log('data',data);
            })
    }

    return (
        <PageContext.Consumer>
            {({ page, changed }) => !changed ? null : <Wrapper
                onClick={() => publish(page)}
            >
                <MdCheckCircleOutline className="icon"/>Publish
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
`