import { useHistory } from "react-router";
import NavButton from "./button/navButton";

export type NavBarType = {
  active: "howtos" | "addhowto" | "search" | "profile" | "logout" | "about";
  className?: string;
};

export default function NavBar(props: NavBarType): JSX.Element {
  const history = useHistory();
  return (
    <div>
      <div
        className={`flex flex-col p-4 w-min-96 max-w-foo bg-gray-200 ${props.className} `}
      >
        <h4 className="text-xl font-bold text-center">Nav</h4>
        <NavButton
          text="Howtos"
          onClick={() => history.push("/home")}
          active={props.active === "howtos"}
          className="m-2"
        />
        <NavButton
          text="Add Howto"
          onClick={() => history.push("/add-howto")}
          active={props.active === "addhowto"}
          className="m-2"
        />
        <NavButton
          text="Search"
          onClick={() => history.push("/search")}
          active={props.active === "search"}
          className="m-2"
        />
        <NavButton
          text="Profile"
          onClick={() => history.push("/profile")}
          active={props.active === "profile"}
          className="m-2"
        />
        <NavButton
          text="About"
          onClick={() => history.push("/about")}
          active={props.active === "about"}
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
