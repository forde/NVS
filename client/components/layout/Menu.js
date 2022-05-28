import { styled } from 'linaria/react'
import Link from 'next/link'

export default function Menu () {

    const links = [
        { name: 'Home', url: '/home' },
        { name: 'Asztawakragita', url: '/asztawakragita' },
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
    position: relative;
    ul  {
        display: flex;
        align-items: center;
        li {
            margin-right: 16px;
        }
    }
`