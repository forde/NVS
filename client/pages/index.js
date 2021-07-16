import { normalize } from 'polished'
import { css } from 'linaria'
import { styled } from 'linaria/react'



export const test = css` color: tomato;`

const H1 = styled.h1``

export default function Home() {
    return(
        <>
            <h1 className="mb-24">Kość 1</h1>
            <h2 className="mb-24">Kość 2</h2>
            <h3 className="mb-24">Kość 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </>
    )
}