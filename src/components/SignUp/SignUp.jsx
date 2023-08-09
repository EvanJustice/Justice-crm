import styles from './Signup.module.css'

import {useEffect, useState} from "react";
import {
    emailValidation,
    passwordValidation,
    nameValidation,
    companyValidation,
    passwordCheck,
    nameInputs,
    inputs, lNameValidation
} from "../../Validation functions/vFunc.js";
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";

export const SignUp = ({auth, setAuth}) => {
    const [values, setValues] = useState({
            firstname: "",
            lastname: "",
            companyname: "",
            email: "",
            password: "",
            confirmpassword: "",
        }
    );
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem('users') ?? '[]') ?? [];
    const [userArray, setUserArray] = useState(user ?? []);
    useEffect(() => {
        if(userArray?.length > 0){
            localStorage.setItem('users', JSON.stringify(userArray))
        }
    },[userArray])

    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value} );
        setErrors({
            ...errors,
            [e.target.name]: '',
        })
        console.log('errors ---> ', errors)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        nameValidation(values, errors, setErrors);
        lNameValidation(values, errors, setErrors);
        companyValidation(values, errors, setErrors);
        emailValidation(values, errors, setErrors);
        passwordValidation(values, errors, setErrors);
        passwordCheck(values, errors, setErrors);

        if(nameValidation(values, errors, setErrors) &&
            lNameValidation(values, errors, setErrors) &&
            companyValidation(values, errors, setErrors) &&
            emailValidation(values, errors, setErrors) &&
            passwordValidation(values, errors, setErrors) &&
            passwordCheck(values, errors, setErrors)
        ) {
            const storageEmailCheck = userArray.filter((el) => (
                el?.email === values.email)
            )
            if(storageEmailCheck?.length > 0){
                alert('почта занята')
                console.log('наш массивчик --->', userArray)
            } else {
                console.log('тут сетим')
                setUserArray([...userArray, values])
                localStorage.setItem('auth', JSON.stringify(auth))
                setAuth(true)
                console.log('наш массивчик --->', userArray)}
        }
    }
    return (
        <div className={styles.content}>
            <div className={styles.form_flexbox}>
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                    <h1 className={styles.signH1}>Create an account</h1>
                    <div className={styles.nameBox}>
                        {nameInputs.map((input) => (
                            <div key={input.id} className={styles.content_}>
                                <TextField
                                    key={input.id}
                                    error={Boolean(errors[input?.name])}
                                    helperText={errors[input?.name]}
                                    margin="dense"
                                    fullWidth
                                    {...input}
                                    value={values[input.name]}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        ))}
                    </div>
                    {inputs.map((input) => (
                        <div key={input.id} className={styles.content__}>
                            <TextField
                                key={input.id}
                                error={Boolean(errors[input?.name])}
                                helperText={errors[input?.name]}
                                margin="normal"
                                fullWidth
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        </div>
                        ))}
                    <input
                        type="submit"
                        value="Log in"
                        className={styles.submit}/>
                    <span>Already have an account? <Link to="/login"> Log in! </Link></span>
                </form>
            </div>
            <div className={styles.image}></div>
        </div>
    )
}