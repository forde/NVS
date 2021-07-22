import { styled } from 'linaria/react'
import Link from 'next/link'

export default function Menu () {

    const links = [
        { name: 'Home', url: '/' }
    ]

    return(
        <Nav>
            <ul>
                {links.map((link, i) => <li key={i}>
                    <Link href={link.url}>
                        <a>{link.name}</a>
                    </Link>
                </li>)}
            </ul>
        </Nav>
    )
}

const Nav = styled.nav`
    ul  {
        li {
            margin-right: 16px;
        }
    }
`