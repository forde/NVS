import React from 'react'

import styles from '/front/styles/ui/Loader.module.scss'

export default function LoadingCircle({ color, style }) {
    return (
        <div color={color} style={style} className={styles.wrapper}>
            {[...Array(12).keys()].map(i => <div key={i} ><span style={{background: color || '#fff'}}/></div>)}
        </div>
    )
}