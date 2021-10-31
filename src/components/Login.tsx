import {useState, useEffect} from "react";
import * as yup from "yup";
import loginSchema from "../validation/loginSchema";


const initialFormValues = {
    username: "",
    password: ""
}

const initialFormErrors = {
    username: "",
    password: ""
}

const initalDisabled = true;

export default function Login() {
const [formValues, setFormValues] = useState(initialFormValues);
const [formErrors, setFormErrors] = useState(initialFormErrors);
const [disabled, setDisabled] = useState(initalDisabled);


const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup.reach(loginSchema, name)
    .validate(value)
    .then((valid: any) => {
        setFormErrors({
            ...formErrors,
            [name]: "",
        })
    })
    .catch((error: any) => {
        setFormErrors({
            ...formErrors,
            [name]: error.errors[0],
        })
    })
    setFormValues({
        ...formValues,
        [name]:value
    });
};

const onSubmit = (evt:any) => {
    evt.preventDefault();
    // const headers = {
    //     username: formValues.username,
    //     password: formValues.password
    // }
    // login("http://localhost:2019/login", {
    //     headers: headers,
    //     method: "POST"
    // }).then((res: any) => {
    //     localStorage.setItem('token', res.data.token)
    //     localStorage.setItem('userId', res.data.user.id)
    // }).catch((error) =>
    //     console.log(error)
    // )
}


useEffect(() => {
    loginSchema.isValid(formValues).then((valid) => {
        setDisabled(!valid);
    });
}, [formValues]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <input 
                    value={formValues.username}
                    onChange={onInputChange}
                    name="username"
                    type="text"
                />
                <input 
                    value={formValues.password}
                    onChange={onInputChange}
                    name="password"
                    type="text"
                />
                <div>
                    <div>{formErrors.username}</div>
                    <div>{formErrors.password}</div>
                </div>
                <div>
                    <div>
                        <h3>Register</h3>
                        <button onClick={() => {}}>Register</button>
                    </div>
                    <div>
                        <h3>Login</h3>
                        <button
                        disabled={disabled} 
                        onClick={() => {}}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}