import { colors } from '/front/styles'

const containerWidth = '1180px'

const distanceProps = [
    { class: 'mb', prop: 'margin-bottom'},
    { class: 'mt', prop: 'margin-top'},
    { class: 'mr', prop: 'margin-right'},
    { class: 'ml', prop: 'margin-left'},
    { class: 'pb', prop: 'padding-bottom'},
    { class: 'pt', prop: 'padding-top'},
    { class: 'pr', prop: 'padding-right'},
    { class: 'pl', prop: 'padding-left'},
    { class: 'p', prop: 'padding'},
]

const distances = [
    { desktop: 60, tablet: 48, mobile: 32},
    { desktop: 48, tablet: 36, mobile: 24},
    { desktop: 24, tablet: 16, mobile: 12},
    { desktop: 16, tablet: 12, mobile: 8},
    { desktop: 8, tablet: 6, mobile: 4},
]

const distanceClasses = () => distanceProps.map(set =>
    distances.map(dist => `
        .${set.class}-${dist.desktop} {
            ${set.prop}: ${dist.desktop}px;
        }
        @media (min-width: 768px) and (max-width: 1024px) {
            .${set.class}-${dist.desktop} {
                ${set.prop}: ${dist.tablet}px;
            }
        }
        @media(max-width: 767px) {
            .${set.class}-${dist.desktop} {
                ${set.prop}: ${dist.mobile}px;
            }
        }
    `).join(' ')
).join(' ')

export default `

    ${distanceClasses()}

    .front {
        font-family: 'Arial', sans-serif;
        font-size: 18px;
    }

    .message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99999;
        font-size: 18px;
        transform: translateY(-100%);
        transition: all .3s ease-in-out;
    }
    .message-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 64px;
        font-family: 'Arial', sans-serif;
        color: ${colors.black};
    }
    .message.success {
        background: ${colors.green};
    }
    .message.error {
        background: ${colors.red};
    }
    .message.visible {
        transform: translateY(0%);
    }

    .admin-bar {
        padding-bottom: 42px!important;
    }

    .container {
        width: 100%;
        max-width: ${containerWidth};
        margin-left: auto;
        margin-right: auto;
    }
    @media (max-width: ${containerWidth}) {
        .container {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    .block {
        display: block;
    }

    .oh {
        overflow: hidden;
        padding-right: 22px;
    }

    .square:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    .square > div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .fs-16 {
        font-size: 16px;
    }

    .fs-14 {
        font-size: 16px;
    }

    .fs-18 {
        font-size: 18px;
    }

    .h-100 {
        height:100%;
    }

    .h-100i {
        height:100%!important;
    }

    .w-100 {
        width: 100%;
    }

    .w-100i {
        width: 100%!important;
    }

    .relative {
        position: relative;
    }

    .absolute {
        position: absolute;
    }

    .clickable {
        cursor:pointer;
    }

    .center-y {
        top: 50%;
        transform: translateY(-50%);
    }

    .flex {
        display: flex;
    }

    .wrap {
        flex-wrap: wrap;
    }

    .flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .flex-center-y {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .flex-spread-x {
        display: flex;
        justify-content: space-between;
    }

    .flex-center-x {
        display: flex;
        justify-content: center;
    }

    .flex-center-y-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .align-center {
        display: flex;
        align-items: center;
    }
`