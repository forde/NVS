import { useRef, useEffect, useState } from 'react'

import styles from '/front/styles/ui/Bars.module.scss'

export default function Bars ({ opacity=.3 }) {

    const wrapperRef = useRef(null)

    const barWidth = 20 // if changed styles need to be adjusted as well

    const [ barCount, setBarCount ] = useState(0)

    useEffect(() => {
        const bcr = wrapperRef?.current?.getBoundingClientRect()
        if(bcr) {
            setBarCount(Math.ceil(bcr.width / barWidth)+1)
        }
    }, [])

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            style={{
                opacity: opacity
            }}
        >
            <div>
                {[...Array(barCount).keys()].map(i => <span key={i}/>)}
            </div>
        </div>
    )
}