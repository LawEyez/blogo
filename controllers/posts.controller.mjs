import azureStorage from 'azure-storage'
import intoStream from 'into-stream'

import Post from '../models/posts.model.mjs'
import Comment from '../models/comments.model.mjs'
import Like from '../models/likes.model.mjs'
import Bookmark from '../models/bookmarks.model.mjs'

import * as handler from '../common/global.handler.mjs'
import { isEmpty } from '../common/global.helper.mjs'

import CreatePostValidator from '../validators/create.post.validator.mjs'

import _ from 'dotenv'
_.config()

const blobService = azureStorage.createBlobService()
const container = 'prze-posts'


// Create a new post
export const createPost = async (req, res) => {
    try {
        const {errors, isValid} = CreatePostValidator(req.body)

        if (!isValid) {
            return res.status(400).json({err: errors})
        }

        req.body.author = req.user.userId

        const { image, ...data } = req.body

        let post

        if (!isEmpty(image)) {
            const blob = Date.now().toString() + '_' + image.name
            const stream = intoStream(Buffer.from(image.buffer))
            const streamLength = image.size
    
            blobService.createBlockBlobFromStream(container, blob, stream, streamLength, (async err => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({ err: { msg: 'Error occurred during upload', err }})
                }

                data.poster = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${container}/${blob}`

                post = await handler.create(data, Post)

                !isEmpty(post) ? (
                    res.status(200).json({ msg: 'Post created successfully!', postId: post._id })
                ) : (
                    res.status(500).json({err: { msg: 'Post creation failed!' }})
                )

            }))

        } else {
            data.poster = '/img/poster.jpg'
            post = await handler.create(data, Post)

            !isEmpty(post) ? (
                res.status(200).json({ msg: 'Post created successfully!', postId: post._id })
            ) : (
                res.status(500).json({err: { msg: 'Post creation failed!' }})
            )
        }

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at creating new post!', err }})
    }
}


// Get all posts
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
                    ['name']
                ]
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


// Get a user's posts
export const getUserPosts = async (req, res) => {
    try {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
        let page = 0

        if (req.query && req.query.page) {
            req.query.page = parseInt(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page : 0
        }

        let userPosts = await handler.findByQuery({
            query: { author: req.params.userId },
            model: Post,
            perPage: limit,
            page,
            populate: {
                field: ['author', 'category'],
                sub_fields: [
                    ['firstName', 'lastName', 'avatar'],
                    ['name']
                ]
            }
        })

        userPosts = userPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

        !isEmpty(userPosts) ? (
            res.status(200).json({userPosts})
        ) : (
            res.status(404).json({err: { msg: 'No posts to show yet!' }})
        )

    } catch (err) {
        res.status(500).json({ err: { msg: 'Internal server error at listing user posts! ', err }})
    }
}


// Get single post
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
                sub_fields: ['firstName', 'lastName', 'avatar']
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

        const bookmark = await handler.findOneByQuery({
            query: {
                post: req.params.id,
                user: req.query.userId
            },
            model: Bookmark
        })


        if (req.query.userId !== post.author._id.toString()) {
            console.log(req.query.userId)
            console.log(post.author._id.toString())
            comments = comments.filter(comment => comment.isAllowed === true)
        }

        console.log('SINGLE POST: ', {postData: post, comments, likes: likeCount, dislikes: dislikeCount, isBookmarked: !isEmpty(bookmark)})

        res.status(200).json({
            postData: post, 
            comments, 
            likes: likeCount, 
            dislikes: dislikeCount,
            isBookmarked: !isEmpty(bookmark),
            bookmark
        })
        

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at getting post!', err }})
    }
}


// Update post
export const updatePost = async (req, res) => {
    try {
        const {errors, isValid} = CreatePostValidator(req.body)

        if (!isValid) {
            return res.status(400).json({err: errors})
        }

        let updatedPost = null

        if (req.body.image) {
            const post = await handler.findOneById({id: req.params.id, model: Post })
            const splitted = post.poster.split('/')
            const blob = splitted[splitted.length - 1]
            const {image, ...data} = req.body

            blobService.deleteBlobIfExists(container, blob, (err, result) => {
                if (err) {
                    return res.status(400).json({ err: { msg: "Error deleting poster!", err }})
                }

                const newBlob = Date.now().toString() + '_' + image.name
                const stream = intoStream(Buffer.from(image.buffer))
                const streamLength = image.size

                blobService.createBlockBlobFromStream(container, newBlob, stream, streamLength, async err => {
                    if (err) {
                        return res.status(400).json({ err: { msg: 'Error uploading poster image!', err }})
                    }

                    data.poster = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${container}/${newBlob}`

                    updatedPost = await handler.update(post._id, data, Post)

                    updatedPost ? (
                        res.status(200).json({ msg: 'Post updated successfully!', updatedPost })
                    ) : (
                        res.status(400).json({err: { msg: 'Failed to update post! It may not exist.' }})
                    )
                })
            })

        } else {
            updatedPost = await handler.update(req.params.id, req.body, Post)

            updatedPost ? (
                res.status(200).json({ msg: 'Post updated successfully!', updatedPost })
            ) : (
                res.status(400).json({err: { msg: 'Failed to update post! It may not exist.' }})
            )
        }

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at patching post!', err }})
    }
}


// Delete a post
export const removePost = async (req, res) => {
    try {
        const post = await handler.findOneById({id: req.params.id, model: Post })
        
        if (post.poster) {
            const splitted = post.poster.split('/')
            const blob = splitted[splitted.length - 1]

            blobService.deleteBlobIfExists(container, blob, { deleteSnapshots: 'include' }, async (err, result) => {
                if (err) {
                    console.log(err)
                }

                const deletedPost = await handler.remove(post._id, Post)
                await handler.removeAllByQuery({
                    query: {
                        post: post._id
                    },
                    model: Comment
                })
        
                deletedPost ? (
                    res.status(200).json({ msg: 'Post deleted successfully!' })
                ) : (
                    res.status(400).json({err: { msg: 'Failed to delete post! It may not exist.' }})
                )
            })
            
        } else {
            const deletedPost = await handler.remove(post._id, Post)
            await handler.removeAllByQuery({
                query: {
                    post: post._id
                },
                model: Comment
            })
    
            deletedPost ? (
                res.status(200).json({ msg: 'Post deleted successfully!' })
            ) : (
                res.status(400).json({err: { msg: 'Failed to delete post! It may not exist.' }})
            )

        }


    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at deleting post!', err }})
    }
}

// Increase post count
export const increasePostReadCount = async (req, res) => {
    try {
        const post = await handler.findOneById({ id: req.params.id, model: Post })
        const readCount = post.readCount + 1
        await handler.update(req.params.id, { readCount }, Post)

        res.status(200).json({ msg: 'Post read increased successfully!'})
    } catch (err) {
        res.status(500).json({ err: { msg: 'Internal Server Error at increasing post read count!', err }})
    }
}