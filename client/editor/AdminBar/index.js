import { useUser } from '@auth0/nextjs-auth0'
import { styled } from 'linaria/react'

import { colors } from '~/styles'

export default function AdminBar () {

    const { user } = useUser()

    if(!user) return null

    return(
        <Wrapper>
            Admin Bar ...
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: ${colors.black};
    color: white;
    height: 42px;
    display: flex;
    align-items: center;
    padding: 16px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9999;
`