import { host } from '../helpers'


// Get all posts.
export const getPosts = async (dispatch, errorDispatch) => {
    try {

        // Configure request options.
        const options = {
            method: 'GET'
        }

        // Make request.
        const res = await fetch(`${host}/posts`, options)

        // Parse response.
        const resData = await res.json()

        // Dispatch action.
        dispatch({ type: 'GET_POSTS', payload: resData.posts })

    } catch (err) {
        console.log(err)
    }
}


// Create a post.
export const createPost = async (data, accessToken, errorDispatch, history) => {
    try {

        // Configure request options.
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/posts`, options)

        // Parse response.
        const resData = await res.json()
        console.log('CREATE POST ACTION: ', resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            history.push(`/posts/${resData.postId}`)
        }        

    } catch (err) {
        console.log(err)
    }
}


// Update a post.
export const patchPost = async (id, data, accessToken, errorDispatch, history) => {
    try {

        // Configure request options.
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/posts/${id}`, options)

        // Parse response.
        const resData = await res.json()
        console.log(resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            history.push(`/posts/${id}`)
        }        

    } catch (err) {
        console.log(err)
    }
}


// Get a single post.
export const getSinglePost = async (id, userId, dispatch, errorDispatch) => {
    try {

        // Configure request options.
        const options = {
            method: 'GET'
        }

        // Make request.
        const res = await fetch(`${host}/posts/${id}?userId=${userId}`, options)

        // Parse response.
        const resData = await res.json()
        console.log(resData)

        // Dispatch actions.
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            dispatch({ type: 'GET_POST', payload: resData })
        }

    } catch (err) {
        console.log(err)
    }
}


// Delete a post.
export const deletePost = async (id, accessToken, dispatch, history) => {
    try {

        // Configure request options.
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/posts/${id}`, options)

        // Parse respose.
        const resData = await res.json()
        console.log('DELETE POST: ', resData)

        // Clear post from context.
        dispatch({ type: 'CLEAR_POST' })

        // Redirect to home page.
        history.push('/')

    } catch (err) {
        console.log(err)
    }
}


// Get user posts
export const getUserPosts = async (id, dispatch, errorDispatch) => {
    try {
        // Configure request options.
        const options = {
            method: 'GET',
        }

        // Make request
        const res = await fetch(`${host}/posts/user/${id}`, options)

        // Parse response
        const resData = await res.json()
        console.log(resData)

        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err})
        } else {
            dispatch({ type: 'GET_USER_POSTS', payload: resData.userPosts })
        }

    } catch (err) {
        console.log(err)
    }
}