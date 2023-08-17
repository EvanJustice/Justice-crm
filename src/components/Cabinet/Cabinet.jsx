import styles from './Cabinet.module.css'
import { TextField } from "@mui/material";
import {inputs} from "./index.js";
import { useState} from "react";
import {emailValidation, passwordValidation} from '../../Validation functions/vFunc.js'
import {SnackBar} from "../SnackBar/SnackBar.jsx";
import {useDispatch} from "react-redux";
import {toggleOpen} from "../../app/snackBarSlice.js";

export const Cabinet = () =>{
    const dispatch = useDispatch()
    const myObj = inputs.reduce((acc, el) => {
        return {...acc, [el.name]: el.defaultValue}
    }, {})
    const[errors, setErrors] = useState({})
    const[values, setValues] = useState(myObj)
    const[isDisabled, setIsDisabled] = useState(true)
    const onSubmit = () => {
        const userID = JSON.parse(localStorage.getItem('userID'))
        const usersArray = JSON.parse(localStorage.getItem('users'))
        const currentUser = usersArray.filter((el)=> (el.id === userID))[0]
        const newValues = (values) =>{
            const val = {...values}
            delete val.password
            delete val.oldpassword
            return val
        }

        const checkLength = (obj) => {
            for(const key in obj){
                    if(obj[key].length >= 3){
                        setErrors((prev) =>({...prev,  [`${key}`]: ''}))
                }
                 else {
                    setErrors((prev) =>({...prev,  [`${key}`]: 'fill the field'}))
                        return true
                }
            }
        }
        const checkOld = () => {
            if(values.oldpassword === currentUser.password){
                setErrors((prev) =>({...prev, oldpassword: ''}))
                return true
            }else {
                setErrors((prev) =>({...prev, oldpassword: 'invalid Old password'}))
                return false
            }
        }
        if ( emailValidation(values, errors, setErrors) &&
            !checkLength(newValues(values)) && !errors.firstname &&
            !errors.lastname && !errors.companyname) {
            if(!values.password && !values.oldpassword){
                const updatedUsers = usersArray.map((obj) => {
                    if(obj.id === currentUser.id){
                        let newCurrentUser;
                        newCurrentUser = {...obj, ...newValues(values)};
                        return newCurrentUser
                    }
                    return obj
                })
                localStorage.setItem("users", JSON.stringify(updatedUsers))
                dispatch(toggleOpen())
                setIsDisabled(true)
            } else {
                if(checkOld() && passwordValidation(values, errors, setErrors)){
                    const updatedUsers = usersArray.map((obj) => {
                        if(obj.id === currentUser.id){
                            let newCurrentUser;
                            newCurrentUser = {...obj, ...values};
                            delete newCurrentUser.oldpassword
                            delete newCurrentUser.confirmpassword
                            return newCurrentUser
                        }
                        return obj
                    })
                    localStorage.setItem("users", JSON.stringify(updatedUsers))
                    dispatch(toggleOpen())
                    setIsDisabled(true)
                    setValues({...values, oldpassword:'', password:'' })
                }
            }
        }
    }

    const onChange = (e) => {
        setValues((prevState) =>  ({...prevState, [e.target.name]: e.target.value}))
        setErrors((prevState) =>  ({...prevState, [e.target.name]: ''}))
        setIsDisabled(false)
    }

    return (
        <>
        <div className={styles.container}>
            <SnackBar/>
            {
                inputs.map((el, index) => (
                    <TextField
                        size='small'
                        key={index}
                        type={el.type}
                        error={Boolean(errors[el?.name])}
                        helperText={errors[el?.name]}
                        name={el.name}
                        label={el.label}
                        className={styles[el.classname]}
                        value={values[el.name]}
                        onChange={(e) => onChange(e)}
                    />
                ))
            }
        </div>
            <button disabled={isDisabled} onClick={()=>onSubmit()} className={styles.button}>Save changes</button>
        </>
    )
}