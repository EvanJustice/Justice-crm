import styles from './FormInput.module.css'
import {useState} from "react";

export const FormInput = (props) => {
    const { label, errorMessage, onChange, id, ...inputProps } = props;
    const [focused, setFocused] = useState(false);
    const handleFocus = () => {
        setFocused(true)
    }

    return(

        <div className={styles.content}>
            <label>{label}</label>
            <input
                className={styles.input}
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => inputProps.name === 'confirmpassword' && setFocused(true)}
                focused={focused.toString()}
                />
            <span>{errorMessage}</span>
        </div>
    )
}