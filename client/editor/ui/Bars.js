import { styled } from 'linaria/react'

export default function Bars ({ bars=10, color='#fff', width=20, opacity=.3, speed=.4, skew='-25' }) {
    return (
        <Wrapper bars={bars} color={color} width={width} opacity={opacity} speed={speed} skew={skew} >
            <div>
                {[...Array(bars).keys()].map(i => <span key={i}/>)}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    overflow: hidden;
    cursor: default;
    z-index: 100;
    div {
        position: absolute;
        top: 0;
        left: ${props => -props.width}px;
        right:0;
        bottom:0;
        animation-name: move;
        animation-duration: ${props => props.speed}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-fill-mode: backwards;
        display: flex;
    }
    span {
        border-left: ${props => props.width/2}px solid ${props => props.color};
        opacity: ${props => props.opacity};
        width: ${props => props.width}px;
        margin-right: ${props => props.width/2}px;
        height: 100%;
        display: block;
        transform: skew(${props => props.skew}deg);
    }

    @keyframes move {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(${props => props.width}px);
        }
    }

`