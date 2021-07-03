import {host} from '../helpers'

export const createBookmark = async (data, accessToken, errorDispatch) => {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        const res = await fetch(`${host}/bookmarks`, options)
        const resData = await res.json()

        console.log('BKMK ACTIONS: ', resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        }

    } catch (err) {
        console.log(err)
    }
}

export const removeBookmark = async (id, accessToken, errorDispatch) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }

        const res = await fetch(`${host}/bookmarks/${id}`, options)
        const resData = await res.json()

        console.log('BKMAK REMOVE ACTION: ', resData)

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })
        }

    } catch (err) {
        console.log(err)
    }
}