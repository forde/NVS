import styles from '/front/styles/ui/Label.module.scss'

export default function Label ({ className, children, ...rest }) {
    return (
        <div className={[styles.label, className].filter(c=>c).join(' ')} {...rest}>{children}</div>
    )
}