import { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
  const history = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);
  const [request, data] = useFetch<any>();
  const [userId, setUserId] = useState();
  const token = window.localStorage.getItem("token");

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    const body = {
      userid: userId,
      username: formValues.username,
      primaryemail: formValues.primaryemail,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/users/user/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers,
    })
      .then(() => {
        if (data) {
          console.log("Success");
          alert(`
           Success!
           Please log back in with your new username
           `);
          window.localStorage.clear();
          history.push("/");
        }
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

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: token!,
    };
    request(`http://localhost:2019/users/getuserinfo`, {
      method: "GET",
      headers: headers,
    });
  }, [request, token]);

  useEffect(() => {
    if (data) {
      var test = { username: "", primaryemail: "", roles: [], userid: "" };
      test.username = data.username;
      test.primaryemail = data.primaryemail;
      test.roles = data.roles;
      test.userid = data.userid;
      setFormValues(test);
      setUserId(data.userid);
    }
  }, [data]);

  return (
    <div>
      <Header showUser={true} />
      <div>
        <div className="grid grid-cols-4 gap-6 p-4">
          <NavBar active={"profile"} className="" />
          <form onSubmit={onSubmit} className="col-start-2 col-span-3 m-auto">
            <h2 className="text-center text-4xl p-4 mb-2">Profile</h2>
            <div className="flex justify-center p-4">
              <div className="text-right p-4">
                <div className="p-2 ">
                  <label>Username</label>
                  <input
                    className="bg-gray-400 border-2 border-black m-2"
                    value={formValues.username}
                    onChange={onInputChange}
                    name="username"
                    type="text"
                  />
                </div>
                <div className="p-2">
                  <label>Email</label>
                  <input
                    className="bg-gray-400 border-2 border-black m-2"
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
                name="update"
                onClick={() => {}}
                className=" bg-gray-500 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
