import styles from './FormInput.module.css'


export const FormInput = (props) => {

    const { label, errors, errorMessage, name, onChange, id, ...inputProps} = props;

    return(
        <div className={styles.content}>
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