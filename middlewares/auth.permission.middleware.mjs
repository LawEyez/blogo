import { findOneById } from '../common/global.handler.mjs'
import { isEmpty } from '../common/global.helper.mjs'
import _ from 'dotenv'

_.config()

const ADMIN_PERMISSION = parseInt(process.env.ADMIN)

export const minimumPermissionLevelRequired = requiredPermissionLevel => (req, res, next) => {
    try {
        const userPermissionLevel = parseInt(req.user.permissionLevel)
        
        if (userPermissionLevel >= requiredPermissionLevel) {
            return next()

        } else {
            return res.status(403).json({ msg: "You don't have sufficient rights (administrator) to perform action!" })
        }

    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at minimum permission middleware!', err})
    }
}


export const sameUserOrAdminAllowed = (req, res, next) => {
    try {
        const userPermissionLevel = parseInt(req.user.permissionLevel)
        const userId = req.user.userId

        if (req.params && req.params.id && userId === req.params.id) {
            return next()

        } else {
            if (userPermissionLevel === ADMIN_PERMISSION) {
                return next()

            } else {
                return res.status(403).json({ msg: "You don't have sufficient rights (administrator or affected user) to perform action!" })
            }
        }
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at same user or admin middleware!', err})
    }
}


export const sameUserNotAllowed = (req, res, next) => {
    try {
        const userId = req.user.userId

        if (userId === req.params.id) {
            return res.status(403).json({ msg: "You don't have sufficient rights to perform action!" })
        }

        next()

    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at same user disallowed middleware!', err})
    }
}


export const onlyAdminChangePermission = (req, res, next) => {
    try {
        if (req.body && req.body.permissionLevel) {
            const userPermissionLevel = parseInt(req.user.permissionLevel)

            if (userPermissionLevel !== ADMIN_PERMISSION) {
                return res.status(403).json({ msg: "Only an administrator can change a permission level!" })
            }  
        }

        next()
        
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at changing permission middleware!', err})
    }
}

/************************ Comments and Posts **************************/

export const onlyAuthorAllowed = model => async (req, res, next) => {
    try {
        let result

        if (model.modelName === 'Comments') {
            result = await findOneById({
                id: req.params.id,
                model
            })

            // If the initiator is the post author or admin, ensure they can't change the comment body.
            if (result.author.toString() !== req.user.userId) {
                const { body, ...changeable } = req.body

                if (!isEmpty(body)) {
                    return res.status(403).json({err: { msg: 'You are not authorized to perform this action!' }})
                    
                }

                req.body = changeable
                return next()
                
            }

        } else {
            result = await findOneById({
                id: req.params.id,
                model,
            })
            
            if (result.author.toString() !== req.user.userId) {
                return res.status(403).json({err: { msg: 'You are not authorized to perform this action000!' }})
            }
        }
        
        next()

    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at only author allowed middleware!', err})
    }
}


export const onlyAuthorOrAdminAllowed = model => async (req, res, next) => {
    try {
        let result

        if (model.modelName === 'Comments') {
            result = await findOneById({
                id: req.params.id,
                model,
                populate: {
                    field: 'post',
                    sub_fields: 'author'
                }
            })
            
            if ((result.author.toString() !== req.user.userId) &&
                (req.user.permissionLevel !== ADMIN_PERMISSION) &&
                (result.post.author.toString() !== req.user.userId)) {
                return res.status(403).json({err: { msg: 'You are not authorized to perform this action!' }})
            }

            return next()
        }

        result = await findOneById({ id: req.params.id, model })

        if ((result.author.toString() !== req.user.userId) && (req.user.permissionLevel !== ADMIN_PERMISSION)) {
            return res.status(403).json({err: { msg: 'You are not authorized to perform this action!' }})
        }

        next()

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal server error at only author or admin middleware!', err}})
    }
}


export const onlyPostAuthorAllowComment = model => async (req, res, next) => {
    try {
        if (req.body && req.body.isAllowed) {
            const result = await findOneById({
                id: req.params.id,
                model,
                populate: {
                    field: 'post',
                    sub_fields: ['author']
                }
            })
            
            if (result.post.author.toString() !== req.user.userId) {
                return res.status(403).json({err: { msg: 'Only the post author can allow comment!' }})
            }

            req.body.isAllowed = Boolean(parseInt(req.body.isAllowed))
    
        }

        next()

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal server error at only post author middleware!', err}})
    }
}


export const allowPostAuthorCommentByDefault = model => async (req, res, next) => {
    try {
        req.body.isAllowed = false
        
        if (req.body.post) {
            const post = await findOneById({ id: req.body.post, model })

            if (post.author.toString() === req.user.userId) {
                req.body.isAllowed = true
            }

        }

        next()

    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at allow post author comment middlware!', err })
    }
}

/***************************** Likes *******************************/

export const onlyLikerAllowed = model => async (req, res, next) => {
    try {
        const like = await findOneById({
            id: req.params.id,
            model
        })

        if (!like) {
            return res.status(400).json({ msg: 'Failed to unlike! Like may not exist' })
        }

        if (like.user.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'You can only remove your own like!' })
        }

        next()
        
    } catch (err) {
        res.status(500).json({ msg: 'Internal server error at only liker middleware!', err })
    }
}