import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Button from "../common/button/button";
import Header from "../common/header";
import NavBar from "../common/navBar";

const initialFormValues = {
  username: "",
  primaryemail: "",
  roles: [],
};

export default function Profile(): JSX.Element {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();
  const [userId, setUserId] = useState();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/users/getuserinfo`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => {
        console.log(data);
        if (data) {
          var test = { username: "", primaryemail: "", roles: [], userid: "" };
          test.username = data.username;
          test.primaryemail = data.primaryemail;
          test.roles = data.roles;
          test.userid  = data.userid;
          console.log(test);
          setFormValues(test);
          setUserId(data.userid);
        }
      })
      .catch((error) => console.log(error));
  };

  console.log(data);

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    const body = {
      username: formValues.username,
      primaryemail: formValues.primaryemail,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
      Accept: "*/*",
      "Content-Length": "100",
      Connection: "keep-alive",
      "Accept-Encoding": "gzip, deflate, br",
    };
    request(`http://localhost:2019/users/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then((res) => {
        if (data) {
          console.log("Success");
        }
        alert(`Success!`);
      })
      .catch((error) => console.log(error));
  };

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
        <div className="grid grid-cols-4">
          <NavBar active={"profile"} className=""/>
          <form onSubmit={onSubmit} className="col-start-3 m-auto">
            <h2 className="text-center text-4xl p-4 mb-2">Profile</h2>
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
                text="Update Profile"
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
