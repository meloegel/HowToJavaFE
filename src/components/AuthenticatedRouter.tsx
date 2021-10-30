import UserContextProvider from "../contexts/userContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";


export default function AuthenticatedRouter() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route path="/login" component={Login}/>

                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    )
}