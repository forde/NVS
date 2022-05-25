import { useUser } from '@auth0/nextjs-auth0'
import { MdClear, MdVpnKey } from 'react-icons/md'
import { styled } from 'linaria/react'

export default function AuthStatus () {

    const { user, error, isLoading } = useUser()

    //console.log('User', user);

    if(isLoading) return null

    if(error) return <Wrapper>{error.message}</Wrapper>

    return (
        <Wrapper>
            {user && <><span>{user.nickname}</span> <a href="/api/auth/logout"><MdClear/></a></>}
            {!user && <a href="/api/auth/login"><MdVpnKey/></a>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    line-height: 1;
    font-size:18px;
    display: flex;
    align-items: center;
    svg {
        width: 24px;
        height: 24px;
    }
    span {
        margin-right:8px;
        top: -1px;
        position: relative;
    }
`