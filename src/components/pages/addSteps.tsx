import { useEffect, useState } from "react";
import * as yup from "yup";
import stepSchema from "../../validation/stepSchema";
import Button from "../common/button/button";
import Header from "../common/header";
import NavBar from "../common/navBar";

const initialFormValues = {
  step: "",
};
const initialFormErrors = {
  step: "",
};

const initialDisabled = true;

const initialSteps: string[] = []

export default function AddSteps(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [stepDisabled, setStepDisabled] = useState(initialDisabled);
  const [removeStepAndSubmitDisabled, setRemoveStepAndSubmitDisabled] =
    useState(initialDisabled);
  const [steps, setSteps] = useState(initialSteps);
  const token = window.localStorage.getItem("token");
  const userid = window.localStorage.getItem("userid");
  const name = window.localStorage.getItem("name");
  const description = window.localStorage.getItem("description");
  const category = window.localStorage.getItem("category");
  const complexity = window.localStorage.getItem("complexity");

  const submitAllSteps = (evt: any) => {};

  const onStepSubmit = (evt: any) => {
    evt.preventDefault();
    steps.push(formValues.step)
  };


  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    yup
      .reach(stepSchema, name)
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

  useEffect(() => {
    stepSchema.isValid(formValues).then((valid) => {
      setStepDisabled(!valid);
    });
  }, [formValues]);

  useEffect(() => {
    if (steps.length !== 0) {
      setRemoveStepAndSubmitDisabled(false);
    } else {
      setRemoveStepAndSubmitDisabled(true);
    }
  }, [steps]);

  return (
    <div>
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4 ">
        <NavBar active={"addhowto"} />
        <div className="col-start-2 col-span-3 m-auto bg-blue-100 w-full h-full">
          <h2 className="text-center text-4xl p-4 mb-2">Add Steps</h2>
          <div className=" flex flex-col items-center bg-pink-200 w-1/3 m-auto p-4">
            <h3 className="text-3xl">Howto</h3>
            <div>
              <p className="text-lg">
                Name: <span className="text-xl font-medium">{name}</span>
              </p>
              <p className="text-lg">
                Description:{" "}
                <span className="text-xl font-medium">{description}</span>
              </p>
              <p className="text-lg">
                Category:{" "}
                <span className="text-xl font-medium">{category}</span>
              </p>
              {complexity === "" ? null : (
                <p className="text-lg">
                  Complexity:{" "}
                  <span className="text-xl font-medium">{complexity}</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            {(steps.length !== 0) ? <p>{steps.toString()}</p> : null}
          </div>
          <form onSubmit={onStepSubmit}>
            <div className="p-2 text-center">
              <label htmlFor="name">Step</label>
              <input
                className="bg-indigo-300 border-2 border-white m-2 p-1 w-52"
                value={formValues.step}
                onChange={onInputChange}
                name="step"
                type="text"
              />
            </div>
            <div className="flex justify-evenly p-6 w-1/2 m-auto">
              <Button
                text="Add Step"
                onClick={() => onStepSubmit}
                disabled={stepDisabled}
                className=" bg-purple-400 text-white w-44"
              />
              <Button
                text="Remove Last Step"
                onClick={() => {
                  // history.push("/home");
                }}
                disabled={removeStepAndSubmitDisabled}
                className=" bg-purple-400 text-white w-44 whitespace-nowrap"
              />
              <Button
                text="Submit Steps"
                onClick={() => submitAllSteps}
                disabled={removeStepAndSubmitDisabled}
                className=" bg-purple-400 text-white w-44 whitespace-nowrap"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}