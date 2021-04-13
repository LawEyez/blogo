import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const name = !isEmpty(data.name) ? data.name : ''

    if (validator.isEmpty(name)) {
        errors.name = 'You must provide a name!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}