import User from '../models/users.model.mjs'
import Sub from '../models/subs.model.mjs'
import Post from '../models/posts.model.mjs'
import * as handler from '../common/global.handler.mjs'
import RegisterValidator from '../validators/register.validator.mjs'
import { isEmpty, hash, cleaned } from '../common/global.helper.mjs'
import Like from '../models/likes.model.mjs'

export const createUser = async (req, res) => {
    try {
        const { errors, isValid } = RegisterValidator(req.body)

        if (!isValid) {
            res.status(400).json({err: errors})

        } else {
            const user = await handler.findOneByQuery({
                query: { email: req.body.email },
                model: User
            })

            if (!isEmpty(user)) {
                return res.status(400).json({ err: { msg: 'Email is already registered!' }})
            }

            const { hashedPassword } = hash(null, req.body.password)

            req.body.password = hashedPassword
            req.body.permissionLevel ? req.body.permissionLevel = 1 : null
            // req.body.permissionLevel = parseInt(req.body.permissionLevel)
            
            const result = await handler.create(req.body, User)

            !isEmpty(result) ? (
                res.status(200).json({ user: cleaned(result) })
            ) : (
                res.status(500).json({ err: { msg: 'Registration Failed!' }})
            )
        }
        
    } catch (err) {
        res.status(500).json({err})
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

        let users = await handler.list({ perPage: limit, page, model: User})
        users = users.map(user => cleaned(user))

        !isEmpty(users) ? (
            res.status(200).json({users})
        ) : (
            res.status(404).json({err: {msg: 'No available users!'}})
        )

    } catch (err) {
        res.status(500).json({err})
    }
}

export const getById = async (req, res) => {
    try {
        const user = await handler.findOneById({ id: req.params.id, model: User })
        
        if (isEmpty(user)) {
            return res.status(404).json({err: {msg: 'User does not exist!'}})
        }

        const subCount = await handler.getCount({ 
            query: {
                channel: req.params.id
            },
            model: Sub
        })

        const postCount = await handler.getCount({
            query: {
                author: req.params.id
            },
            model: Post
        })
        
        res.status(200).json({ user: cleaned(user), subCount, postCount })
             
    } catch (err) {
        res.status(500).json({err})
    }
}

export const patchById = async (req, res) => {
    try {
        if (req.body.password) {
            const { hashedPassword } = hash(null, req.body.password)
            req.body.password = hashedPassword
        }

        if (req.body.username) {
            const usernameExists = await handler.findOneByQuery({
                query: { username: req.body.username },
                model: User
            })

            if (usernameExists) {
                return res.status(400).json({err: { msg: 'Username already taken! Please choose another one.' }})
            }
        }

        const result = await handler.update(req.params.id, req.body, User)
        
        !isEmpty(result) ? (
            res.status(200).json({ msg: 'User updated successfully!' })
        ) : (
            res.status(400).json({ msg: 'Failed to update user!. The user may not exist.' })
        )

    } catch (err) {
        res.status(500).json(err)
    }
}

export const removeById = async (req, res) => {
    try {
        // Delete user
        const result = await handler.remove(req.params.id, User)

        if(isEmpty(result)) {
            res.status(400).json({err: { msg: 'Failed to delete user!. The user may not exist.' }})
        }

        // Delete user's channel and subs
        await handler.removeAllByQuery({
            query: { $or: [{subscriber: req.params.id }, {channel: req.params.id}]},
            model: Sub
        })

        // Delete user's likes
        await handler.removeAllByQuery({
            query: { user: req.params.id },
            model: Like
        })
        
        res.status(200).json({ msg: 'User deleted successfully!' })
       
    } catch (err) {
        res.status(500).json({err})
    }
}