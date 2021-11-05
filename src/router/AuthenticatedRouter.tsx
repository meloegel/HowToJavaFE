import UserContextProvider from "../contexts/userContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/account/Login";
import Register from '../components/account/Register';


export default function AuthenticatedRouter() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/register" component={Register}/>
                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    )
}