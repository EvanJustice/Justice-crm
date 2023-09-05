import styles from './Signup.module.css'

import React, {useEffect, useState} from "react";
import {
    emailValidation,
    passwordValidation,
    nameValidation,
    companyValidation,
    passwordCheck,
    nameInputs,
    inputs, lNameValidation
} from "../../Validation functions/vFunc";
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";
import {toggleAuth} from "../../redux/authSlice";
import {addUser} from "../../redux/usersSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {IErrorsAndValues, IUser} from "../../types/MyTypes";

export const SignUp = () => {
    const dispatch = useAppDispatch()
    const auth = useAppSelector((state) => state.auth)
    const users = useAppSelector((state) => state.users)
    const [values, setValues] = useState<IErrorsAndValues>({
            firstname: "",
            lastname: "",
            companyname: "",
            email: "",
            password: "",
            confirmpassword: "",
        }
    );

    const [errors, setErrors] = useState<IErrorsAndValues>({});

    useEffect(() => {
            localStorage.setItem('users', JSON.stringify(users))
    },[users])

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setValues({...values, [e.target.name]: e.target.value} );
        setErrors({
            ...errors,
            [e.target.name]: '',
        })
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(nameValidation(values, errors, setErrors) &&
            lNameValidation(values, errors, setErrors) &&
            companyValidation(values, errors, setErrors) &&
            emailValidation(values, errors, setErrors) &&
            passwordValidation(values, errors, setErrors) &&
            passwordCheck(values, errors, setErrors)
        ) {
            const storageEmailCheck = users.filter((el) => (
                el?.email === values.email)
            )
            if(storageEmailCheck?.length > 0){
                alert('почта занята')
            } else {
                dispatch(addUser(values))
                const usersFromStorage: IUser[] = JSON.parse(localStorage.getItem('users') ?? '')
                const filterUsers = usersFromStorage.filter((el) => (
                    el.email === values.email && el.password === values.password
                ))
                if (filterUsers.length > 0){
                    localStorage.setItem('userID', JSON.stringify(filterUsers[0].id))
                }
                dispatch(toggleAuth(auth))
            }
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
                                    error={Boolean(errors[input?.name as keyof object])}
                                    helperText={errors[input?.name as keyof object]}
                                    margin="dense"
                                    fullWidth
                                    {...input}
                                    value={values[input.name as keyof object]}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                        ))}
                    </div>
                    {inputs.map((input) => (
                        <div key={input.id} className={styles.content__}>
                            <TextField
                                key={input.id}
                                error={Boolean(errors[input?.name as keyof object])}
                                helperText={errors[input?.name as keyof object]}
                                margin="normal"
                                fullWidth
                                {...input}
                                value={values[input.name as keyof object]}
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