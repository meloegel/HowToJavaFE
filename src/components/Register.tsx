import {useState, useEffect} from "react";
import * as yup from "yup";
import registrationSchema from "../validation/registrationSchema";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router";


const initialFormValues = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: ""
}

const initialFormErrors = {
    username: "",
    password: "",
    passwordConfirm: "",
    email: ""
}

const initalDisabled = true;

export default function Login() {
const history = useHistory();    
const [formValues, setFormValues] = useState(initialFormValues);
const [formErrors, setFormErrors] = useState(initialFormErrors);
const [disabled, setDisabled] = useState(initalDisabled);
const [ , request, data] = useFetch<any>();

const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup.reach(registrationSchema, name)
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
    // const body = {
    //     grant_type: "password",
    //     username: formValues.username,
    //     password: formValues.password,
    // }
    // const headers = {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`
    // }
    // const grant_type = `?grant_type=password&username=${formValues.username}&password=${formValues.password}`
   
    // request(`http://localhost:2019/login${grant_type}`,  {
    //     method: "POST",
    //     requestBody: JSON.stringify(body),
    //     headers: headers
    // }).then((res) => {
    //     if (data) {
    //         console.log("Success")
    //         localStorage.setItem('token', `Bearer ${data.access_token}`)
    //     }
    // }).catch((error) =>
    //     console.log(error)
    // )
}


useEffect(() => {
    registrationSchema.isValid(formValues).then((valid) => {
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
                  <input 
                    value={formValues.passwordConfirm}
                    onChange={onInputChange}
                    name="passwordConfirm"
                    type="text"
                />
                <input 
                    value={formValues.email}
                    onChange={onInputChange}
                    name="email"
                    type="text"
                />
                <div>
                    <div>{formErrors.username}</div>
                    <div>{formErrors.password}</div>
                    <div>{formErrors.passwordConfirm}</div>
                    <div>{formErrors.email}</div>
                </div>
                <div>
                    <div>
                        <h3>Register</h3>
                        <button 
                        disabled={disabled} 
                        onClick={() => {}}>Submit</button>
                    </div>
                    <div>
                        <h3>Login</h3>
                        <button
                        onClick={() => {history.push("/login")}}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}