import styles from '/front/styles/ui/Tabs.module.scss'

export default function Tabs ({ tabs=[], active='', onChange, ...rest }) {

    return(
        <div {...rest} className={styles.tabs}>
            {tabs.map((tab,i) => <div
                key={i}
                role="button"
                className={tab.value === active ? styles.active : null}
                onClick={() => onChange(tab.value)}
            >{tab.name}</div>)}
        </div>
    )
}