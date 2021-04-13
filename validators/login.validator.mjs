import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const email = !isEmpty(data.email) ? data.email : ''
    const password = !isEmpty(data.password) ? data.password : ''

    if (!validator.isEmail(email)) {
        errors.email = 'Email entered is invalid!'
    }

    if (validator.isEmpty(email)) {
        errors.email = 'You must provide an email!'
    }

    if (validator.isEmpty(password)) {
        errors.password = 'You must provide a password!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}