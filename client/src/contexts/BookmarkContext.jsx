import { createContext, useReducer } from "react";

import bookmarkReducer from "../reducers/bookmarkReducer";

export const BookmarkContext = createContext()

const BookmarkContextProvider = (props) => {        
    const initState = {
        bookmarks: []
    }

    const [state, dispatch] = useReducer(bookmarkReducer, initState)

    return (
        <BookmarkContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkContextProvider

