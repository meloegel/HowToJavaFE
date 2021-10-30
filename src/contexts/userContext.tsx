import {createContext} from "react";

interface UserContextInterface {
    isAuthenticated: boolean
}

const defaultUserContext: UserContextInterface = {
    isAuthenticated: false
}

export const UserContext = createContext<UserContextInterface | null>(null);

const UserContextProvider: React.FC = props => {
    return (
    <UserContext.Provider value={defaultUserContext}>
 {props.children}
    </UserContext.Provider>
    )
}

export default UserContextProvider;