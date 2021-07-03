import Comment from '../models/comments.model.mjs'
import * as handler from '../common/global.handler.mjs'
import AddCommentValidator from '../validators/add.comment.validator.mjs'
import { isEmpty } from '../common/global.helper.mjs'

export const addComment = async (req, res) => {
    try {
        const { errors, isValid } = AddCommentValidator(req.body)

        if (!isValid) {
            return res.status(400).json({err: errors})
        }

        req.body.author = req.user.userId
        
        const comment = await handler.create(req.body, Comment)

        comment ? (
            res.status(200).json({ msg: 'Comment posted successfully! Awaiting approval from post author.', comment })
        ) : (
            res.status(500).json({err: { msg: 'Failed to post comment!' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at posting comment!', err }})
    }
}

export const list = async (req, res) => {
    try {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
        let page = 0

        if (req.query && req.query.page) {
            req.query.page = parseInt(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page : 0
        }

        const comments = await handler.list({
            perPage: limit,
            page,
            model: Comment,
            populate: {
                field: ['author', 'post'],
                sub_fields: [
                    ['firstName', 'lastName', 'avatar'],
                    ['title']
                ]
            }
        })

        comments ? (
            res.status(200).json({ comments })
        ) : (
            res.status(400).json({err: { msg: 'Failed to get comments!' }})
        )

        
    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at listing comments!', err }})
    }
}


export const updateComment = async (req, res) => {
    try {
        console.log('bool: ', (Object.keys(req.body).includes('body') && isEmpty(req.body.body)))
        
        if (Object.keys(req.body).includes('body') && isEmpty(req.body.body)) {
            return res.status(400).json({err: { body: 'Comment body cannot be empty!' }})
        }

        const updatedComment = await handler.update(req.params.id, req.body, Comment)

        updatedComment ? (
            res.status(200).json({ msg: 'Comment updated successfully!' })
        ) : (
            res.status(400).json({err: { msg: 'Failed to update comment!' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at updating comment!', err }})
    }
}


export const removeComment = async (req, res) => {
    try {
        const deletedComment = await handler.remove(req.params.id, Comment)

        deletedComment ? (
            res.status(200).json({ msg: 'Comment deleted successfully' })
        ) : (
            res.status(400).json({err: { msg: 'Failed to delete comment! It may not exist.' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at removing comment!', err }})
    }
}