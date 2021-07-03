import { host } from "../helpers"

// Get a user's info
export const getUser = async (userId, dispatch, errorDispatch) => {
    try {
        const options = {
            method: 'GET',
        }

        const res = await fetch(`${host}/users/${userId}`, options)

        const resData = await res.json()

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            dispatch({ type: 'GET_USER', payload: resData.user })
        }

    } catch (err) {
        console.log(err)
    }
}


// Update a user's info
export const updateUser = async (id, data, accessToken, dispatch, errorDispatch, history) => {
    try {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        const res = await fetch(`${host}/users/${id}`, options)

        const resData = await res.json()

        console.log('UPDATE USER ACTION: ', resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
            return false

        } else {
            getUser(id, dispatch, errorDispatch)
            return true
        }

    } catch (err) {
        console.log(err)
    }
} 