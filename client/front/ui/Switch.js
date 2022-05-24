import styles from '/front/styles/ui/Switch.module.scss'

export default function Switch ({ on, style, onChange }) {
    return(
        <div
            className={[
                styles.switch,
                on && styles.on,
            ].filter(c=>c).join(' ')}
            style={style}
            onClick={() => onChange(!on)}
        />
    )
}

