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
} from "../../Validation functions/vFunc.ts";
import {Link} from "react-router-dom";
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {toggleAuth} from "../../redux/authSlice.ts";
import {addUser} from "../../redux/usersSlice.ts";

export const SignUp = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    const users = useSelector((state) => state.users)
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

    useEffect(() => {
            localStorage.setItem('users', JSON.stringify(users))
    },[users])

    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value} );
        setErrors({
            ...errors,
            [e.target.name]: '',
        })
    };

    const handleSubmit = (e) => {
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
                const usersFromStorage = JSON.parse(localStorage.getItem('users'))
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