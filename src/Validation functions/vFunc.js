export const nameValidation = (values, setErrors) => {
    const reg = /^[A-Za-z_ ]{6,}$/
    if(!values.firstname.match(reg)){
        setErrors((prevState) => ({
            ...prevState,
            firstname: "Only English letters and spaces!(min 6characters)",
        }));
    } else {
        setErrors((prevState) => ({
            ...prevState,
            firstname: '',
        }));
    }
}
export const lNameValidation = (values, setErrors) => {
    const reg = /^[A-Za-z_ ]{6,}$/
    if(!values.lastname.match(reg)){
        setErrors((prevState) => ({
            ...prevState,
            lastname: "Only English letters and spaces!(min 6characters)",
        }));
    } else {
        setErrors((prevState) => ({
            ...prevState,
            lastname: '',
        }));
    }
}
export const companyValidation = (values, setErrors) => {
    const reg = /^[A-Za-z_ ]{6,}$/
    if(!values.companyname.match(reg)){
        setErrors((prevState) => ({
            ...prevState,
            companyname: "Only English letters and spaces!(min 6characters)",
        }));
    } else {
        setErrors((prevState) => ({
            ...prevState,
            companyname: '',
        }));
    }
}

export const emailValidation = (values, errors, setErrors) => {
    const reg = /^[a-z0-9](\.?[a-z0-9]){2,}@g(oogle)?mail\.com$/
    if(!values.email.match(reg) || values.email !== ''){
        setErrors((prevState) => ({...prevState, email: "Invalid Email!"}));
    } else {
        setErrors((prevState) => ({...prevState, email: ""}));
    }
};

export const passwordValidation = (values, errors, setErrors) => {
    const reg = /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/
    if(!values.password.match(reg)){
        setErrors((prevState) => ({...prevState, password: 'Should be min 6 characters (1-lowercase, 1-Uppercase, 1-number, 1-spec symbol)!'}));
    } else {
        setErrors((prevState) => ({...prevState, password: ""}));
    }
}

export const passwordCheck = (values, setErrors) => {
    if(passwordValidation(values, setErrors) && values.password === values.confirmpassword){
        setErrors((prevState) => ({
            ...prevState,
            confirmpassword: '',
        }));} else {
        setErrors((prevState) => ({
            ...prevState,
            confirmpassword: 'Passwords mismatch!',
        }));
    }
}

export const nameInputs = [
    {
        id: 1,
        name: 'firstname',
        type: 'text',
        placeholder: 'First name',
        label: 'First name',
    },
    {
        id: 2,
        name: 'lastname',
        type: 'text',
        placeholder: 'Last name',
        label: 'Last name',
    }
]

export const inputs = [
    {
        id: 3,
        name: 'companyname',
        type: 'text',
        placeholder: 'Company name',
        label: 'Company name',
    },
    {
        id: 4,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        label: 'Email',
    },
    {
        id: 5,
        name: 'password',
        type: 'password',
        placeholder: 'Enter password',
        label: 'Password',
    },
    {
        id: 6,
        name: 'confirmpassword',
        type: 'password',
        placeholder: 'Repeat password',
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