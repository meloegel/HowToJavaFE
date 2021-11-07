import { useState, useEffect } from "react";
import * as yup from "yup";
import registrationSchema from "../../validation/registrationSchema";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router";
import Button from "../common/button/button";


const initialFormValues = {
  username: "",
  password: "",
  primaryemail: "",
};

const initialFormErrors = {
  username: "",
  password: "",
  primaryemail: "",
};

const initalDisabled = true;

export default function Register() {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initalDisabled);
  const [request, data] = useFetch<any>();

  const onInputChange = (evt: any) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(registrationSchema, name)
      .validate(value)
      .then((valid: any) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((error: any) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    // const body = {
    //     username: formValues.username,
    //     password: formValues.password,
    //     primaryemail: formValues.primaryemail
    // }
    // console.log(JSON.stringify(body))
    const test = `?username=${formValues.username}&password=${formValues.password}&primaryemail=${formValues.primaryemail}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
      Accept: "*/*",
    };
    request(`http://localhost:2019/createNewUser${test}`, {
      method: "POST",
      headers: headers,
      // requestBody: JSON.stringify(body)
    })
      .then((res) => {
        if (data) {
          console.log("Success");
          localStorage.setItem("token", `Bearer ${data.access_token}`);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    registrationSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <label>Username</label>
        <input className="bg-gray-400 border-2 border-black m-2" />
        <label>Password</label>
        <input
          className="bg-gray-400 border-2 border-black m-2"
          value={formValues.password}
          onChange={onInputChange}
          name="password"
          type="text"
        />
        <label>Email</label>
        <input
          className="bg-gray-400 border-2 border-black m-2"
          value={formValues.primaryemail}
          onChange={onInputChange}
          name="primaryemail"
          type="text"
        />
        <div>
          <div>{formErrors.username}</div>
          <div>{formErrors.password}</div>
          <div>{formErrors.primaryemail}</div>
        </div>

        <div>
          <Button
            text="Submit"
            disabled={disabled}
            onClick={() => {}}
            className=" bg-gray-500 text-white "
          />
          <Button
            text="Login"
            onClick={() => {
              history.push("/");
            }}
            className=" bg-gray-500 text-white "
          />
        </div>
      </form>
    </div>
  );
}
