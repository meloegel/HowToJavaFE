import { useState, useEffect } from "react";
import * as yup from "yup";
import loginSchema from "../../validation/loginSchema";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router";
import Button from "../common/button/button";

const initialFormValues = {
  username: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  password: "",
};

const initalDisabled = true;

export default function Login() {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initalDisabled);
  const [request, data] = useFetch<any>();

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(loginSchema, name)
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
    //     grant_type: "password",
    //     username: formValues.username,
    //     password: formValues.password,
    // }
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    };
    const grant_type = `?grant_type=password&username=${formValues.username}&password=${formValues.password}`;

    request(`http://localhost:2019/login${grant_type}`, {
      method: "POST",
      // requestBody: JSON.stringify(body),
      headers: headers,
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
    loginSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <input
          className="bg-gray-400 border-2 border-black m-2"
          value={formValues.username}
          onChange={onInputChange}
          name="username"
          type="text"
        />
        <input
          className="bg-gray-400 border-2 border-black m-2"
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
          <Button
            text="Register"
            onClick={() => {
              history.push("/register");
            }}
            className=" bg-gray-500 text-white "
          />
          <Button
            text="Login"
            onClick={() => onSubmit}
            disabled={disabled}
            className=" bg-gray-500 text-white "
          />
        </div>
      </form>
    </div>
  );
}
