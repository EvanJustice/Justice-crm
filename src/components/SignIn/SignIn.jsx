import styles from './Signin.module.css'
import {useState} from "react";
import {FormInput} from "../FormInput/index.js";
import {emailValidation, passwordValidation, inputes} from "../../Validation functions/vFunc.js";
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";

export const SignIn = () => {
    const [values, setValues] = useState({
        email:"",
        password:"",
    });
    const [errors, setErrors] = useState({
        email:"",
        password:"",
    });
    const [focus, setFocus] = useState(false)
    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value} );
        setErrors({
            ...errors,
            [e.target.name]: '',
        })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        emailValidation(values, errors, setErrors);
        passwordValidation(values, errors, setErrors);
    }
    return (
        <div className={styles.content_}>
            <div className={styles.form_flexbox}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1 className={styles.signH1}>Sign in</h1>
                        {inputes.map((input, key) => (
                            <div key={`${input?.id}-${key}`} className={styles.input__}>
                                <TextField
                                        key={`${input?.id}-${key}`}
                                        {...input}
                                        error={Boolean(errors[input?.name])}
                                        helperText={errors[input.name]}
                                        margin='normal'
                                        fullWidth
                                        value={values[input.name]}
                                        onChange={(e) => onChange(e)}
                                    />
                            </div>
                            ))}
                    <input type="submit" value="Log in" className={styles.submit}/>
                    <Link to="/register"> Forgot password? </Link>
                </form>
            </div>
            <div className={styles.image}>
            </div>
        </div>
    )
}