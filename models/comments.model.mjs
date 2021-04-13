import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
        required: true
    },

    body: {
        type: String,
        required: true
    },

    isAllowed: {
        type: Boolean,
        default: false
    },

    createDate: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comments', CommentSchema)

// Comment.modelName

export default Comment