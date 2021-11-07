import { useHistory } from "react-router"
import NavButton from "./button/navButton"


export type NavBarType = {
    active: "home" | "account" | "myhowto" | "howtos"
}


export default function NavBar(props: NavBarType): JSX.Element {
    const history = useHistory();
    return (
        <div>
            <div className="flex flex-col w-1/5 p-4 bg-gray-200">
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
                text="Account"
                onClick={() => history.push("")}
                active={props.active === "account"}
                className="m-2"
                />
            </div>
        </div>
    )
}