import crypto from 'crypto'
import * as UserModel from '../models/users.model.mjs'
import registerValidator from '../validation/register.validator.mjs'

export const insert = async (req, res) => {
    try {
        const { errors, isValid } = registerValidator(req.body)

        if (!isValid) {
            res.status(400).json(errors)

        } else {
            const salt = crypto.randomBytes(16).toString('base64')
            const hash = crypto.createHmac('SHA512', salt).update(req.body.password).digest('hex')

            req.body.password = `${salt}$${hash}`
            
            const result = await UserModel.createUser(req.body)

            res.status(200).json({ user: result })
        }
        
    } catch (err) {
        res.status(400).json(err)
    }
}

export const list = async (req, res) => {
    try {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
        let page = 0

        if (req.query) {
            if (req.query.page) {
                req.query.page = parseInt(req.query.page)
                page = Number.isInteger(req.query.page) ? req.query.page : 0
            }
        }

        const result = await UserModel.list(limit, page)

        res.status(200).json({users: result})

    } catch (err) {
        res.status(400).json(err)
    }
}