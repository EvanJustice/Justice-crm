import styles from './Cabinet.module.css'
import {TextField} from "@mui/material";
import {inputs} from "./index.js";
import {ChangeEvent, useState} from "react";
import {emailValidation, passwordValidation} from '../../Validation functions/vFunc'
import {switchAction, toggleOpen} from "../../redux/snackBarSlice";
import {useAppDispatch} from "../../../hooks";
import {IUser, IErrorsAndValues} from '../../types/MyTypes'



export const Cabinet = () =>{
    const dispatch = useAppDispatch()
    const myObj = inputs.reduce((acc, el) => {
        return {...acc, [el.name]: el.defaultValue}
    }, {})
    const[errors, setErrors] = useState<IErrorsAndValues>({})
    const[values, setValues] = useState<IErrorsAndValues>(myObj)
    const[isDisabled, setIsDisabled] = useState<boolean>(true)

    const onSubmit = () => {
        const userID: number = JSON.parse(localStorage.getItem('userID') ?? "")
        const usersArray: IUser[]  = JSON.parse(localStorage.getItem('users') ?? "")
        const currentUser = usersArray.filter((el)=> (el.id === userID))[0]

        const newValues = (values: IErrorsAndValues) =>{
            const val = {...values}
            delete val.password
            delete val.oldpassword
            return val
        }

        const checkLength = (obj: IErrorsAndValues) => {
            for(const key in obj){
                    if(obj[key as keyof typeof obj]!.length >= 3){
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
                dispatch(switchAction('editProf'))
                dispatch(toggleOpen())
                setIsDisabled(true)
            } else {
                if(checkOld() && passwordValidation(values, errors, setErrors)){
                    const updatedUsers = usersArray.map((obj) => {
                        if(obj.id === currentUser.id){
                            let newCurrentUser;
                            newCurrentUser = {...obj, ...values};
                            delete newCurrentUser.oldpassword
                            if(newCurrentUser.confirmpassword){
                                delete newCurrentUser.confirmpassword}
                            return newCurrentUser
                        }
                        return obj
                    })
                    localStorage.setItem("users", JSON.stringify(updatedUsers))
                    dispatch(switchAction('editPass'))
                    dispatch(toggleOpen())
                    setIsDisabled(true)
                    setValues({...values, oldpassword:'', password:'' })
                }
            }
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((prevState) =>  ({...prevState, [e.target.name]: e.target.value}))
        setErrors((prevState) =>  ({...prevState, [e.target.name]: ''}))
        setIsDisabled(false)
    }

    return (
        <div className={styles.content}>
            <div className={styles.container}>
                {
                    inputs.map((el, index) => (
                        <TextField
                            size='small'
                            key={index}
                            type={el.type}
                            error={Boolean(errors[el?.name as keyof typeof errors])}
                            helperText={errors[el?.name as keyof typeof errors]}
                            name={el.name}
                            label={el.label}
                            className={styles[el.classname]}
                            value={values[el.name as keyof typeof values]}
                            onChange={(e) => onChange(e)}
                        />
                    ))
                }
                <button disabled={isDisabled} onClick={()=>onSubmit()} className={styles.button}>Save changes</button>
            </div>
        </div>
    )
}