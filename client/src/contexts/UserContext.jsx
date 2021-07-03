import { createContext, useContext, useEffect, useReducer } from "react";

import { getUser } from "../actions/userActions";

import userReducer from "../reducers/userReducer";

import { AuthContext } from "./AuthContext";
import { ErrorContext } from "./ErrorContext";

export const UserContext = createContext()

const UserContextProvider = (props) => {
    const initState = {
        user: {},
        users: []
    }

    const [state, dispatch] = useReducer(userReducer, initState)

    const { user } = useContext(AuthContext)
    const { dispatch: errorDispatch } = useContext(ErrorContext)

    useEffect(() => {
        if (user.userId) getUser(user.userId, dispatch, errorDispatch)
    }, [user.userId, errorDispatch])

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider