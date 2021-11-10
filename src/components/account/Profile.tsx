import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../common/button/button";
import Header from "../common/header";
import NavBar from "../common/navBar";

const initialFormValues = {
  username: "",
  password: "",
  primaryemail: "",
};

export default function Profile(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();

  const onInputChange = (evt: any) => {
    evt.preventDefault();
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <div>
      <Header showUser={true} />
      <div>
        <h2>Profile</h2>
        <div className="">
          <NavBar active={"profile"} />
          <form>
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
            </div>
            <div className="flex justify-evenly p-6">
              <Button
                text="Login"
                onClick={() => {}}
                className=" bg-gray-500 text-white "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
