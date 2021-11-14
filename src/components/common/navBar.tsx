import { useHistory } from "react-router";
import NavButton from "./button/navButton";

export type NavBarType = {
  active: "home" | "profile" | "myhowto" | "howtos" | "logout";
  className?: string;
};

export default function NavBar(props: NavBarType): JSX.Element {
  const history = useHistory();
  return (
    <div>
      <div className={`flex flex-col  p-4 bg-gray-200 ${props.className}`}>
        <h4 className="text-xl font-bold text-center">Nav</h4>
        <NavButton
          text="Home"
          onClick={() => history.push("/home")}
          active={props.active === "home"}
          className="m-2"
        />
        <NavButton
          text="Howtos"
          onClick={() => history.push("")}
          active={props.active === "howtos"}
          className="m-2"
        />
        <NavButton
          text="My Howtos"
          onClick={() => history.push("")}
          active={props.active === "myhowto"}
          className="m-2"
        />
        <NavButton
          text="Profile"
          onClick={() => history.push("/profile")}
          active={props.active === "profile"}
          className="m-2"
        />
        <NavButton
          text="Logout"
          onClick={() => history.push("/logout")}
          active={props.active === "logout"}
          className="m-2"
        />
      </div>
    </div>
  );
}
