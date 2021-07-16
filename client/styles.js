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
    main: '#F97A66',
    mainLight: '#F8AA9E',
    mainLighter: '#FACDC0',
    black: '#141414',
    darkGray: '#3E3E3E',
    gray: '#787777',
    lightGray: '#E5E3E3',
    lighterGray: '#F9F9F9',
    red: '#f44336',
    green: '#8bc34a',
}

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
        font-family: 'Frank Ruhl Libre', serif;
        margin: 0;
        color: ${colors.black};
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
    {   name: 'large', sizes: [24,18,16] },
    {   name: 'medium', tags: 'p,', sizes: [20, 18, 16] },
    {   name: 'small', sizes: [16,14,14] },
]

const paragraphClasses = () => paragraphSizes.map(size => `
    ${size.tags} .p-${size.name} {
        margin: 0;
        color: ${colors.black};
        position:relative;
        font-family: "Georgia", "Cambria", "Times New Roman", Times, serif;
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

        .container {
            width: 100%;
            max-width: 1180px;
            margin: 0 auto;
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
            border-radius: 12px;
            padding: 32px 32px;
            box-shadow: 0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06);
        }

        .h-100 {
            height:100%;
        }

        .w-100 {
            width: 100%;
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
        .flex-center-x {
            display: flex;
            justify-content: center;
        }

        .flex-center-y-row {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .content * {
            margin-bottom: 16px;
            line-height:1.4;
        }
        .content strong { font-weight: bold; }
        .content em { font-style: italic; }
        .content ul {
            padding-left: 16px;
            margin-left: 16px;;
        }
        .content li {
            list-style: disc;
            margin-bottom: 6px;
        }
        .content a {
            color: ${colors.main};
            text-decoration: underline;
        }

    }
`