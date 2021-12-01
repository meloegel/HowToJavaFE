import { useHistory } from "react-router";
import Button from "../common/button/button";
import Header from "../common/header";
import NavBar from "../common/navBar";

export default function Logout() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="h-screen">
      <Header showUser={true}/>
      <div className=" grid grid-cols-4 gap-6 p-4">
        <NavBar active={"logout"} />
        <div className="bg-yellow-200 text-center col-span-3 flex flex-col justify-center">
          <p className="text-center text-3xl p-4 mb-2 ">Are you sure you would like to logout?</p>
          <div className="p-2">
            <Button
              text="Logout"
              name="logout"
              onClick={() => {
                handleLogout();
              }}
              className=" bg-gray-500 text-white mr-12"
            />
            <Button
              text="Go Back"
              name="back"
              onClick={() => {
                history.push("/home");
              }}
              className=" bg-gray-500 text-white ml-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
