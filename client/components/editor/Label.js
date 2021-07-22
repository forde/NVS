import { styled } from 'linaria/react'

export default function Label ({ className, children, ...rest }) {
    return (
        <StyledLabel className={className} {...rest}>{children}</StyledLabel>
    )
}

const StyledLabel = styled.label`
    font-size:16px;
    font-weight: 400;
    display:block;
`