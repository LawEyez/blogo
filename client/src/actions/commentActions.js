import { host } from '../helpers'

export const postComment = async (data, accessToken, errorDispatch) => {
    try {

        // Config options
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/comments`, options)

        // Parse response.
        const resData = await res.json()
        console.log('POST COMMENT: ', resData)

        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        }

    } catch (err) {
        console.log(err)
    }
}

// Allow comment.
export const allowComment = async (id, accessToken, errorDispatch) => {
    try {
        // Prep data.
        const data = {
            // Will be converted to boolean in backend.(1: true, 0: false).
            isAllowed: 1
        }

        // Config options
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/comments/${id}`, options)

        // Parse response.
        const resData = await res.json()
        console.log('ALLOW COMMENT: ', resData)

        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        }

    } catch (err) {
        console.log(err)
    }
}

// Delete comment.
export const deleteComment = async (id, accessToken, errorDispatch) => {
    try {
        
        // Config options
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request.
        const res = await fetch(`${host}/comments/${id}`, options)

        // Parse response.
        const resData = await res.json()
        console.log('DELETE COMMENT: ', resData)
        
        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        }

    } catch (err) {
        console.log(err)
    }
}


// Edit comment
export const editComment = async (id, data, accessToken, errorDispatch) => {
    try {

        // Config options
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        // Make request
        const res = await fetch(`${host}/comments/${id}`, options)

        // Parse response
        const resData = await res.json()
        console.log('EDIT COMMENT: ', resData)

        // Check error
        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        }

    } catch (err) {
        console.log(err)
    }
}
