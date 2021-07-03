import { host } from '../helpers'

// Create a subscription.
export const postSub = async (data, accessToken, dispatch, errorDispatch) => {
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
        const res = await fetch(`${host}/subscribe`, options)

        // Parse response.
        const resData = await res.json()
        console.log('post sub action: ', resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        
        } else {
            getSubs(accessToken, dispatch)
        }        
    } catch (err) {
        console.log(err)
    }
}


// Get current user's subscriptions
export const getSubs = async (accessToken, dispatch) => {
    try {

        // Configure request options.
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/subs`, options)

        // Parse response.
        const resData = await res.json()
        console.log('get subs action: ', resData)

        dispatch({ type: 'GET_SUBS', payload: resData.subs })

    } catch (err) {
        console.log(err)
    }
}


// Delete a subscription.
export const deleteSub = async (id, accessToken, dispatch, errorDispatch) => {
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
        const res = await fetch(`${host}/subscribe/${id}`, options)

        // Parse response.
        const resData = await res.json()
        console.log('delete sub action: ', resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        } else {
            getSubs(accessToken, dispatch)
        }

    } catch (err) {
        console.log(err)
    }
}