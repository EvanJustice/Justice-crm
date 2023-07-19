import styles from './Signup.module.css'
import {FormInput} from "../FormInput";
import {useState} from "react";

export const SignUp = () => {
    const [values, setValues] = useState({
        firstname:"",
        lastname:"",
        companyname:"",
        email:"",
        password:"",
        confirmpassword:"",
        }
    )
    const nameInputs = [
        {
            id: 1,
            name: 'firstname',
            type: 'text',
            placeholder: 'First name',
            errorMessage: 'Only English letters and spaces!(min 6characters)',
            label: 'First name',
        },
        {
            id: 2,
            name: 'lastname',
            type: 'text',
            placeholder: 'Last name',
            errorMessage: 'Only English letters and spaces!(min 6characters)',
            label: 'Last name',
        }
    ]
    const inputs = [
        {
            id: 3,
            name: 'companyname',
            type: 'text',
            placeholder: 'Company name',
            errorMessage: 'Only English letters and spaces!(min 6characters)',
            label: 'Company name',
        },
        {
            id: 4,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'Invalid Email!',
            label: 'Email',
        },
        {
            id: 5,
            name: 'password',
            type: 'password',
            placeholder: 'Enter password',
            errorMessage: 'Should be min 6 characters (1-lowercase, 1-Uppercase, 1-number, 1-spec symbol)!',
            label: 'Password',
        },
        {
            id: 6,
            name: 'confirmpassword',
            type: 'password',
            placeholder: 'Repeat password',
            errorMessage: 'Passwords mismatch!',
            label: 'Repeat password',
        },
    ]

    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value} );
    };
    console.log(values)
    const [errors, setErrors] = useState({});
    const nameValidation = () => {
        const reg = /^[A-Za-z_ ]{6,}$/
        if(!values.firstname.match(reg)){
            setErrors((prevState) => ({
                ...prevState,
                firstname: nameInputs[0].errorMessage,
            }));
        } else {
            setErrors((prevState) => ({
            ...prevState,
            firstname: '',
        }));
        }
    }
    const lNameValidation = () => {
        const reg = /^[A-Za-z_ ]{6,}$/
        if(!values.lastname.match(reg)){
            setErrors((prevState) => ({
                ...prevState,
                lastname: nameInputs[0].errorMessage,
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                lastname: '',
            }));
        }
        }
    const companyValidation = () => {
        const reg = /^[A-Za-z_ ]{6,}$/
        if(!values.companyname.match(reg)){
            setErrors((prevState) => ({
                ...prevState,
                companyname: nameInputs[0].errorMessage,
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                companyname: '',
            }));
        }
    }
    const emailValidation = () =>{
        const reg = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/
        if(!values.email.match(reg)){
            setErrors((prevState) => ({
                ...prevState,
                email: inputs[1].errorMessage,
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                email: '',
            }));
        }
    }
    const passwordValidation = () => {
        const reg = /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/
        if(!values.password.match(reg)){
            setErrors((prevState) => ({
                ...prevState,
                password: inputs[2].errorMessage,
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                password: '',
            }));
            return true;
        }
    }
    const passwordCheck = () => {
            if(passwordValidation() && values.password === values.confirmpassword){
            setErrors((prevState) => ({
                ...prevState,
                confirmpassword: '',
            }));} else {
            setErrors((prevState) => ({
                ...prevState,
                confirmpassword: inputs[3].errorMessage,
            }));
            console.log('ploxo');
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        nameValidation();
        lNameValidation();
        companyValidation();
        emailValidation();
        passwordValidation();
        passwordCheck();
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
                            <FormInput
                                key={input.id}
                                {...input}
                                errors={errors}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        ))}
                    </div>
                    {inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            errors={errors}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                        ))}
                    <input
                        type="submit"
                        value="Log in"
                        className={styles.submit}/>
                    <span>Already have an account? <a href="">Log in</a></span>
                </form>
            </div>
            <div className={styles.image}></div>
        </div>
    )
}