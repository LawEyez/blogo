import jwtDecode from 'jwt-decode'
import { isEmpty, host } from '../helpers'


// Log in user.
export const login = async (data, dispatch, errorDispatch, history) => {
    try {

        // Configure request options.
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        // Make request.
        const res = await fetch(`${host}/auth/login`, options)

        // Parse response.
        const resData = await res.json()

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {

            // Get token.
            const { accessToken } = resData

            // Save token in localStorage.
            localStorage.setItem('token', accessToken)

            // Decode token to get user info.
            const user = jwtDecode(accessToken)
            const isAuthenticated = !isEmpty(user)

            dispatch({ type: 'SET_USER', payload: { user, accessToken, isAuthenticated } })
            history.push('/')
        }

        
    } catch (err) {
        console.log(err)
    }
}


// Logout user.
export const logout = (dispatch, history) => {
    
    // Delete token from localStorage.
    localStorage.removeItem('token')

    // Dispatch action.
    dispatch({ type: 'SET_USER', payload: { user: {}, isAuthenticated: false, accessToken: null } })

    // Redirect to login page.
    history.push('/login')
}


// Register new user.
export const register = async (data, errorDispatch, history) => {
    try {

        // Configure request options.
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Make request.
        const res = await fetch(`${host}/users`, options)

        // Parse response.
        const resData = await res.json()

        if (resData.err) {
            errorDispatch({ type: 'SET_ERRORS', payload: resData.err })

        } else {
            history.push('/login')
        }

    } catch (err) {
        console.log(err)
    }
}