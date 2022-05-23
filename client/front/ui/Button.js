import Loader from './Loader'

import styles from '/front/styles/ui/Button.module.scss'

export default function Button ({
    children,
    small,
    medium,
    sharp,
    secondary,
    tertiary,
    disabled,
    busy,
    icon: Icon,
    onClick,
    className,
    ...rest
}) {

    return( 
        <button
            onClick={e => (!onClick || disabled || busy) ? null : onClick(e)}
            className={[
                className,
                styles.button,
                small && styles.small,
                medium && styles.medium,
                secondary && styles.secondary,
                tertiary && styles.tertiary,
                sharp && styles.sharp,
                (disabled || busy) && styles.disabled,
                (Icon && !children && medium || small) && styles.smallPadding,
            ].filter(c=>c).join(' ')}
            {...rest}
        >
            {(() => {
                if(busy) return <Loader
                    color={tertiary ? 'black' : 'white'}
                    style={{ transform: `scale(${medium || small ? .8 : 1})`}}
                />
                if(Icon && !children) {
                    return <Icon style={{transform: `scale(${medium || small ? 1.2 : 1.4})`}}/>
                }
                if(Icon && children) {
                    return <>
                        <Icon style={{transform: `scale(${medium || small ? 1.2 : 1.4})`, marginRight: '6px'}}/>
                        {children}
                    </>
                }
                return children
            })()}
        </button>
    )
}