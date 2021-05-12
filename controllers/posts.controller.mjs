import Post from '../models/posts.model.mjs'
import Comment from '../models/comments.model.mjs'
import Like from '../models/likes.model.mjs'
import * as handler from '../common/global.handler.mjs'
import CreatePostValidator from '../validators/create.post.validator.mjs'
import { isEmpty } from '../common/global.helper.mjs'


export const createPost = async (req, res) => {
    try {
        const {errors, isValid} = CreatePostValidator(req.body)

        if (!isValid) {
            return res.status(400).json({err: errors})
        }

        req.body.author = req.user.userId

        const post = await handler.create(req.body, Post)

        !isEmpty(post) ? (
            res.status(200).json({ msg: 'Post created successfully!', postId: post._id })
        ) : (
            res.status(500).json({err: { msg: 'Post creation failed!' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at creating new post!', err }})
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

        let posts = await handler.list({
            perPage: limit,
            page,
            model: Post,
            populate: {
                field: ['author', 'category'],
                sub_fields: [
                    ['firstName', 'lastName', 'avatar'],
                    ['name']]
            }
        })
        
        posts = posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

        !isEmpty(posts) ? (
            res.status(200).json({posts})
        ) : (
            res.status(404).json({err: { msg: 'No posts to show yet!' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at listing posts!', err }})
    }
}


export const getPost = async (req, res) => {
    try {
        const post = await handler.findOneById({
            id: req.params.id,
            model: Post,
            populate: {
                field: 'author',
                sub_fields: ['firstName', 'lastName', 'avatar']
            }
        })

        if (isEmpty(post)) {
            return res.status(404).json({err: { msg: 'Post does not exist!' }})
        }

        let comments = await handler.findByQuery({ 
            query: {
                post: req.params.id
            },
            model: Comment,
            populate: {
                field: 'author',
                sub_fields: ['firstName', 'lastName']
            }
        })

        const likeCount = await handler.getCount({
            query: { 
                post: post._id,
                dislike: false
            },
            model: Like
        })

        const dislikeCount = await handler.getCount({
            query: { 
                post: post._id,
                dislike: true
            },
            model: Like
        })


        if (req.query.userId !== post.author._id.toString()) {
            console.log(req.query.userId)
            console.log(post.author._id.toString())
            comments = comments.filter(comment => comment.isAllowed === true)
        }

        res.status(200).json({postData: post, comments, likes: likeCount, dislikes: dislikeCount})
        

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at getting post!', err }})
    }
}


export const updatePost = async (req, res) => {
    try {
        const {errors, isValid} = CreatePostValidator(req.body)

        if (!isValid) {
            return res.status(400).json({err: errors})
        }

        const updatedPost = await handler.update(req.params.id, req.body, Post)

        updatedPost ? (
            res.status(200).json({ msg: 'Post updated successfully!', updatedPost })
        ) : (
            res.status(400).json({err: { msg: 'Failed to update post! It may not exist.' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at patching post!', err }})
    }
}


export const removePost = async (req, res) => {
    try {
        const deletedPost = await handler.remove(req.params.id, Post)

        deletedPost ? (
            res.status(200).json({ msg: 'Post deleted successfully!' })
        ) : (
            res.status(400).json({err: { msg: 'Failed to delete post! It may not exist.' }})
        )

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at deleting post!', err }})
    }
}