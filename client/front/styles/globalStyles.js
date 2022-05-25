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
        .ft-${set.class}-${dist.desktop} {
            ${set.prop}: ${dist.desktop}px;
        }
        @media (min-width: 768px) and (max-width: 1024px) {
            .ft-${set.class}-${dist.desktop} {
                ${set.prop}: ${dist.tablet}px;
            }
        }
        @media(max-width: 767px) {
            .ft-${set.class}-${dist.desktop} {
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

    .ft-message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99999;
        font-size: 18px;
        transform: translateY(-100%);
        transition: all .3s ease-in-out;
    }
    .ft-message-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 64px;
        font-family: 'Arial', sans-serif;
        color: ${colors.black};
    }
    .ft-message.ft-success {
        background: ${colors.green};
    }
    .ft-message.ft-error {
        background: ${colors.red};
    }
    .ft-message.ft-visible {
        transform: translateY(0%);
    }

    .ft-admin-bar {
        padding-bottom: 42px!important;
    }

    .ft-container {
        width: 100%;
        max-width: ${containerWidth};
        margin-left: auto;
        margin-right: auto;
    }
    @media (max-width: ${containerWidth}) {
        .ft-container {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    .ft-block {
        display: block;
    }

    .ft-oh {
        overflow: hidden;
        padding-right: 22px;
    }

    .ft-square:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }
    .ft-square > div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .ft-fs-16 {
        font-size: 16px;
    }

    .ft-fs-14 {
        font-size: 16px;
    }

    .ft-fs-18 {
        font-size: 18px;
    }

    .ft-h-100 {
        height:100%;
    }

    .ft-h-100i {
        height:100%!important;
    }

    .ft-w-100 {
        width: 100%;
    }

    .ft-w-100i {
        width: 100%!important;
    }

    .ft-relative {
        position: relative;
    }

    .ft-absolute {
        position: absolute;
    }

    .ft-clickable {
        cursor:pointer;
    }

    .ft-center-y {
        top: 50%;
        transform: translateY(-50%);
    }

    .ft-flex {
        display: flex;
    }

    .ft-wrap {
        flex-wrap: wrap;
    }

    .ft-flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .ft-flex-center-y {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .ft-flex-spread-x {
        display: flex;
        justify-content: space-between;
    }

    .ft-flex-center-x {
        display: flex;
        justify-content: center;
    }

    .ft-flex-center-y-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .ft-align-center {
        display: flex;
        align-items: center;
    }
`