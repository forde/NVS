import styles from '/front/styles/ui/Radio.module.scss'

const Checkmark = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" >
    <polygon fill="#1F1A22" points="6.05975342 9.93658447 10.0007629 13.8756714 17.9388733 5.93614197 20.0621185 8.05975342 10.0007629 18.1184998 3.93916321 12.0574646"></polygon>
</svg>

export default function Radio ({
    type='radio',
    className,
    name,
    onChange,
    value,
    checked,
    label,
    description,
    style,
    disabled,
}) {

    const id = (type+'-'+value+'-'+name).replace(' ', '')

    return (
        <div
            className={[styles.radio, className].filter(x=>x).join(' ')}
            style={style}
        >
            <input
                type={type || 'radio'}
                id={id}
                name={name}
                value={value}
                onChange={e => onChange(e.target.value)}
                checked={checked}
                disabled={disabled}
            />
            <label htmlFor={id}>
                <i className={[
                    styles.icon,
                    type === 'radio' && styles.iconRadio,
                    type === 'checkbox' && styles.iconCheckbox,
                    type === 'radio' && checked && styles.iconRadioSelected,
                    type === 'checkbox' && checked &&  styles.iconCheckboxChecked,
                ].filter(x=>x).join(' ')}>
                    {type === 'checkbox' && <Checkmark/>}
                </i>
                <div>
                    <div className={styles.label}>{label}</div>
                    {description && <div className={styles.description}>{description}</div>}
                </div>
            </label>
        </div>
    );
}