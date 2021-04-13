import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const firstName = !isEmpty(data.firstName) ? data.firstName : ''
    const lastName = !isEmpty(data.lastName) ? data.lastName : ''
    const email = !isEmpty(data.email) ? data.email : ''
    const password = !isEmpty(data.password) ? data.password : ''
    const passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : ''

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
    
    if (!validator.equals(password, passwordConfirm)) {
        errors.password = 'Passwords do not match!'
    }
    
    if (validator.isEmpty(password)) {
        errors.password = 'You must set a password!'
    }

    // if (!validator.isLength(passwordConfirm, { min: 5 })) {
    //     errors.passwordConfirm = 'Password should be at least 5 characters long!'
    // }
    
    if (validator.isEmpty(passwordConfirm)) {
        errors.passwordConfirm = 'You must confirm your password!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}