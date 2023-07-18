import styles from './Signup.module.css'
import img from '../../assets/img.png'
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
        {id: 1,
            name: 'firstname',
            type: 'text',
            placeholder: 'First name',
            errorMessage: 'Only English letters and spaces!(min 6characters)',
            label: 'First name',
            pattern:"^[A-Za-z_ ]{6,}$",
            required: true,},
        {id: 2,
            name: 'lastname',
            type: 'text',
            placeholder: 'Last name',
            errorMessage: 'Only English letters and spaces!(min 6characters)',
            label: 'Last name',
            pattern:"^[A-Za-z_ ]{6,}$",
            required: true,}
    ]
    const inputs = [
        {
            id: 3,
            name: 'companyname',
            type: 'text',
            placeholder: 'Company name',
            errorMessage: 'Only English letters and spaces!(min 6characters)',
            label: 'Company name',
            pattern:"^[A-Za-z_ ]{6,}$",
            required: true,
        },
        {
            id: 4,
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            errorMessage: 'Invalid Email!',
            label: 'Email',
            required: true,
        },
        {
            id: 5,
            name: 'password',
            type: 'password',
            placeholder: 'Enter password',
            errorMessage: 'Should be min 6 characters (1-lowercase, 1-Uppercase, 1-number, 1-spec symbol)!',
            label: 'Password',
            pattern: '^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$',
            required: true,
        },
        {
            id: 6,
            name: 'confirmpassword',
            type: 'password',
            placeholder: 'Repeat password',
            errorMessage: 'Passwords mismatch!',
            label: 'Repeat password',
            pattern: values.password,
            required: true,
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value });
    };
    console.log(values);
    return (
        <div className={styles.content}>
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
                            value={values[input.name]}
                            onChange={onChange} />
                    ))}
                </div>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange} />
                    ))}
                <input type="submit" value="Log in" className={styles.submit}/>
                <span>Already have an account? <a href="">Log in</a></span>
            </form>
            <div className={styles.image}>
                <img src={img} alt=""/>
            </div>
        </div>
    )
}