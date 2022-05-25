import colorsModule from './colors.module.scss'

import gridStylesModule from 'front/styles/grid.module.scss'

export const colors = colorsModule?.locals || colorsModule

const gridStyles = gridStylesModule?.locals || gridStylesModule

export const Row = ({ children }) => {
    return (
        <div className={gridStyles.row}>{children}</div>
    )
}

export const Col= ({ children, width }) => {

    const cols = index => Array.isArray(width) ? (width[index] || width[index -1] || null ) : [width][index] || null

    return (
        <div className={[
            gridStyles.col,
            cols(0) && gridStyles[`col-${cols(0)}`],
            cols(1) && gridStyles[`col-${cols(1)}-m`],
            cols(2) &&gridStyles[`col-${cols(2)}-s`],
        ].filter(c=>c).join(' ')}>{children}</div>
    )
}