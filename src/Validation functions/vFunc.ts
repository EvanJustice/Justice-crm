export const nameValidation = (values, errors, setErrors) => {
    const reg = /^[A-Za-z_ ]{3,}$/
    if(!values.firstname.match(reg)){
        setErrors((prevState) => ({
            ...prevState,
            firstname: "Only English letters and spaces!(min 3characters)",
        }));
        return false
    } else {
        setErrors((prevState) => ({
            ...prevState,
            firstname: '',
        }));
        return true
    }
}
export const lNameValidation = (values, errors, setErrors) => {
    const reg = /^[A-Za-z_ ]{3,}$/
    if(!values.lastname.match(reg)){
        setErrors((prevState) => ({
            ...prevState,
            lastname: "Only English letters and spaces!(min 3characters)",
        }));
        return false
    } else {
        setErrors((prevState) => ({
            ...prevState,
            lastname: '',
        }));
        return true
    }
}
export const companyValidation = (values, errors, setErrors) => {
    const reg = /^[A-Za-z_ ]{3,}$/
    if(!values.companyname.match(reg)){
        setErrors((prevState) => ({
            ...prevState,
            companyname: "Only English letters and spaces!(min 3characters)",
        }));
        return false
    } else {
        setErrors((prevState) => ({
            ...prevState,
            companyname: '',
        }));
        return true
    }
}

export const emailValidation = (values, errors, setErrors) => {
    const reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    if(!values.email.match(reg) || values.email === ''){
        setErrors((prevState) => ({...prevState, email: "Invalid Email!"}));
        return false
    } else {
        setErrors((prevState) => ({...prevState, email: ""}));
        return true
    }
};

export const passwordValidation = (values, errors, setErrors) => {
    const reg = /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/
    if(!values.password.match(reg)){
        setErrors((prevState) => ({...prevState, password: 'invalid password!'}));
        return false
    } else {
        setErrors((prevState) => ({...prevState, password: ""}));
        return true
    }
}

export const passwordCheck = (values, errors, setErrors) => {
    if(values.password === values.confirmpassword && (values.password.length && values.confirmpassword.length)){
        setErrors((prevState) => ({
            ...prevState,
            confirmpassword: '',

        }));
        return true
    } else {
        setErrors((prevState) => ({
            ...prevState,
            confirmpassword: 'Passwords mismatch!',
        }));
        return false
    }
}

export const nameInputs = [
    {
        id: "1",
        name: 'firstname',
        type: 'text',
        label: 'First name',
    },
    {
        id: "2",
        name: 'lastname',
        type: 'text',
        label: 'Last name',
    }
]

export const inputs = [
    {
        id: "3",
        name: 'companyname',
        type: 'text',
        label: 'Company name',
    },
    {
        id: "4",
        name: 'email',
        type: 'text',
        label: 'Email',
    },
    {
        id: "5",
        name: 'password',
        type: 'password',
        label: 'Password',
    },
    {
        id: "6",
        name: 'confirmpassword',
        type: 'password',
        label: 'Repeat password',
    },
]

export const inputes = [
    {
        id: "7",
        name: 'email',
        type: 'text',
        label: 'Email',
    },
    {
        id: "8",
        name: 'password',
        type: 'password',
        label: 'Password',
    }
];