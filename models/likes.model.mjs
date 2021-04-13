import mongoose from 'mongoose'

const Schema = mongoose.Schema

const LikeSchema = new Schema({
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comments',
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    dislike: {
        type: Boolean,
        default: false
    }
})

const Like = mongoose.model('Likes', LikeSchema)

export default Like