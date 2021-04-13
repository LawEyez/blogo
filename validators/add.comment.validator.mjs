import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const body = !isEmpty(data.body) ? data.body : ''

    if (validator.isEmpty(body)) {
        errors.body = 'Comment cannot be empty!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}