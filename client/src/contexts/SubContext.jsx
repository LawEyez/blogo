import React, { createContext, useContext, useEffect, useReducer } from "react";

import { getSubs } from "../actions/subActions";

import subReducer from "../reducers/subReducer";

import { AuthContext } from "./AuthContext";

export const SubContext = createContext()

const SubContextProvider = props => {
    const { user, accessToken } = useContext(AuthContext)
    const { userId } = user
    
    const initState = {
        subs: []
    }

    const [state, dispatch] = useReducer(subReducer, initState)

    useEffect(() => {
        getSubs(userId, accessToken, dispatch)
        
    }, [dispatch, accessToken, userId])

    console.log('SUB CONTEXT: ', state)

    return (
        <SubContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </SubContext.Provider>
    )
}

export default SubContextProvider