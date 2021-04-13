import { createContext, useReducer } from "react";
import errorReducer from "../reducers/errorReducer";

export const ErrorContext = createContext()

const ErrorContextProvider = props => {

    // Set initial state.
    const initState = {
        errors: null
    }
    const [state, dispatch] = useReducer(errorReducer, initState)

    return(
        <ErrorContext.Provider value={{...state, dispatch}}>
            {props.children}
        </ErrorContext.Provider>
    )
}

export default ErrorContextProvider