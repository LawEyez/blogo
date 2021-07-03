import mongoose from 'mongoose'

import Post from '../models/posts.model.mjs'
import Comment from '../models/comments.model.mjs'
import Like from '../models/likes.model.mjs'
import User from '../models/users.model.mjs'
import Sub from '../models/subs.model.mjs'

import * as handler from '../common/global.handler.mjs'

export const overview = async (req, res) => {
  // try {
    const userId = req.user.userId

    // Post Details
    const postCount = await handler.getCount({ 
      query: { author: userId },
      model: Post
    })
    
    const publishedCount = await handler.getCount({ 
      query: { author: userId, isDraft: false },
      model: Post
    })
    
    const draftCount = await handler.getCount({ 
      query: { author: userId, isDraft: true },
      model: Post
    })

    // let posts = await handler.findByQuery({
    //   query: { author: userId },
    //   model: Post
    // })

    let postData = await Post.aggregate([
      { $match: {author: mongoose.Types.ObjectId(userId) }},
      {
        $group: {
          _id: ["$_id", "$title"],
          totalReadCount: {$sum: "$readCount"},
        }
      }
    ])

    postData = postData.map(post => {
      let titleWords = post._id[1].split(' ')

      for (let i = 0; i < titleWords.length; i++) {
        titleWords[i] = titleWords[i].charAt(0).toUpperCase() + titleWords[i].slice(1)
      }

      const title = titleWords.join(' ')

      return {
        title,
        reads: post.totalReadCount
      }
    })
    
    console.log(postData)
    const totalReads = postData.reduce((count, post) => count + post.reads, 0)

    // Subscribers
    const subscriberCount = await handler.getCount({
      query: { channel: userId },
      model: Sub
    })

    const subscriptionCount = await handler.getCount({
      query: { subscriber: userId },
      model: Sub
    })

    const data = {
      postCount,
      draftCount,
      publishedCount,
      subscriberCount,
      subscriptionCount,
      postData,
      totalReads
    }

    res.status(200).json(data)

  // } catch (err) {
  //   res.status(500).json({ err: { msg: 'Internal Server Error at overview!', err }})
  // }
}