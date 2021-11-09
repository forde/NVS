import { normalize } from 'polished'
import { css } from 'linaria'
import { styled } from 'linaria/react'

/*
    test = css`color: tomato;` => classname={test}
    const H1 = styled.h1`color: tomato;` => <H1>...</H1>
*/

/*
|--------------------------------------------------------------------------
|  Colors
|--------------------------------------------------------------------------
*/
export const colors = {
    main: '#2196f3',
    mainDarker: '#1565c0',
    mainLighter: '#90caf9',
    ui: '#3977F3',
    black: '#141414',
    gray: '#efeff1',
    darkGray: '#bcbfc5',
    darkerGray: '#898e98',
    lightGray: '#F1F1F3',
    lighterGray: '#F9F9F9',
    red: '#EC5B54',
    green: '#80CF5B',
}

export const fonts = {
    main: '"Source Sans Pro", sans-serif;', // 300 | 400 | 700
    serif: '"Frank Ruhl Libre", serif;', // 300 | 700
}

export const shadow = 'box-shadow: 0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06);'
export const shadowHover = 'box-shadow: 0 6px 24px rgba(0,0,0,.12), 0 2px 6px rgba(31,26,34,.06);'

/*
|--------------------------------------------------------------------------
|  Distances
|--------------------------------------------------------------------------
*/
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
    { desktop: 120, tablet: 80, mobile: 60},
    { desktop: 80, tablet: 60, mobile: 48},
    { desktop: 60, tablet: 48, mobile: 32},
    { desktop: 48, tablet: 36, mobile: 24},
    { desktop: 32, tablet: 24, mobile: 16},
    { desktop: 24, tablet: 16, mobile: 12},
    { desktop: 16, tablet: 12, mobile: 8},
    { desktop: 12, tablet: 8, mobile: 4},
    { desktop: 8, tablet: 6, mobile: 4},
]

const distanceClasses = () => distanceProps.map(set =>
    distances.map(dist => `
        .${set.class}-${dist.desktop} {
            ${set.prop}: ${dist.desktop}px;
            @media (min-width: 768px) and (max-width: 1024px) {
                ${set.prop}: ${dist.tablet}px;
            }
            @media(max-width: 767px) {
                ${set.prop}: ${dist.mobile}px;
            }
        }
    `).join(' ')
).join(' ')


/*
|--------------------------------------------------------------------------
|  Typography
|--------------------------------------------------------------------------
*/
const lh = fs => Math.round(fs * 1.618)

export const headingSizes = [
    {   name: 'large', tags: 'h1,', sizes: [52,40,30] },
    {   name: 'medium', tags: 'h2,', sizes: [42,32,22] },
    {   name: 'small', tags: 'h3,h4,h5,h6,', sizes: [32,22,18] },
]

const headingClasses = () => headingSizes.map(size => `
    ${size.tags} .h-${size.name} {
        font-family: "Source Sans Pro", sans-serif;
        margin: 0;
        color: ${colors.black};
        font-weight: 700;
        position:relative;
        font-size: ${size.sizes[0]}px;
        line-height: ${lh(size.sizes[0])}px;
        @media (min-width: 768px) and (max-width: 1024px) {
            font-size: ${size.sizes[1]}px;
            line-height: ${lh(size.sizes[1])}px;
        }
        @media(max-width: 767px) {
            font-size: ${size.sizes[2]}px;
            line-height: ${lh(size.sizes[2])}px;
        }
    }
`).join(' ')

export const paragraphSizes = [
    {   name: 'large', sizes: [24,18,18] },
    {   name: 'medium', tags: 'p,', sizes: [20, 18, 18] },
    {   name: 'small', sizes: [16,16,16] },
]

const paragraphClasses = () => paragraphSizes.map(size => `
    ${size.tags} .p-${size.name} {
        margin: 0;
        color: ${colors.black};
        position:relative;
        font-family: "Georgia", "Cambria", "Times New Roman", Times, serif;
        font-size: ${size.sizes[0]}px;
        line-height: ${lh(size.sizes[0])}px;
        letter-spacing: .3px;
        -webkit-font-smoothing: antialiased;
        @media (min-width: 768px) and (max-width: 1024px) {
            font-size: ${size.sizes[1]}px;
            line-height: ${lh(size.sizes[1])}px;
        }
        @media(max-width: 767px) {
            font-size: ${size.sizes[2]}px;
            line-height: ${lh(size.sizes[2])}px;
        }
    }
`).join(' ')


/*
|--------------------------------------------------------------------------
|  Grid
|--------------------------------------------------------------------------
*/
const colNum = 12

const colGap = 16 // px

const trim2 = val =>  parseInt(val * 100)/100

export const Row = styled.div`
    display: flex;
    width: calc(100% + ${colGap}px);
    margin-left: -${trim2(colGap/2)}px;
    margin-right: -${trim2(colGap/2)}px;
    justify-content: space-between;
    flex-wrap: wrap;

`
const getWidth = (width, index) => {
    const cols = Array.isArray(width) ? (width[index] || width) : width
    return trim2((100/colNum)*cols)
}

export const Col = styled.div`
    margin-left: ${trim2(colGap/2)}px;
    margin-right: ${trim2(colGap/2)}px;
    width: calc(${props => getWidth(props.width, 0)}% - 16px);
    margin-bottom: 16px;
    @media (min-width: 768px) and (max-width: 1024px) {
        width: calc(${props => getWidth(props.width, 1)}% - 16px);
    }
    @media(max-width: 767px) {
        width: calc(${props => getWidth(props.width, 2)}% - 16px);
    }
`

/**
 * Example:
 * <Row>
 *      <Col width={[3,6,12]}> 3 col. on desktop / 6 on tablet / 12 on mobile </Col>
 *      <Col width={[3,6,12]}> 3 col. on desktop / 6 on tablet / 12 on mobile </Col>
 *      <Col width={[6,12,12]}> 6 col. on desktop / 12 on tablet / 12 on mobile </Col>
 * </Row>
 */


/*
|--------------------------------------------------------------------------
|  Global styles
|--------------------------------------------------------------------------
*/
css`
    :global() {

        ${normalize()}

        html, body {
            min-height: 100vh;
            overflow-x: hidden;
            -webkit-text-size-adjust: none;
	        touch-action: manipulation;
        }

        body {
            box-sizing: border-box;
            color: ${colors.black};
            -moz-osx-font-smoothing: grayscale;
            font-family: 'Source Sans Pro', sans-serif;
            font-display: fallback;
            font-size:18px;
            line-height: 1.4;
            max-width:100%;
        }

        #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        ${distanceClasses()}

        ${headingClasses()}

        ${paragraphClasses()}

        div { position: relative; }

        a {
            color: inherit;
            text-decoration: none;
            cursor: pointer;
        }

        * { box-sizing: border-box; }

        img {max-width: 100%;}

        button {
            cursor: pointer;
        }

        ul, ol, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        pre {
            font-size: 14px;
            background: #F6F6F6;
            padding: 16px;
            line-height: 1;
            border-top: 1px solid #E8E8E8;
            border-left: 1px solid #E8E8E8;
            max-height: 600px;
            overflow: auto;
        }

        .container {
            width: 100%;
            max-width: 1180px;
            margin-left: auto;
            margin-right: auto;
        }
        @media (max-width: 1180px) {
            .container { padding-left: 20px; padding-right: 20px; }
        }

        .box-shadow {
            box-shadow: 0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06);
        }

        .block {
            display: block;
        }

        .oh {
            overflow: hidden;
        }

        .card {
            background: white;
            border-radius: 10px;
            padding: 32px 32px;
            box-shadow: 0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06);
        }

        .h-100 {
            height:100%;
        }

        .w-100 {
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

        .content {
            font-family: ${fonts.serif};
            letter-spacing: .3px;
            font-size: 20px;
            h1,h2,h3,h4,h5,h6 {
                font-family: ${fonts.main};
            }
            p, ul, ol, h1, h2, h3, h4, h5, h6, .public-DraftEditor-content > div > div {
                margin-bottom: 16px!important;
                line-height: 1.4;
            }
            strong { font-weight: bold; }
            em { font-style: italic; }
            ul, ol {
                padding: 0 0 0 16px;
                margin: 0 0 16px 0;
            }
            li {
                list-style: disc;
                margin-bottom: 6px;
            }
            ol li {
                list-style: none;
            }
            a {
                color: ${colors.ui};
                text-decoration: underline;
            }
            figure {
                margin: 0;
            }
            img {
                max-width:100%none;
                height:auto;
                display: block;
                margin-bottom: 16px;
            }
            .rdw-image-alignment {
                width: 100%;
            }
            @media(max-width: 767px) {
                .rdw-image-alignment, .rdw-image-imagewrapper img {
                    width: 100%;
                    display: block;
                }
            }
        }

        .editable {
            transition: outline .2s ease-in-out;
            outline: 1px dashed transparent;
            &:hover {
                outline: 1px dashed #95939F;
            }
        }

        .actions-on-hover, .has-actions {
            position: relative;
            > .actions {
                opacity: 0;
                visibility: hidden;
            }
            &:hover {
                > .actions {
                    opacity: 1;
                    visibility: visible;
                }
            }
        }

        input, textarea {
            width: 100%;
            padding: 8px 12px;
            height: 36px;
            font-size:14px;
            background: rgba(255,255,255,.6);
            outline: none;
            box-shadow: none;
            border: 1px solid #D8DCE2;
            color: ${colors.black};
            border-radius: 5px;
            line-height: 1;
            transition: all .2s ease-in-out;
            font-family: 'gellix-medium';

            background-image:-webkit-linear-gradient(hsla(0,0%,100%,0), hsla(0,0%,100%,0))!important;

            @media(pointer: fine) {
                &:hover {
                    border-color: ${colors.gray};
                }
            }

            &:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill, &:-webkit-autofill-strong-password, &:-webkit-autofill-strong-password-viewable {
                box-shadow: 0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06), 0 0 0 50px white inset!important;
                background-image:-webkit-linear-gradient(hsla(0,0%,100%,0), hsla(0,0%,100%,0))!important;
            }
        }

        input[type="text"], textarea {
            &:read-only {
                opacity: .6;
            }
        }

        textarea {
            min-height: 100px;
        }

        .modal {
            padding: 20px;
            > h3 {
                font-size: 26px;
                line-height: 1;
                margin-bottom: 20px;
            }
        }

    }
`