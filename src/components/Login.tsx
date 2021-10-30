import React, {useState, useEffect} from "react";

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

    setFormValues({
        ...formValues,
        [name]:value
    })
}

useEffect(() => {
    
})

    return (
        <div>
            <form>
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
                        <button onClick={() => {}}>Login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}