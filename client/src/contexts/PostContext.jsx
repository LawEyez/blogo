import { createContext, useReducer } from "react";
// import { getPosts } from "../actions/postActions";

import postReducer from "../reducers/postReducer";

export const PostContext = createContext()

const PostContextProvider = props => {

    // Set initial state.
    const initState = {
        posts: [],
        userPosts: [],
        post: {}
    }

    const [state, dispatch] = useReducer(postReducer, initState)

    // Get posts.
    // useEffect(() => {
    //     getPosts(dispatch)
    // }, [])

    console.log('POST CONTEXT: ', state)
    return(
        <PostContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContextProvider