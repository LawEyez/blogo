import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const firstName = !isEmpty(data.firstName) ? data.firstName : ''
    const lastName = !isEmpty(data.lastName) ? data.lastName : ''
    const email = !isEmpty(data.email) ? data.email : ''

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

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 