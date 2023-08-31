import styles from './FormInput.module.css'


export const FormInput = (props) => {
    const { label, errors, name, onChange, id, ...inputProps} = props;

    return(
        <div className={styles.container} key={id}>
            <label>{label}</label>
            <input
                name={name}
                className={styles.input}
                {...inputProps}
                onChange={onChange}
                />
            <span id='err' className={styles.error}>{errors[name] ?? ''}</span>
        </div>
    )
}