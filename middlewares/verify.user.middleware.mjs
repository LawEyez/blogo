import User from '../models/users.model.mjs'
import * as handler from '../common/global.handler.mjs'
import LoginValidator from '../validators/login.validator.mjs'
import { hash, isEmpty } from '../common/global.helper.mjs'

export const hasValidAuthFields = (req, res, next) => {
    try {
        const { errors, isValid } = LoginValidator(req.body)

        if (!isValid) {
            return res.status(400).json({err: errors})
        }

        next()

    } catch (err) {
        res.status(500).json(err)
    }
}

export const isPasswordAndUserMatch = async (req, res, next) => {
    try {
        const user = await handler.findOneByQuery({ query: { email: req.body.email }, model: User})

        if (isEmpty(user)) {
            return res.status(404).json({err: { msg: 'User does not exist!' }})
        }

        const passwordInfo = user.password.split('$')
        const { hash: _hash } = hash(passwordInfo[0], req.body.password)
        
        if (_hash !== passwordInfo[1]) {
            return res.status(400).json({err: { msg: 'Wrong email or password!' }})
        }

        req.body = {
            userId: user._id,
            email: user.email,
            provider: 'email',
            permissionLevel: user.permissionLevel,
            name: `${user.firstName} ${user.lastName}`
        }

        next()

    } catch (err) {
        res.status(500).json({err})
    }
}