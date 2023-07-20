import styles from './Signup.module.css'
import {FormInput} from "../FormInput";
import {useState} from "react";
import {emailValidation, passwordValidation, nameValidation, lNameValidation, companyValidation, passwordCheck, nameInputs, inputs} from "../../Validation functions/vFunc.js";
import {Link} from "react-router-dom";

export const SignUp = () => {
    const [values, setValues] = useState({
            firstname: "",
            lastname: "",
            companyname: "",
            email: "",
            password: "",
            confirmpassword: "",
        }
    )


    const onChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value} );
        setErrors({
            ...errors,
            [e.target.name]: '',
        })
    };

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        nameValidation(values, setErrors);
        lNameValidation(values, setErrors);
        companyValidation(values, setErrors);
        emailValidation(values, setErrors);
        passwordValidation(values, setErrors);
        passwordCheck(values, setErrors);
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
                    <span>Already have an account? <Link to="/login"> Log in! </Link></span>
                </form>
            </div>
            <div className={styles.image}></div>
        </div>
    )
}