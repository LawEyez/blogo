import { createContext, useReducer, useEffect } from "react";
import jwtDecode from 'jwt-decode'

import authReducer from "../reducers/authReducer";
import { isEmpty } from '../helpers'

export const AuthContext = createContext()

const accessToken = localStorage.getItem('token')

const validateToken = (token) => {
    try {
        return !isEmpty(jwtDecode(token))
    } catch (error) {
        return false
    }
}

validateToken()

const AuthContextProvider = props => {

    // Set initial state.
    const initState = {
        isAuthenticated: validateToken(accessToken),
        accessToken,
        user: {}
    }

    const [state, dispatch] = useReducer(authReducer, initState)

    useEffect(() => {

        // Check if token exists.
        if (!isEmpty(accessToken)) {
            
            // Decode token to get user info.
            const user = jwtDecode(accessToken)
            const isAuthenticated = !isEmpty(user)

            // Set current user.
            dispatch({ type: 'SET_USER', payload: { user, accessToken, isAuthenticated } })
        }

    }, [dispatch])

    console.log('CONTEXT: ', state)

    return(
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider