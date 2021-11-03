import UserContextProvider from "../contexts/userContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/Login";


export default function AuthenticatedRouter() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route exact path="/" component={Login}/>
                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    )
}