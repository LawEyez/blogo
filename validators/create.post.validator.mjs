import validator from 'validator'
import { isEmpty } from '../common/global.helper.mjs'

export default data => {
    const errors = {}

    const title = !isEmpty(data.title) ? data.title : ''
    const body = !isEmpty(data.body) ? data.body : ''

    if (validator.isEmpty(title)) {
        errors.title = 'Your post must have a title!'
    }
    
    if (validator.isEmpty(body)) {
        errors.body = 'Your post must have a body!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}