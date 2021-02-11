import validator from 'validator'
import isEmpty from './isempty.mjs'

export default data => {
    const errors = {}

    const firstName = !isEmpty(data.firstName) ? data.firstName : ''
    const lastName = !isEmpty(data.lastName) ? data.lastName : ''
    const email = !isEmpty(data.email) ? data.email : ''
    const password = !isEmpty(data.password) ? data.password : ''
    const password2 = !isEmpty(data.password) ? data.password2 : ''

    if (validator.isEmpty(firstName)) {
        errors.firstName = 'Your first name is required!'
    }
    
    if (validator.isEmpty(lastName)) {
        errors.lastName = 'Your last name is required!'
    }
    
    if (!validator.isEmail(email)) {
        errors.email = 'The email provided is invalid!'
    }
    
    if (validator.isEmpty(email)) {
        errors.email = 'Your email is required!'
    }
    
    if (!validator.isLength(password, { min: 5 })) {
        errors.password = 'Password should be at least 5 characters long!'
    }
    
    if (!validator.equals(password, password2)) {
        errors.password = 'Passwords do not match!'
    }
    
    if (validator.isEmpty(password)) {
        errors.password = 'You must set a password!'
    }
    
    if (validator.isEmpty(password2)) {
        errors.password2 = 'You must confirm your password!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}