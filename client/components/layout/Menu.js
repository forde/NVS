import { styled } from 'linaria/react'
import Link from 'next/link'

import Actions from '~/editor/Actions'

export default function Menu () {

    const links = [
        { name: 'Home', url: '/home' }
    ]

    return(
        <Nav className="has-actions">
            <ul>
                {links.map((link, i) => <li key={i}>
                    <Link href={link.url}>
                        <a>{link.name}</a>
                    </Link>
                </li>)}
            </ul>
            <Actions
                align="right"
                onEdit={()=>null}
            />
        </Nav>
    )
}

const Nav = styled.nav`
    position: relative;
    ul  {
        li {
            margin-right: 16px;
        }
    }
`