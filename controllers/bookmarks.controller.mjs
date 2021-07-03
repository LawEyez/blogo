import Bookmark from '../models/bookmarks.model.mjs'
import * as handler from '../common/global.handler.mjs'
import { isEmpty, cleaned } from '../common/global.helper.mjs'

// Create a bookmark
export const create = async (req, res) => {
    try {
        req.body.user = req.user.userId

        const bookmarkExists = await handler.findOneByQuery({
            query: req.body,
            model: Bookmark
        })

        if (bookmarkExists) {
            return res.status(400).json({ err: { msg: 'Already bookmarked!' }})
        }

        const bookmark = await handler.create(req.body, Bookmark)

        !isEmpty(bookmark) ? (
            res.status(200).json({ msg: 'Bookmark created successfully!', bookmark })
        ) : (
            res.status(400).json({ err: { msg: 'Failed to create bookmark! '}})
        )
        
    } catch (err) {
        res.status(500).json({err: { msg: 'Internal server error at creating bookmark!', err }})
    }
}


// Get all bookmarks for a user
export const list = async (req, res) => {
    // try {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
        let page = 0

        if (req.query && req.query) {
            req.query.page = parseInt(req.query.page) 
            page = Number.isInteger(req.query.page) ? req.query.page : 0
        }
        
        let bookmarks = await Bookmark.find({ user: req.user.userId })
                                .populate({ path: 'post', populate: { path: 'author' }})
                                .limit(limit)
                                .skip(limit * page)
                
        bookmarks = bookmarks.map(bk => {
            bk.post.author = cleaned(bk.post.author)
            return bk
        })

        bookmarks ? (
            res.status(200).json({ bookmarks })
        ) : (
            res.status(400).json({ err: { msg: 'Failed to list bookmarks!' }})
        )

    // } catch (err) {
    //     res.status(500).json({ err: { msg: 'Internal server error at listing bookmarks!', err }})
    // }
}


// Remove a bookmark
export const remove = async (req, res) => {
    try {
        const bookmark = await handler.findOneById({
            id: req.params.id,
            model: Bookmark
        })

        if (bookmark.user.toString() !== req.user.userId) {
            return res.status(403).json({ err: { msg: 'You can only remove your bookmarks!', err }})
        }

        const removedBookmark = await handler.remove(req.params.id, Bookmark)

        removedBookmark ? (
            res.status(200).json({ msg: 'Bookmark removed successfully!', removedBookmark })
        ) : (
            res.status(400).json({ err: { msg: 'Failed to remove bookmark! It may not exist.', err }})
        )

    } catch (err) {
        res.status(200).json({ err: { msg: 'Internal server error at removing bookmark!', err }})
    }
}