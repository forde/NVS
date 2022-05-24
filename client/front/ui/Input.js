import Label from './Label'

import styles from '/front/styles/ui/Input.module.scss'

export default function Input ({
    value,
    type,
    small,
    medium,
    disabled,
    icon: Icon,
    onChange,
    className,
    placeholder,
    label,
    multiline,
    suffix,
    style,
    ...rest
}) {

    const InputTag = multiline ? 'textarea' : 'input'

    return(
        <>
            {label && <Label style={{marginBottom: '4px'}}>{label}</Label>}
            <div
                style={style}
                className={[
                    styles.inputWrapper,
                    className,
                    small && styles.small,
                    medium && styles.medium,
                    disabled && styles.disabled,
                    Icon && styles.withIicon,
                    Icon && small && styles.withIconSmall,
                    Icon && medium && styles.withIconMedium,
                ].filter(c=>c).join(' ')}
            >
                <InputTag
                    type={type || 'text'}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    {...rest}
                />

                {suffix && <span className={styles.suffix}>{suffix}</span>}

                {Icon && <Icon color="#EAEBEB" />}

            </div>
        </>
    )
}