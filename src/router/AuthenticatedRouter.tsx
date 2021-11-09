import UserContextProvider from "../contexts/userContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/account/Login";
import Register from "../components/account/Register";
import Home from "../components/homePage";
import Logout from "../components/common/logout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../components/account/Profile";

export default function AuthenticatedRouter() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path={"/home"} component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </UserContextProvider>
    </BrowserRouter>
  );
}
