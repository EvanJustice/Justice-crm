import styles from './Signin.module.css'
import React, {useState} from "react";
import {emailValidation, passwordValidation, inputes} from "../../Validation functions/vFunc";
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";

import {toggleAuth} from "../../redux/authSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IErrorsAndValues, IUser} from "../../types/MyTypes";

export const SignIn = () => {
    const auth = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()
    const [values, setValues] = useState<IErrorsAndValues>({
        email:"",
        password:"",
    });

    const [errors, setErrors] = useState<IErrorsAndValues>({
        email:"",
        password:"",
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setValues({...values, [e.target.name]: e.target.value} );
        setErrors({
            ...errors,
            [e.target.name]: '',
        })
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailValidation(values, errors, setErrors) && passwordValidation(values, errors, setErrors)) {
            const usersFromStorage: IUser[] = JSON.parse(localStorage.getItem('users') ?? '')
            const filterUsers = usersFromStorage.filter((el) => (
                el.email === values.email && el.password === values.password
            ))
            if (filterUsers.length > 0){
                localStorage.setItem('userID', JSON.stringify(filterUsers[0].id))
                dispatch(toggleAuth(auth))
            }
        }
            else if(!emailValidation(values, errors, setErrors) || !passwordValidation(values, errors, setErrors)) {
                 alert('неправильная почта или пароль')
        }
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
                                        error={Boolean(errors[input?.name as keyof object])}
                                        helperText={errors[input.name as keyof object]}
                                        margin='normal'
                                        fullWidth
                                        value={values[input.name as keyof object]}
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