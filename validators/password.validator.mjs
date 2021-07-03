import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const password = !isEmpty(data.password) ? data.password : ''
    const passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : ''
    
    if (!validator.isLength(password, { min: 5 })) {
        errors.password = 'Password should be at least 5 characters long!'
    }
    
    if (!validator.equals(password, passwordConfirm)) {
        errors.password = 'Passwords do not match!'
    }
    
    if (validator.isEmpty(password)) {
        errors.password = 'You must set a password!'
    }
    
    if (validator.isEmpty(passwordConfirm)) {
        errors.passwordConfirm = 'You must confirm your password!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}