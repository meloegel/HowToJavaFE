import { useState, useEffect } from "react";
import * as yup from "yup";
import loginSchema from "../../validation/loginSchema";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router";
import Button from "../common/button/button";
import Header from "../common/header";

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
    const body = {
      grant_type: "password",
      username: formValues.username,
      password: formValues.password,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
    };
    const grant_type = `?grant_type=password&username=${formValues.username}&password=${formValues.password}`;

    request(`http://localhost:2019/login${grant_type}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    if (data) {
      console.log("Success");
      localStorage.setItem("token", `Bearer ${data.access_token}`);
      localStorage.setItem("username", `${formValues.username}`);
      history.push("/home");
    }
  };

  useEffect(() => {
    loginSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <Header showUser={false} />
      <form onSubmit={onSubmit} className="bg-blue-300 w-1/2 m-auto p-4">
        <h2 className="text-center text-4xl p-4 mb-2">Login</h2>
        <div className="text-center p-4">
          <div className="p-2">
            <label>Username</label>
            <input
              className="bg-indigo-300 border-2 border-white m-2 p-1 "
              value={formValues.username}
              onChange={onInputChange}
              name="username"
              type="text"
            />
          </div>
          <div className="p-2">
            <label>Password</label>
            <input
              className="bg-indigo-300 border-2 border-white m-2 p-1 "
              value={formValues.password}
              onChange={onInputChange}
              name="password"
              type="text"
            />
          </div>
        </div>
        <div>
          <div>{formErrors.username}</div>
          <div>{formErrors.password}</div>
        </div>
        <div className="flex justify-evenly p-6">
          <Button
            text="Login"
            name="login"
            onClick={() => {}}
            disabled={disabled}
            className=" bg-purple-400 text-white"
          />
          <Button
            text="Register"
            name="register"
            onClick={() => {
              history.push("/register");
            }}
            className=" bg-purple-400 text-white "
          />
        </div>
      </form>
    </div>
  );
}
