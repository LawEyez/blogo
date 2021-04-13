import Like from '../models/likes.model.mjs'
import * as handler from '../common/global.handler.mjs'
import { isEmpty } from '../common/global.helper.mjs'

export const like = async (req, res) => {
    try {
        let like

        req.body.user = req.user.userId

        // Check if already liked
        const likeExists = await handler.findOneByQuery({
            query: req.body,
            model: Like
        })

        // If not already liked, create like
        if (isEmpty(likeExists)) {
            like = await handler.create(req.body, Like)
            return res.status(200).json({ msg: 'Liked successfully!', like })
        }

        // If already liked, inform user they can only like once.
        if (likeExists.dislike === false) {
            return res.status(400).json({ msg: 'You can only like once!' })
        }

        // If disliked, set dislike flag to false
        like = await handler.update(likeExists._id, { dislike: false }, Like)

        

        like ? (
            res.status(200).json({ msg: 'Liked successfully!', like })
        ) : (
            res.status(400).json({ msg: 'Failed to like!' })
        )

    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at posting like!', err })
    }
}

export const dislike = async (req, res) => {
    try {
        let dislike
        
        // Check if already liked
        const likeExists = await handler.findOneByQuery({
            query: {...req.body, user: req.user.userId },
            model: Like
        })

        if (isEmpty(likeExists)) {
            // If not liked, create a new like with dislike flag set to true
            req.body.dislike = true
            req.body.user = req.user.userId

            dislike = await handler.create(req.body, Like)

            return res.status(200).json({ msg: 'Disliked successfully!', dislike })
        }

        // Check if already disliked
        if (likeExists.dislike === true) {
            return res.status(400).json({ msg: 'You can only dislike once!' })
        }

        // If not already disliked, update dislike flag to true
        dislike = await handler.update(likeExists._id, { dislike: true }, Like)

        dislike ? (
            res.status(200).json({ msg: 'Disliked successfully!', dislike })
        ) : (
            res.status(400).json({ msg: 'Failed to dislike!' })
        )
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at posting dislike!', err })
    }
}

export const unlike = async (req, res) => {
    try {
        const unlike = await handler.remove(req.params.id, Like)

        unlike ? (
            res.status(200).json({ msg: 'Unliked successfully!', unlike })
        ) : (
            res.status(400).json({ msg: 'Failed to unlike!' })
        )
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at unliking!', err })
    }
}