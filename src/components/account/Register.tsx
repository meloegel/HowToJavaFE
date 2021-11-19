import { useState, useEffect } from "react";
import * as yup from "yup";
import registrationSchema from "../../validation/registrationSchema";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router";
import Button from "../common/button/button";
import Header from "../common/header";

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

const initialDisabled = true;

export default function Register() {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
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
    const body = {
      username: formValues.username,
      password: formValues.password,
      primaryemail: formValues.primaryemail,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
      Accept: "*/*",
      "Content-Length": "100",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip, deflate, br",
    };
    request(`http://localhost:2019/createNewUser`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((res) => {
        if (data) {
          console.log("Success");
          localStorage.setItem("token", `Bearer ${data.access_token}`);
          history.push("/home");
        }
        alert(`
        Success! 
        Please log in on the next page.
        Please remember your credentials:
        Username: ${formValues.username}
        Password: ${formValues.password}
        `);
        history.push("/");
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
      <Header showUser={false} />
      <form onSubmit={onSubmit} className="bg-green-300 w-1/2 m-auto p-4">
        <h2 className="text-center text-4xl p-4 mb-2">Register</h2>
        <div className="flex justify-center p-4">
          <div className="text-right p-4">
            <div className="p-2 ">
              <label>Username</label>
              <input
                className="bg-gray-400 border-2 border-black m-2 "
                value={formValues.username}
                onChange={onInputChange}
                name="username"
                type="text"
              />
            </div>
            <div className="p-2 ">
              <label>Password</label>
              <input
                className="bg-gray-400 border-2 border-black m-2 "
                value={formValues.password}
                onChange={onInputChange}
                name="password"
                type="text"
              />
            </div>
            <div className="p-2 ">
              <label>Email</label>
              <input
                className="bg-gray-400 border-2 border-black m-2 "
                value={formValues.primaryemail}
                onChange={onInputChange}
                name="primaryemail"
                type="text"
              />
            </div>
          </div>
          <div>
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
            <div>{formErrors.primaryemail}</div>
          </div>
        </div>
        <div className="flex justify-evenly p-6">
          <Button
            text="Login"
            name="login"
            onClick={() => {
              history.push("/");
            }}
            className=" bg-gray-500 text-white "
          />
          <Button
            text="Submit"
            name="submit"
            disabled={disabled}
            onClick={() => {}}
            className=" bg-gray-500 text-white "
          />
        </div>
      </form>
    </div>
  );
}
