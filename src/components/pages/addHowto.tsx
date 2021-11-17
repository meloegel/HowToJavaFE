import { useState, useEffect } from "react";
import * as yup from "yup";
import howtoSchema from "../../validation/howtoSchema";
import Select, { Option } from "../common/select";
import useFetch from "../../hooks/useFetch";
import Header from "../common/header";
import NavBar from "../common/navBar";
import Button from "../common/button/button";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

const initialFormValues = {
  name: "",
  description: "",
  category: "",
  complexity: "", // Not required
};

const initialFormErrors = {
  name: "",
  description: "",
  category: "",
  complexity: "",
};

const initialDisabled = true;

export default function AddHowto(): JSX.Element {
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [request, data] = useFetch<any>();

  const complexityOptions: Option[] = [
    { display: "Please Select", value: "" },
    { display: "Easy", value: "easy" },
    { display: "Medium", value: "medium" },
    { display: "Hard", value: "hard" },
  ];

  const complexityInputChange = (complexity: string) => {
    setFormValues({
      ...formValues,
      ["complexity"]: complexity,
    });
  };

  const onInputChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;
    yup
      .reach(howtoSchema, name)
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
  };

  useEffect(() => {
    howtoSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <Header showUser={true} />
      <div className="grid gird-cols-4 gap-6 p-4">
        <NavBar active={"addhowto"} />
        <form
          onSubmit={onSubmit}
          className="col-start-2 col-span-3 m-auto bg-yellow-200 w-4/5 p-4 h-full text-center"
        >
          <h2 className="text-center text-4xl p-4 mb-2">Add HowTo</h2>
          <div className="mt-16">
            <div className="w-4/6 text-right">
              <div className="p-2 ">
                <label htmlFor="name">Name</label>
                <input
                  className="bg-indigo-300 border-2 border-white m-2 p-1 "
                  value={formValues.name}
                  onChange={onInputChange}
                  name="name"
                  type="text"
                />
              </div>
              <div className="p-2">
                <label htmlFor="description">Description</label>
                <input
                  className="bg-indigo-300 border-2 border-white m-2 p-1 "
                  value={formValues.description}
                  onChange={onInputChange}
                  name="description"
                  type="text"
                />
              </div>
              <div className="p-2">
                <label htmlFor="category">Category</label>
                <input
                  className="bg-indigo-300 border-2 border-white m-2 p-1 "
                  value={formValues.category}
                  onChange={onInputChange}
                  name="category"
                  type="text"
                />
              </div>
              <div className="p-2 mr-8">
                <label htmlFor="complexity">Complexity</label>
                <Select
                  id="complexitySelect"
                  options={complexityOptions}
                  className="ml-4 text-xl bg-indigo-300 border-2 p-1 border-white"
                  onChange={complexityInputChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div>{formErrors.name}</div>
          </div>
          <div className="flex justify-evenly p-6 mt-10">
            <Button
              text="Submit"
              onClick={() => {}}
              disabled={disabled}
              className=" bg-purple-400 text-white"
            />
            <Button
              text="Cancel"
              onClick={() => {
                history.push("/home");
              }}
              className=" bg-purple-400 text-white "
            />
          </div>
        </form>
      </div>
    </div>
  );
}
