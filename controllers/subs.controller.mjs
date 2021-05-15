import Sub from '../models/subs.model.mjs'
import * as handler from '../common/global.handler.mjs'
import { isEmpty } from '../common/global.helper.mjs'

import _ from 'dotenv'
_.config()


export const subscribe = async (req, res) => {
    try {
        req.body.subscriber = req.user.userId
        
        // User cannot subscribe to their own channel.
        if (req.body.subscriber === req.body.channel) {
            return res.status(400).json({ msg: 'You cannot subscribe to your own channel!' })
        }

        const alreadySub = await handler.findOneByQuery({
            query: req.body,
            model: Sub
        }) 

        if (!isEmpty(alreadySub)) {
            return res.status(400).json({err: { msg: 'Already subscribed!' }})
        }
        
        const sub = await handler.create(req.body, Sub)
        
        res.status(200).json({ msg: 'Subscribed successfully!', sub })
        

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at subscribing!', err }})
    }
}


// Get all subs
export const getSubs = async (req, res) => {
    try {
        const limit = req.query.limit && req.query.limit <= 100 ? req.query.limit : 10
        let page = 0

        if (req.query && req.query.page) {
            req.query.page = parseInt(req.query.page)
            page = Number.isInteger(req.query.page) ? req.query.page : 0
        }

        const subs = await handler.findByQuery({
            query: { subscriber: req.user.userId },
            model: Sub,
            perPage: limit,
            page,
            populate: {
                field: 'channel',
                sub_fields: ['firstName', 'lastName', 'avatar']
            }
        })

        res.status(200).json({subs})

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at getting subs!', err }})
    }
}


// Unsubscribe
export const unsubscribe = async (req, res) => {
    try {
        const sub = await handler.findOneById({ id: req.params.id, model: Sub })

        if (!sub) {
            return res.status(400).json({err: { msg: 'Subscription does not exist!' }})
        }

        if ((sub.subscriber.toString() !== req.user.userId) && (sub.channel.toString() !== req.user.userId) && (req.user.permissionLevel !== parseInt(process.env.ADMIN))) {
            return res.status(403).json({err: { msg: "You're not authorized to perform this action!" }})      
        }
            
        const unsub = await handler.remove(req.params.id, Sub)
        return res.status(200).json({ msg: 'Unsubscribed successfully!', unsub })  

    } catch (err) {
        res.status(500).json({err: { msg: 'Internal Server Error at unsubscribing!', err }})
    }
}