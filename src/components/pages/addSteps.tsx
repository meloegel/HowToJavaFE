import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import * as yup from "yup";
import useFetch from "../../hooks/useFetch";
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

const initialSteps: string[] = [];

export default function AddSteps(): JSX.Element {
  const [request, data] = useFetch<any>();
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [stepDisabled, setStepDisabled] = useState(initialDisabled);
  const [removeStepDisabled, setRemoveStepDisabled] = useState(initialDisabled);
  const [steps, setSteps] = useState(initialSteps);
  const [submit, setSubmit] = useState(0);
  const token = window.localStorage.getItem("token");
  const userid = window.localStorage.getItem("userid");
  const name = window.localStorage.getItem("howtoName");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [complexity, setComplexity] = useState("");
  const [howtoID, setHowtoID] = useState(0);
  const [stepID, setStepID] = useState(0);

  const onSubmit = (evt: any) => {
    if (submit === 1) {
      evt.preventDefault();
      setSteps([...steps, formValues.step]);
      const body = {
        step: formValues.step,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: token!,
      };
      request(`http://localhost:2019/steps/step/${howtoID}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
    } else if (submit === 2) {
      evt.preventDefault();
      setSteps(steps.slice(0, -1));
      const headers = {
        "Content-Type": "application/json",
        Authorization: token!,
      };
      request(`http://localhost:2019/steps/step/${stepID}`, {
        method: "DELETE",
        headers: headers,
      });
    } else if (submit === 3) {
      history.push("/home");
    }
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
      setRemoveStepDisabled(false);
    } else {
      setRemoveStepDisabled(true);
    }
  }, [steps]);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/howtos/howto/name/${name}`, {
      method: "GET",
      headers: headers,
    });
  }, [request, token]);

  useEffect(() => {
    console.log(data);
    if (data) {
      if (data.howtoid) {
        setCategory(data.category);
        setComplexity(data.complexity);
        setDescription(data.description);
        setHowtoID(data.howtoid);
      } else if (data.stepid) {
        setStepID(data.stepid)
      }
    }
  }, [data]);

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
          <div className="flex flex-col justify-center text-center">
            {steps.length !== 0 ? <p>{steps.toString()}</p> : null}
          </div>
          <form onSubmit={onSubmit}>
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
                name="addStep"
                onClick={() => setSubmit(1)}
                disabled={stepDisabled}
                className=" bg-purple-400 text-white w-44"
              />
              <Button
                text="Remove Last Step"
                name="remove"
                onClick={() => setSubmit(2)}
                disabled={removeStepDisabled}
                className=" bg-purple-400 text-white w-44 whitespace-nowrap"
              />
              <Button
                text="Complete"
                name="complete"
                onClick={() => setSubmit(3)}
                className=" bg-purple-400 text-white w-44 whitespace-nowrap"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
