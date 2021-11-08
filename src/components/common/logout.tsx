import { useHistory } from "react-router";
import Button from "./button/button";
import Header from "./header";
import NavBar from "./navBar";

export default function Logout() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="w-full">
      <Header showUser={true}/>
      <div className=" grid grid-cols-4 gap-6 p-4">
        <NavBar active={"logout"} />
        <div className="bg-yellow-200 text-center col-span-3">
          <p className="text-lg">Are you sure you would like to logout?</p>
          <div>
            <Button
              text="Logout"
              onClick={() => {
                handleLogout();
              }}
              className=" bg-gray-500 text-white "
            />
            <Button
              text="Go Back"
              onClick={() => {
                history.push("/home");
              }}
              className=" bg-gray-500 text-white "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
